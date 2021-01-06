const { PG_UNDEFINED_TABLE } = require("@drdgvhbh/postgres-error-codes");
const { db, connect, createNewDatabase } = require("./db");
const { ApolloServer } = require("apollo-server");
const schema = require("./schema");
const resolvers = require("./resolvers");
const user = require("./user");

const context = async ({ req }) => {
  return {
    user: {
      id: 1,
    },
  };
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context,
  introspection: true,
  playground: true,
});

server.listen().then(async () => {
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

  await user.createUser();
});
