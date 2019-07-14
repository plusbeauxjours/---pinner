import { gql } from "apollo-boost";

export const SETTINGS = gql`
  mutation Settings($payload: String) {
    settings(payload: $payload) {
      user {
        id
        username
        profile {
          isDarkMode
          isHideTrips
          isHideCoffees
          isAutoLocationReport
          isHideCoffees
          isHideCities
          isHideCountries
          isHideContinents
          isAutoLocationReport
        }
      }
    }
  }
`;
