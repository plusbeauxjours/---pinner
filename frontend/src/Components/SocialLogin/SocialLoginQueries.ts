import { gql } from "apollo-boost";

export const FACEBOOK_CONNECT = gql`
  mutation FacebookConnect(
    $username: String!
    $firstName: String!
    $lastName: String!
    $email: String
    $gender: String
    $latitude: Float!
    $longitude: Float!
    $cityId: String!
    $cityName: String!
    $countryCode: String!
    $fbId: String!
  ) {
    facebookConnect(
      username: $username
      firstName: $firstName
      lastName: $lastName
      email: $email
      gender: $gender
      latitude: $latitude
      longitude: $longitude
      cityId: $cityId
      cityName: $cityName
      countryCode: $countryCode
      fbId: $fbId
    ) {
      token
    }
  }
`;
