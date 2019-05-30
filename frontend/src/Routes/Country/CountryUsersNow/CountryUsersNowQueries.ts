import gql from "graphql-tag";
import { PROFILE_FRAGMENT } from "src/sharedQueries";

export const COUNTRY_USERS_NOW = gql`
  query CountryUsersNow($page: Int, $countryName: String!) {
    countryUsersNow(page: $page, countryName: $countryName) {
      page
      hasNextPage
      usersNow {
        profile {
          ...ProfileParts
        }
      }
    }
  }
  ${PROFILE_FRAGMENT}
`;
