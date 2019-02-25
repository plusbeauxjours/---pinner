import gql from "graphql-tag";

export const GET_COUNTRY = gql`
  query GetCountry {
    getCountry {
      country {
        id
        countryname
      }
    }
  }
`;

export const GET_CITY = gql`
  query GetCity {
    getCity {
      city {
        id
        cityname
      }
    }
  }
`;
