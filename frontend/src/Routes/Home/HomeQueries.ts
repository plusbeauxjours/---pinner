import { gql } from "apollo-boost";

export const REPORT_LOCATION = gql`
  mutation ReportLocation(
    $lastCity: String!
    $lastCountry: String!
    $lastLat: Float!
    $lastLng: Float!
  ) {
    reportLocation(
      lastCity: $lastCity
      lastCountry: $lastCountry
      lastLat: $lastLat
      lastLng: $lastLng
    ) {
      ok
    }
  }
`;
