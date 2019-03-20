import { gql } from "apollo-boost";

export const REPORT_LOCATION = gql`
  mutation ReportLocation(
    $currentLat: Float!
    $currentLng: Float!
    $currentCity: String!
    $currentCountry: String!
    $currentCountryCode: String!
    $cityPhotoURL: String!
    $currentContinent: String!
  ) {
    reportLocation(
      currentLat: $currentLat
      currentLng: $currentLng
      currentCity: $currentCity
      currentCountry: $currentCountry
      currentCountryCode: $currentCountryCode
      cityPhotoURL: $cityPhotoURL
      currentContinent: $currentContinent
    ) {
      ok
    }
  }
`;
