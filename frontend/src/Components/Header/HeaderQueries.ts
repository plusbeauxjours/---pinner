import { gql } from "apollo-boost";
import {
  USER_FRAGMENT,
  CITY_FRAGMENT,
  COUNTRY_FRAGMENT,
  CONTINENT_FRAGMENT
} from "src/sharedQueries";

export const GET_HEADER = gql`
  query Header($cityId: String!) {
    header(cityId: $cityId) {
      city {
        cityId
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

export const SEARCH = gql`
  query SearchTerms($search: String!) {
    searchUsers(search: $search) {
      users {
        ...UserParts
      }
    }
    searchCities(search: $search) {
      cities {
        ...CityParts
      }
    }
    searchCountries(search: $search) {
      countries {
        ...CountryParts
      }
    }
    searchContinents(search: $search) {
      continents {
        ...ContinentParts
      }
    }
  }
  ${USER_FRAGMENT}
  ${CITY_FRAGMENT}
  ${COUNTRY_FRAGMENT}
  ${CONTINENT_FRAGMENT}
`;
