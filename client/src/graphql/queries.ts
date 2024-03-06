import { gql } from "@apollo/client";

export const GET_BLOGS = gql`
  {
    blogs {
      id
      title
      content
      date
      user {
        id
        name
      }
    }
  }
`;

export const GET_USER_BLOGS = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      blogs {
        id
        title
        content
        date
        user {
          id
          name
        }
      }
    }
  }
`;

export const GET_BLOG_BY_ID = gql`
  query blog($id: ID!) {
    blog(id: $id) {
      id
      title
      content
      date
      user {
        id
        name
        email
      }
      comments {
        id
        text
        user {
          id
          name
        }
      }
    }
  }
`;
