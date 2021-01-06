const user = require("./user");
const label = require("./label");

module.exports = {
  Query: {
    me: async (_, __, { user }) => {
      return user;
    },
    getLabel: async (_, { id }, { user }) => label.getLabel(user, id),
  },
};
