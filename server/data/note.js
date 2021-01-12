const { v4 } = require("uuid");
const uuidv4 = v4;
const { db } = require("../db");
const { getNoteLabels } = require("./label");

module.exports = {
  createNote,
  setNoteTitle,
  setNoteBody,
  deleteNote,
  getNote,
  convertTextToNoteBody,
  buildNote,
};

function convertTextToNoteBody(text) {
  // TODO:
  return null;
}

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

  return await buildNote(user, res.rows[0]);
}

async function setNoteTitle(user, noteId, title) {
  const query = {
    text: `
      UPDATE note SET edited = CURRENT_TIMESTAMP, title = $3
      WHERE user_id = $1 AND id = $2
      RETURNING *
    `,
    values: [user.id, noteId, title],
  };

  const res = await db.query(query);
  if (res.rowCount === 0) {
    return null;
  }

  return await buildNote(user, res.rows[0]);
}

async function setNoteBody(user, noteId, body) {
  const query = {
    text: `
      UPDATE note SET edited = CURRENT_TIMESTAMP, body = $3
      WHERE user_id = $1 AND id = $2
      RETURNING *
    `,
    values: [user.id, noteId, body],
  };

  const res = await db.query(query);
  if (res.rowCount === 0) {
    return null;
  }

  return await buildNote(user, res.rows[0]);
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

  return await buildNote(user, res.rows[0]);
}

// After fetching the note from the database, fetch additional data
// so that note matches our graphQL schema.
async function buildNote(user, dbNote) {
  let note = dbNote;

  note.labels = await getNoteLabels(user, note.id);

  return note;
}
