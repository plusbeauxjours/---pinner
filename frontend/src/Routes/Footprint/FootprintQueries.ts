import { gql } from "apollo-boost";

export const GET_FOOTPRINT = gql`
  query GetFootprints {
    getFootprints {
      footprints {
        id
        toCity {
          cityName
          country {
            countryName
            countryCode
          }
        }
        createdAt
      }
    }
  }
`;
