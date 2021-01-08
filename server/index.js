const { PG_UNDEFINED_TABLE } = require("@drdgvhbh/postgres-error-codes");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { db, connect, createNewDatabase } = require("./db");
const schema = require("./schema");
const resolvers = require("./resolvers");
const auth = require("./auth");

const context = async ({ req }) => {
  const user = await auth.getUserFromReq(req);

  if (!user) {
    throw new AuthenticationError("failed to authorise");
  }

  return {
    user,
  };
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context,
  introspection: true,
  playground: true,
});

const app = express();

app.use(cookieParser());
app.use(cors());
server.applyMiddleware({ app });
auth.use(app);

app.listen({ port: 4000 }, async () => {
  console.log("server is running on port 4000!");

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
});
