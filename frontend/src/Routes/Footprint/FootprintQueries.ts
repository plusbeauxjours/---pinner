import { gql } from "apollo-boost";

export const GET_FOOTPRINT = gql`
  query GetFootprints {
    getFootprints {
      footprints {
        id
        city {
          cityName
          country {
            countryName
            countryCode
          }
        }
        naturalTime
      }
    }
  }
`;
