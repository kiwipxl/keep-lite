const { gql } = require("apollo-server");

module.exports = gql`
  scalar Date

  enum NoteCategory {
    DEFAULT
    PINNED
    ARCHIVED
  }

  type Note {
    id: ID!
    title: String
    body: String
    category: NoteCategory
    created: Date
    edited: Date
    labels: [Label!]!
  }

  type Label {
    id: ID!
    name: String
  }

  type User {
    id: ID!
    authProvider: String
    email: String
    name: String
    created: Date
  }

  type Query {
    me: User
    labels: [Label!]!

    getLabel(id: ID!): Label
    getNote(id: ID!): Note
    getNotes(limit: Int): [Note!]!
  }

  type Mutation {
    createLabel(id: ID, name: String!): Label!
    renameLabel(id: ID!, name: String!): Boolean
    deleteLabel(id: ID!): Boolean

    createNote(id: ID, title: String, body: String): Note!
    setNoteContent(id: ID!, title: String, body: String): Note
    setNoteLabels(id: ID!, labels: [ID!]!): Note
    deleteNote(id: ID!): Boolean
  }
`;
