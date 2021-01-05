const { db } = require("./db");

module.exports = {
  createNote,
  editNoteTitle,
  editNoteBody,
  deleteNote,
  getNote,
  getRecentNotes,
};

async function createNote(user) {
  const query = {
    text: `
      INSERT INTO note(user_id, created, edited)
      VALUES($1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *`,
    values: [user.id],
  };

  const note = (await db.query(query)).rows[0];
  return note;
}

async function editNoteTitle(user, noteId, title) {
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
    throw new Error(`note id ${id} does not exist`);
  }

  return res.rows[0];
}

async function editNoteBody(user, noteId, body) {
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
    throw new Error(`note id ${id} does not exist`);
  }

  return res.rows[0];
}

async function deleteNote(user, id) {
  const query = {
    text: "DELETE FROM note WHERE user_id = $1 AND id = $2",
    values: [user.id, id],
  };

  const res = await db.query(query);
  if (res.rowCount === 0) {
    throw new Error(`note id ${id} does not exist`);
  }
}

async function getNote(user, id) {
  const query = {
    text: "SELECT * from note WHERE user_id = $1 AND id = $2",
    values: [user.id, id],
  };

  const res = await db.query(query);
  if (res.rows.length === 0) {
    throw new Error(`note id ${id} does not exist`);
  }

  return res.rows[0];
}

async function getRecentNotes(user, limit) {
  const query = {
    text: "SELECT * from note WHERE user_id = $1 ORDER BY created ASC LIMIT $2",
    values: [user.id, limit],
  };

  return (await db.query(query)).rows;
}
