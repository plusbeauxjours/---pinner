import gql from "graphql-tag";
import { PROFILE_FRAGMENT } from "src/sharedQueries";

export const COUNTRY_USERS_BEFORE = gql`
  query CountryUsersBefore($page: Int, $countryName: String!) {
    countryUsersBefore(page: $page, countryName: $countryName) {
      page
      hasNextPage
      usersBefore {
        actor {
          profile {
            ...ProfileParts
          }
        }
      }
    }
  }
  ${PROFILE_FRAGMENT}
`;
