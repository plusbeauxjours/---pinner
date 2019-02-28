import { gql } from "apollo-boost";

export const GET_FOOTPRINT = gql`
  query GetFootprints {
    getFootprints {
      footprints {
        id
        country {
          countryname
          countrycode
        }
        city {
          cityname
        }
        createdAt
      }
    }
  }
`;
