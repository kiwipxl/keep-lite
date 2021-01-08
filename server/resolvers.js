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
  getNoteLabels,
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
    getNotes: async (_, { limit }, { user }) => getRecentNotes(user, limit),
  },

  Mutation: {
    createLabel: async (_, { id, name }, { user }) =>
      createLabel(user, id, name),
    renameLabel: async (_, { id, name }, { user }) =>
      renameLabel(user, id, name),
    deleteLabel: async (_, { id }, { user }) => deleteLabel(user, id),

    createNote: async (_, { id, title, body }, { user }) =>
      createNote(user, id, title, body),
    setNoteContent: async (_, { id, title, body }, { user }) =>
      setNoteContent(user, id, title, body),
    setNoteLabels: async (_, { id, labels }, { user }) => {
      for (const labelId of labels) {
        addLabelToNote(user, id, labelId);
      }
      return getNote(user, id);
    },
    deleteNote: async (_, { id }, { user }) => deleteNote(user, id),
  },
};
