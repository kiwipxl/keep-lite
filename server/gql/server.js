const { ApolloServer, AuthenticationError } = require("apollo-server-express");
const schema = require("./schema");
const resolvers = require("./resolvers");
const auth = require("../auth/auth");

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

module.exports.init = (app) => {
  server.applyMiddleware({ app });

  return server;
};
