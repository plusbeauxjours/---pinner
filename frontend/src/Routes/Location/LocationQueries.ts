import gql from "graphql-tag";

export const GET_CITY = gql`
  query GetCities {
    getCities {
      cities {
        id
        cityname
        country {
          id
          countryname
          countrycode
        }
      }
      userCount
      userLogCount
    }
  }
`;
