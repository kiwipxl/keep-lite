const { db } = require("./db");

module.exports = {
  createUser,
  getUser,
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

  return res.rows[0];
}
