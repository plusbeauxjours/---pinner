import { gql } from "apollo-boost";

export const REPORT_LOCATION = gql`
  mutation ReportLocation(
    $currentLat: Float!
    $currentLng: Float!
    $currentCity: String!
    $currentCountryCode: String!
    $currentContinent: String!
  ) {
    reportLocation(
      currentLat: $currentLat
      currentLng: $currentLng
      currentCity: $currentCity
      currentCountryCode: $currentCountryCode
      currentContinent: $currentContinent
    ) {
      ok
    }
  }
`;
