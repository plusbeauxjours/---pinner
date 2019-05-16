import { gql } from "apollo-boost";
import {
  USER_FRAGMENT,
  CARD_FRAGMENT,
  CITY_FRAGMENT,
  COUNTRY_FRAGMENT,
  CONTINENT_FRAGMENT
} from "src/sharedQueries";

export const SEARCH = gql`
  query SearchTerms($search: String!) {
    searchUsers(search: $search) {
      users {
        ...UserParts
      }
    }
    searchCards(search: $search) {
      cards {
        ...CardParts
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
  ${CARD_FRAGMENT}
  ${CITY_FRAGMENT}
  ${COUNTRY_FRAGMENT}
  ${CONTINENT_FRAGMENT}
`;
