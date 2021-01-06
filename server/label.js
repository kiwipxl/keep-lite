const { db } = require("./db");

module.exports = {
  addLabelToNote,
  createLabel,
  renameLabel,
  deleteLabel,
  getLabel,
  getAllLabels,
};

async function addLabelToNote(user, noteId, labelId) {
  const query = {
    text: `
      INSERT INTO note_label(user_id, note_id, label_id)
      VALUES($1, $2, $3)`,
    values: [user.id, noteId, labelId],
  };

  await db.query(query);
}

async function createLabel(user, name) {
  const query = {
    text: "INSERT INTO label(user_id, name) VALUES($1, $2) RETURNING *",
    values: [user.id, name],
  };

  const label = (await db.query(query)).rows[0];
  return label;
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
    throw new Error(`label id ${id} does not exist`);
  }

  return res.rows[0];
}

async function deleteLabel(user, id) {
  const query = {
    text: "DELETE FROM label WHERE user_id = $1 AND id = $2",
    values: [user.id, id],
  };

  const res = await db.query(query);
  if (res.rowCount === 0) {
    throw new Error(`label id ${id} does not exist`);
  }
}

async function getLabel(user, id) {
  const query = {
    text: "SELECT * from label WHERE user_id = $1 AND id = $2",
    values: [user.id, id],
  };

  const res = await db.query(query);
  if (res.rows.length === 0) {
    throw new Error(`label id ${id} does not exist`);
  }

  return res.rows[0];
}

async function getAllLabels(user) {
  const query = {
    text: "SELECT * from label WHERE user_id = $1",
    values: [user.id],
  };

  return (await db.query(query)).rows;
}
