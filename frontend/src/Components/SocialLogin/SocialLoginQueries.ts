import { gql } from "apollo-boost";

export const FACEBOOK_CONNECT = gql`
  mutation FacebookConnect(
    $username: String!
    $firstName: String!
    $lastName: String!
    $email: String
    $gender: String
    $fbId: String!
  ) {
    facebookConnect(
      username: $username
      firstName: $firstName
      lastName: $lastName
      email: $email
      gender: $gender
      fbId: $fbId
    ) {
      token
    }
  }
`;
