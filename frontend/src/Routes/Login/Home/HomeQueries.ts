import { gql } from "apollo-boost";

export const REPORT_LOCATION = gql`
  mutation ReportLocation(
    $currentLat: Float!
    $currentLng: Float!
    $cityId: String
    $currentCity: String!
    $currentCountryCode: String!
  ) {
    reportLocation(
      currentLat: $currentLat
      currentLng: $currentLng
      cityId: $cityId
      currentCity: $currentCity
      currentCountryCode: $currentCountryCode
    ) {
      ok
    }
  }
`;
