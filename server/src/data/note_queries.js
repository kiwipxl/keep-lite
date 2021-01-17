const { db } = require("../db");
const { buildNote } = require("./note");

module.exports = {
  getNotes,
  getNotesByLabel,
  getNotesBySearchQuery,
};

async function getNotes(user, limit) {
  const query = {
    text: "SELECT * from note WHERE user_id = $1 ORDER BY created ASC LIMIT $2",
    values: [user.id, limit],
  };

  const res = await db.query(query);
  let notes = res.rows.map(async (dbNote) => await buildNote(user, dbNote));
  return notes;
}

async function getNotesByLabel(user, labelId, limit) {
  const query = {
    text: `SELECT * from note
    INNER JOIN note_label ON note_label.note_id = note.id AND note_label.label_id = $2
    WHERE note.user_id = $1 AND note_label.user_id = $1
    ORDER BY created ASC LIMIT $3`,
    values: [user.id, labelId, limit],
  };

  const res = await db.query(query);

  const notes = [];
  for (const row of res.rows) {
    notes.push(await buildNote(user, row));
  }
  return notes;
}

async function getNotesBySearchQuery(user, query, limit) {
  return await getNotes(user, limit);
}
