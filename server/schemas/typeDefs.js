const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    _id: ID
    title: String!
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
  }

  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(username: String!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    saveBook(
      username: String!
      title: String!
      authors: [String]
      description: String!
      bookId: String!
      image: String
      link: String
    ): User
    deleteBook(username: String!, bookId: String!): User
  }
`;

module.exports = typeDefs;
