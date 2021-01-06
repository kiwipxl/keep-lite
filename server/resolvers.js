const {
  createNote,
  setNoteContent,
  deleteNote,
  getNote,
  getRecentNotes,
} = require("./note");
const {
  createLabel,
  renameLabel,
  deleteLabel,
  getLabels,
  addLabelToNote,
} = require("./label");

module.exports = {
  Query: {
    me: async (_, __, { user }) => {
      return user;
    },
    labels: async (_, __, { user }) => getLabels(user),

    getLabel: async (_, { id }, { user }) => getLabel(user, id),
    getNote: async (_, { id }, { user }) => getNote(user, id),
  },

  Mutation: {
    createLabel: async (_, { name }, { user }) => createLabel(user, name),
    renameLabel: async (_, { id, name }, { user }) =>
      renameLabel(user, id, name),
    deleteLabel: async (_, { id }, { user }) => deleteLabel(user, id),

    createNote: async (_, { title, body }, { user }) =>
      createNote(user, title, body),
    setNoteContent: async (_, { id, title, body }, { user }) =>
      setNoteContent(user, id, title, body),
    setNoteLabels: async (_, { id, labels }, { user }) => {
      for (const label of labels) {
        addLabelToNote(user, id, label.id);
      }
    },
    deleteNote: async (_, { id }, { user }) => deleteNote(user, id),
  },
};
