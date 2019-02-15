import { gql } from "apollo-boost";

export const SIGN_UP = gql`
  mutation facebookConnect(
    $avatar: String
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $username: String!
  ) {
    createAccount(
      avatar: $avatar
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
      username: $username
    ) {
      ok
      error
      token
    }
  }
`;
