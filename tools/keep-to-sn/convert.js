const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

module.exports = convert;

function convert(takeoutDir) {
  let fileTypeStats = {};
  let notes = {};
  let tags = {};
  let tagNameToTagId = {};

  const files = fs.readdirSync(takeoutDir);
  files.forEach((name) => {
    const filePath = path.join(takeoutDir, name);
    const fileSize = fs.statSync(filePath).size;
    const fileExtension = name.substring(name.lastIndexOf(".") + 1);

    let stats = fileTypeStats[fileExtension];
    if (!stats) {
      stats = { size: 0, numItems: 0 };
      fileTypeStats[fileExtension] = stats;
    }

    stats.size += fileSize;
    stats.numItems += 1;

    if (fileExtension == "json") {
      const keepNote = JSON.parse(fs.readFileSync(filePath));

      // Don't convert note that has no labels.
      // This is an optimisation as my personal notes had many uninteresting
      // notes without any labels.
      if (!keepNote.labels) {
        return;
      }

      if (keepNote.archived) {
        console.log("found archived");
      }

      const noteId = uuidv4();
      const editedDate = moment
        .utc(keepNote.userEditedTimestampUsec / 1000)
        .toDate();

      notes[noteId] = {
        created_at: editedDate,
        updated_at: editedDate,
        uuid: noteId,
        content_type: "Note",
        content: {
          title: keepNote.title,
          text: keepNote.textContent,
        },
        archived: keepNote.archived,
      };

      for (const label of keepNote.labels || []) {
        let tagId = tagNameToTagId[label.name];
        if (!tagId) {
          tagId = uuidv4();
          tagNameToTagId[label.name] = tagId;

          const nowDate = moment().toDate();

          tags[tagId] = {
            created_at: nowDate,
            updated_at: nowDate,
            uuid: tagId,
            content_type: "Tag",
            content: {
              title: label.name,
              references: [],
            },
          };
        }

        tags[tagId].content.references.push({
          uuid: noteId,
          contentType: "Note",
        });
      }
    }
  });

  for (const extension of Object.keys(fileTypeStats)) {
    const stats = fileTypeStats[extension];

    console.log(
      `.${extension} - ${stats.numItems} found, ${
        stats.size / 1000.0 / 1000.0
      }mb`
    );
  }

  // Converted backup file
  let output = { items: [] };

  output.items.push(...Object.keys(notes).map((noteId) => notes[noteId]));
  output.items.push(...Object.keys(tags).map((tagId) => tags[tagId]));

  return output;
}
