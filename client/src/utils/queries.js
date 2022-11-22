import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      email
      username
      savedBooks {
        _id
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

export const QUERY_ME = gql`
  query me {
    me {
      _id
      email
      username
      savedBooks {
        _id
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
