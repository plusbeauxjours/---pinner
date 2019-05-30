import gql from "graphql-tag";
import { CITY_FRAGMENT, PROFILE_FRAGMENT } from "src/sharedQueries";

export const COUNTRY_USERS_NOW = gql`
  query CountryUsersNow($page: Int, $countryName: String!) {
    countryProfile(page: $page, countryName: $countryName) {
      usersBefore {
        actor {
          profile {
            ...ProfileParts
          }
        }
      }
    }
  }
  ${CITY_FRAGMENT}
  ${PROFILE_FRAGMENT}
`;
