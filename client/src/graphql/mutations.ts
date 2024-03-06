import { gql } from "@apollo/client";

export const USER_LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

export const USER_SIGNUP = gql`
  mutation login($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

export const ADD_BLOG = gql`
  mutation addBlog(
    $title: String!
    $content: String!
    $date: String!
    $user: ID!
  ) {
    addBlog(title: $title, content: $content, date: $date, user: $user) {
      id
      title
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addCommentToBlog(
    $text: String!
    $date: String!
    $user: ID!
    $blog: ID!
  ) {
    addCommentToBlog(text: $text, date: $date, user: $user, blog: $blog) {
      id
      text
      user {
        id
        name
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: ID!) {
    deleteComment(id: $id) {
      id
      text
    }
  }
`;
