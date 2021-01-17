const { v4 } = require("uuid");
const uuidv4 = v4;
const { db } = require("../db");

module.exports = {
  addNoteLabel,
  removeNoteLabel,
  getNoteLabels,
  createLabel,
  renameLabel,
  deleteLabel,
  getLabel,
  getLabels,
};

async function addNoteLabel(user, noteId, labelId) {
  const query = {
    text: `
      INSERT INTO note_label(user_id, note_id, label_id)
      VALUES($1, $2, $3)`,
    values: [user.id, noteId, labelId],
  };

  const res = await db.query(query);
  return res.rowCount > 0;
}

async function removeNoteLabel(user, noteId, labelId) {
  const query = {
    text: `
      DELETE FROM note_label
      WHERE user_id = $1 AND note_id = $2 AND label_id = $3`,
    values: [user.id, noteId, labelId],
  };

  const res = await db.query(query);
  return res.rowCount > 0;
}

async function clearNoteLabels(user, noteId) {
  const query = {
    text: `
      DELETE FROM note_label
      WHERE user_id = $1, note_id = $2`,
    values: [user.id, noteId],
  };

  await db.query(query);
  return true;
}

async function getNoteLabels(user, noteId) {
  const query = {
    text: `
      SELECT * FROM note_label
      WHERE user_id = $1 AND note_id = $2`,
    values: [user.id, noteId],
  };

  const res = await db.query(query);

  const labels = [];
  for (const row of res.rows) {
    labels.push(await getLabel(user, row.label_id));
  }
  return labels;
}

async function createLabel(user, id, name) {
  const query = {
    text: "INSERT INTO label(user_id, id, name) VALUES($1, $2, $3) RETURNING *",
    values: [user.id, id || uuidv4(), name],
  };

  const res = await db.query(query);
  if (res.rowCount === 0) {
    return null;
  }

  return res.rows[0];
}

async function renameLabel(user, labelId, name) {
  const query = {
    text: `
      UPDATE label SET name = $3
      WHERE user_id = $1 AND id = $2
      RETURNING *
    `,
    values: [user.id, labelId, name],
  };

  const res = await db.query(query);
  if (res.rowCount === 0) {
    return false;
  }

  return true;
}

async function deleteLabel(user, id) {
  const query = {
    text: "DELETE FROM label WHERE user_id = $1 AND id = $2",
    values: [user.id, id],
  };

  const res = await db.query(query);
  return res.rowCount > 0;
}

async function getLabel(user, id) {
  const query = {
    text: "SELECT * FROM label WHERE user_id = $1 AND id = $2",
    values: [user.id, id],
  };

  const res = await db.query(query);
  if (res.rowCount === 0) {
    return null;
  }

  return res.rows[0];
}

async function getLabels(user) {
  const query = {
    text: "SELECT * FROM label WHERE user_id = $1",
    values: [user.id],
  };

  const res = await db.query(query);
  return res.rows;
}
