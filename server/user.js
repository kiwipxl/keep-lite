const { db } = require("./db");

module.exports = {
  createUser,
};

async function createUser() {
  const query = {
    text: "INSERT INTO app_user DEFAULT VALUES RETURNING *",
  };

  const user = (await db.query(query)).rows[0];
  return user;
}
