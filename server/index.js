const { PG_UNDEFINED_TABLE } = require("@drdgvhbh/postgres-error-codes");
const { db, connect, createNewDatabase } = require("./db");
const { createUser } = require("./user");

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

  const user = await createUser();
  console.log(user);

  console.log("done");
})();
