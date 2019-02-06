import { gql } from "apollo-boost";

export const LOGIN_MUTATION = gql`
  mutation logIn($username: String!, $password: String!) {
    logIn(username: $username, password: $password) {
      token
    }
  }
`;
