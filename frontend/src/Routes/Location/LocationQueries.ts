import gql from "graphql-tag";

export const GET_COUNTRY = gql`
  query GetCountries {
    getCountries {
      countries {
        id
        countryname
        countrycode
      }
    }
  }
`;

export const GET_CITY = gql`
  query GetCities {
    getCities {
      cities {
        id
        cityname
      }
    }
  }
`;
