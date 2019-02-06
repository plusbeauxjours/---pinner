import { gql } from "apollo-boost";

export const SIGNUP_MUTATION = gql`
  mutation signUp(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $username: String!
  ) {
    createAccount(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
      username: $username
    ) {
      token
    }
  }
`;
