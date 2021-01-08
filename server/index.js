const { PG_UNDEFINED_TABLE } = require("@drdgvhbh/postgres-error-codes");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { db, connect, createNewDatabase } = require("./db");
const auth = require("./auth/auth");
const { createTestUser } = require("./data/user");
const gql_server = require("./gql/server");

const app = express();

app.use(cookieParser());
app.use(cors());

auth.init(app);
gql_server.init(app);

app.get("/", (req, res, next) => {
  res.send("hello world!");
});

app.listen({ port: 4000 }, async () => {
  console.log("server is running on port 4000!");

  await connect();

  try {
    await db.query("SELECT * FROM note LIMIT 1");
  } catch (err) {
    if (err.code === PG_UNDEFINED_TABLE) {
      console.log("Failed to find tables. Creating new database...");
      await createNewDatabase();
    } else {
      throw err;
    }
  }

  // TESTING
  await createNewDatabase();
  await createTestUser();
});
