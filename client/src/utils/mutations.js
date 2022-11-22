import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook(
    $username: String!
    $title: String!
    $description: String!
    $bookId: String!
    $authors: [String]
    $image: String
    $link: String
  ) {
    saveBook(
      username: $username
      title: $title
      description: $description
      bookId: $bookId
      authors: $authors
      image: $image
      link: $link
    ) {
      _id
      username
      savedBooks {
        authors
        bookId
        description
        image
        link
        title
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($username: String!, $bookId: String!) {
    deleteBook(username: $username, bookId: $bookId) {
      _id
      savedBooks {
        bookId
        title
        description
        authors
        image
        link
      }
      username
    }
  }
`;
