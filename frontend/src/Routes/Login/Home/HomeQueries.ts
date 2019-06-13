import { gql } from "apollo-boost";

export const REPORT_LOCATION = gql`
  mutation ReportLocation(
    $currentLat: Float!
    $currentLng: Float!
    $currentCityId: String
    $currentCityName: String!
    $currentCountryCode: String!
  ) {
    reportLocation(
      currentLat: $currentLat
      currentLng: $currentLng
      currentCityId: $currentCityId
      currentCityName: $currentCityName
      currentCountryCode: $currentCountryCode
    ) {
      ok
    }
  }
`;
