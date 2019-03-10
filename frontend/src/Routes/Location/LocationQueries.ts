import gql from "graphql-tag";

export const GET_CITY = gql`
  query GetCities {
    getCities {
      cities {
        id
        cityName
        country {
          id
          countryName
          countryCode
        }
        userCount
        userLogCount
        cardCount
      }
    }
  }
`;
