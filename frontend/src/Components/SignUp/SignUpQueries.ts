import gql from "graphql-tag";

export const SIGN_UP = gql`
  mutation signUp(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $username: String!
    $avatar: String
  ) {
    createAccount(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
      username: $username
      avatar: $avatar
    ) {
      token
    }
  }
`;
