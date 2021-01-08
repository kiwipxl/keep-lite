const { db } = require("../db");
const { createLabel } = require("./label");
const { createNote, convertTextToNoteBody } = require("./note");
const { addSession } = require("../auth/sessions");

module.exports = {
  createUser,
  getUser,
  createTestUser,
};

async function createUser(id, authProvider, email, name) {
  if (!id) {
    throw new Error("failed to create user with undefined id");
  }

  const query = {
    text: `
      INSERT INTO app_user(id, auth_provider, email, name, created)
      VALUES($1, $2, $3, $4, CURRENT_TIMESTAMP)
      RETURNING *`,
    values: [id, authProvider, email, name],
  };

  const res = await db.query(query);
  if (res.rowCount === 0) {
    return null;
  }

  return res.rows[0];
}

async function getUser(id) {
  if (!id) {
    return null;
  }

  const query = {
    text: "SELECT * FROM app_user WHERE id = $1",
    values: [id],
  };

  const res = await db.query(query);
  if (res.rowCount === 0) {
    return null;
  }

  const user = res.rows[0];

  return {
    id: user.id,
    authProvider: user.auth_provider,
    email: user.email,
    name: user.name,
    created: user.created,
  };
}

async function createTestUser() {
  const testUser = await createUser(
    "TEST-USER",
    "google",
    "test@email.com",
    "test name"
  );

  addSession(testUser.id, "TEST-USER-TOKEN");

  await createLabel({ id: testUser.id }, null, "Science");
  await createLabel({ id: testUser.id }, null, "Psychology");

  await createNote(
    { id: testUser.id },
    null,
    "Test title",
    convertTextToNoteBody("test body")
  );
  await createNote(
    { id: testUser.id },
    null,
    "Another note!",
    convertTextToNoteBody("What, wow! Isnt that grand.")
  );
}
