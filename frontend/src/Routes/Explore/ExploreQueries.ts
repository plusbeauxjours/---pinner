import { gql } from "apollo-boost";
import {
  USER_FRAGMENT,
  CITY_FRAGMENT,
  COUNTRY_FRAGMENT
} from "src/sharedQueries";

export const RECOMMAND_USERS = gql`
  query RecommandUsers {
    recommandUsers {
      users {
        ...UserParts
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const NEAR_CITY = gql`
  query NearCities {
    nearCities {
      cities {
        ...CityParts
      }
    }
  }
  ${CITY_FRAGMENT}
`;

export const NEAR_COUNTRY = gql`
  query NearCountries {
    nearCountries {
      countries {
        ...CountryParts
      }
    }
  }
  ${COUNTRY_FRAGMENT}
`;
