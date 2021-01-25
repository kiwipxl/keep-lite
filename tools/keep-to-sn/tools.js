const moment = require("moment");

module.exports = {
  updateClientTimestamp,
  filterNotes,
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

function filterNotes(items, callback) {
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
    if (callback(note, notes, tags)) {
      updateClientTimestamp(note);
      newItems.push(note);
    }
  }

  return { items: newItems };
}
