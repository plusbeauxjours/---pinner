import gql from "graphql-tag";
import { PROFILE_FRAGMENT } from "src/sharedQueries";

export const CONTINENT_USERS_NOW = gql`
  query ContinentUsersNow($page: Int, $continentName: String!) {
    continentUsersNow(page: $page, continentName: $continentName) {
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
