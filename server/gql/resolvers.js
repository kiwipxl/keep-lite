const {
  createNote,
  setNoteTitle,
  setNoteBody,
  deleteNote,
  getNote,
  getRecentNotes,
} = require("../data/note");
const {
  createLabel,
  renameLabel,
  deleteLabel,
  getLabels,
  addNoteLabel,
  removeNoteLabel,
  clearNoteLabels,
} = require("../data/label");

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

    setNoteLabels: async (_, { id, labels }, { user }) => {
      clearNoteLabels(user, id);
      for (const labelId of labels) {
        addLabelToNote(user, id, labelId);
      }
      return getNote(user, id);
    },

    addNoteLabel: async (_, { id, labelId }, { user }) =>
      addNoteLabel(user, id, labelId),

    removeNoteLabel: async (_, { id, labelId }, { user }) =>
      removeNoteLabel(user, id, labelId),

    createNote: async (_, { id, title, body }, { user }) =>
      createNote(user, id, title, body),

    setNoteTitle: async (_, { id, title }, { user }) =>
      setNoteTitle(user, id, title),

    setNoteBody: async (_, { id, body }, { user }) =>
      setNoteBody(user, id, body),

    deleteNote: async (_, { id }, { user }) => deleteNote(user, id),
  },
};
