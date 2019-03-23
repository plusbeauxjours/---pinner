import { gql } from "apollo-boost";
import {
  USER_FRAGMENT,
  CARD_FRAGMENT,
  CITY_FRAGMENT,
  COUNTRY_FRAGMENT,
  CONTINENT_FRAGMENT
} from "src/sharedQueries";

export const SEARCH = gql`
  query SearchTerms($term: String!) {
    searchUsers(term: $term) {
      users {
        ...UserParts
      }
    }
    searchCards(term: $term) {
      cards {
        ...CardParts
      }
    }
    searchCities(term: $term) {
      cities {
        ...CityParts
      }
    }
    searchCountries(term: $term) {
      countries {
        ...CountryParts
      }
    }
    searchContinents(term: $term) {
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
