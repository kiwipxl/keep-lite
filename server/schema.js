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
    labels: [Label]!
  }

  type Label {
    id: ID!
    name: String
  }

  type User {
    id: ID!
  }

  type Query {
    me: User
  }

  type Mutation {
    createLabel(name: String!): Label
    renameLabel(id: ID!, name: String!): Boolean
    removeLabel(id: ID!): Boolean
  }
`;
