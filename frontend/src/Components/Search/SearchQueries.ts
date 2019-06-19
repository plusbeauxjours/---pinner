import gql from "graphql-tag";

export const CREATE_CITY = gql`
  mutation CreateCity($cityId: String!) {
    createCity(cityId: $cityId) {
      ok
    }
  }
`;

export const GET_CITY_PHOTO = gql`
  query GetCityPhoto($cityId: String) {
    getCityPhoto(cityId: $cityId) {
      photo
    }
  }
`;

export const GET_COUNTRY_PHOTO = gql`
  query GetCountryPhoto($countryCode: String) {
    getCountryPhoto(countryCode: $countryCode) {
      photo
    }
  }
`;
