const moment = require("moment");

module.exports = {
  updateClientTimestamp,
  deleteAllWithoutTags,
};

function updateClientTimestamp(item) {
  if (item.content && item.content.appData) {
    item.content.appData[
      "org.standardnotes.sn"
    ].client_updated_at = moment().toDate();
  } else {
    item.content.appData = {
      "org.standardnotes.sn": {
        client_updated_at: moment().toDate(),
      },
    };
  }
}

function deleteAllWithoutTags(backup) {
  let notes = {};
  let tags = {};
  let newItems = [];

  for (const item of backup.items) {
    if (item.content_type === "Note") {
      notes[item.uuid] = item;
    } else if (item.content_type === "Tag") {
      tags[item.uuid] = item;
    }
  }

  for (const note of Object.values(notes)) {
    const hasTag = Object.values(tags).find((tag) =>
      tag.content.references.find((ref) => ref.uuid === note.uuid)
    );

    if (!hasTag) {
      updateClientTimestamp(note);
      note.deleted = true;
      newItems.push(note);
    }
  }

  console.log(`found ${newItems.length} notes without tags`);

  return { items: newItems };
}
