const { PG_UNDEFINED_TABLE } = require("@drdgvhbh/postgres-error-codes");
const { db, connect, createNewDatabase } = require("./db");

(async () => {
  await connect();

  try {
    const res = await db.query("SELECT * FROM note2");
    console.log(res.rows[0]);
  } catch (err) {
    if (err.code === PG_UNDEFINED_TABLE) {
      createNewDatabase();
    } else {
      throw err;
    }
  }
})();
