const { PG_UNDEFINED_TABLE } = require("@drdgvhbh/postgres-error-codes");
const { db, connect, createNewDatabase } = require("./db");

async function createNote() {
  const query = {
    text: `
      INSERT INTO note(account_id, created, edited)
      VALUES($1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *`,
    values: [1],
  };

  const note = (await db.query(query)).rows[0];
  return note;
}

async function editNote(noteId, title, body, category) {
  const query = {
    text: `
      UPDATE note SET edited = CURRENT_TIMESTAMP, title = $3, body = $4, category = $5
      WHERE account_id = $1 AND id = $2
    `,
    values: [1, noteId, title, body, category],
  };

  const note = (await db.query(query)).rows[0];
  return note;
}

async function addLabelToNote(noteId, labelId) {
  const query = {
    text: `
      INSERT INTO note_label(account_id, note_id, label_id)
      VALUES($1, $2, $3)`,
    values: [1, noteId, labelId],
  };

  await db.query(query);
}

async function createLabel(name) {
  const query = {
    text: "INSERT INTO label(account_id, name) VALUES($1, $2) RETURNING *",
    values: [1, name],
  };

  const label = (await db.query(query)).rows[0];
  return label;
}

async function renameLabel(labelId, name) {
  const query = {
    text: `
      UPDATE label SET name = $3
      WHERE account_id = $1 AND id = $2
    `,
    values: [1, labelId, name],
  };

  await db.query(query);
}

async function deleteLabel(id) {
  const query = {
    text: "DELETE FROM label WHERE account_id = $1 AND id = $2",
    values: [1, id],
  };

  await db.query(query);
}

(async () => {
  await connect();

  try {
    await db.query("SELECT * FROM note2 LIMIT 1");
  } catch (err) {
    if (err.code === PG_UNDEFINED_TABLE) {
      console.log("Failed to find tables. Creating new database...");
      await createNewDatabase();
    } else {
      throw err;
    }
  }

  await createLabel("social");

  console.log("done");
})();
