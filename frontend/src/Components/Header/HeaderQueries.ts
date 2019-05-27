import { gql } from "apollo-boost";

export const GET_FEED = gql`
  query Feed($cityName: String!) {
    feed(cityName: $cityName) {
      city {
        cityName
        cityPhoto
        country {
          countryName
          countryPhoto
          countryCode
        }
        userCount
        userLogCount
      }
    }
  }
`;
