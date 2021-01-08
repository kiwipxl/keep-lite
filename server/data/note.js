const { v4 } = require("uuid");
const uuidv4 = v4;
const { db } = require("../db");
const { getNoteLabels } = require("./label");

module.exports = {
  createNote,
  setNoteContent,
  deleteNote,
  getNote,
  getRecentNotes,
};

async function createNote(user, id, title, body) {
  const query = {
    text: `
      INSERT INTO note(user_id, id, title, body, created, edited)
      VALUES($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *`,
    values: [user.id, id || uuidv4(), title, body],
  };

  const res = await db.query(query);
  if (res.rowCount === 0) {
    return null;
  }

  return buildNote(user, res.rows[0]);
}

async function setNoteContent(user, noteId, title, body) {
  const query = {
    text: `
      UPDATE note SET edited = CURRENT_TIMESTAMP, title = $3, body = $4
      WHERE user_id = $1 AND id = $2
      RETURNING *
    `,
    values: [user.id, noteId, title, body],
  };

  const res = await db.query(query);
  if (res.rowCount === 0) {
    return null;
  }

  return buildNote(user, res.rows[0]);
}

async function deleteNote(user, id) {
  const query = {
    text: "DELETE FROM note WHERE user_id = $1 AND id = $2",
    values: [user.id, id],
  };

  const res = await db.query(query);
  return res.rowCount > 0;
}

async function getNote(user, id) {
  const query = {
    text: "SELECT * from note WHERE user_id = $1 AND id = $2",
    values: [user.id, id],
  };

  const res = await db.query(query);
  if (res.rowCount === 0) {
    return null;
  }

  return buildNote(user, res.rows[0]);
}

async function getRecentNotes(user, limit) {
  const query = {
    text: "SELECT * from note WHERE user_id = $1 ORDER BY created ASC LIMIT $2",
    values: [user.id, limit],
  };

  const res = await db.query(query);
  let notes = res.rows.map((dbNote) => buildNote(user, dbNote));
  return notes;
}

function buildNote(user, note) {
  note.labels = getNoteLabels(user, note.id);
  return note;
}
