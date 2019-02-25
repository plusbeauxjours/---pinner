import { gql } from "apollo-boost";

export const REPORT_LOCATION = gql`
  mutation ReportLocation(
    $currentLat: Float!
    $currentLng: Float!
    $currentCity: String!
    $currentCountry: String!
    $currentCountryCode: String!
  ) {
    reportLocation(
      currentLat: $currentLat
      currentLng: $currentLng
      currentCity: $currentCity
      currentCountry: $currentCountry
      currentCountryCode: $currentCountryCode
    ) {
      ok
    }
  }
`;
