import { gql } from "@apollo/client";

export const GET_BLOGS = gql`
  {
    blogs {
      id
      title
      content
      date
      user {
        name
      }
    }
  }
`;

export const GET_USER_BLOGS = gql`
  query user($id: ID!) {
    user(id: $id) {
      blogs {
        id
        title
        content
        date
      }
    }
  }
`;
