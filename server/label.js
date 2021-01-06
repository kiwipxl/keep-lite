const { db } = require("./db");

module.exports = {
  addLabelToNote,
  getNoteLabels,
  createLabel,
  renameLabel,
  deleteLabel,
  getLabel,
  getLabels,
};

async function addLabelToNote(user, noteId, labelId) {
  const query = {
    text: `
      INSERT INTO note_label(user_id, note_id, label_id)
      VALUES($1, $2, $3)`,
    values: [user.id, noteId, labelId],
  };

  const res = await db.query(query);
  return res.rowCount > 0;
}

async function getNoteLabels(user, noteId) {
  const query = {
    text: `
      SELECT * FROM note_label
      WHERE user_id = $1 note_id = $2`,
    values: [user.id, noteId],
  };

  const res = await db.query(query);
  console.log(res.rows);
  return [];
}

async function createLabel(user, name) {
  const query = {
    text: "INSERT INTO label(user_id, name) VALUES($1, $2) RETURNING *",
    values: [user.id, name],
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
    return null;
  }

  return res.rows[0];
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
    text: "SELECT * from label WHERE user_id = $1 AND id = $2",
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
    text: "SELECT * from label WHERE user_id = $1",
    values: [user.id],
  };

  const res = await db.query(query);
  return res.rows;
}
