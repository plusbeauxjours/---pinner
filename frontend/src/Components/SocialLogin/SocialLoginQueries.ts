import { gql } from "apollo-boost";

export const FACEBOOK_CONNECT = gql`
  mutation facebookConnect(
    $name: String!
    $firstName: String!
    $lastName: String!
    $email: String
    $fbId: String!
  ) {
    FacebookConnect(
      name: $name
      firstName: $firstName
      lastName: $lastName
      email: $email
      fbId: $fbId
    ) {
      token
    }
  }
`;
