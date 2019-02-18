import { gql } from "apollo-boost";

export const GET_LOCATION = gql`
  mutation GetLocation(
    $lastCity: String!
    $lastCountry: String!
    $lastLat: Float!
    $lastLng: Float!
  ) {
    getLocation(
      lastCity: $lastCity
      lastCountry: $lastCountry
      lastLat: $lastLat
      lastLng: $lastLng
    ) {
      ok
    }
  }
`;
