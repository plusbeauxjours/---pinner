import gql from "graphql-tag";
import { PROFILE_FRAGMENT } from "src/sharedQueries";

export const CONTINENT_USERS_BEFORE = gql`
  query ContinentUsersBefore($page: Int, $continentName: String!) {
    continentUsersBefore(page: $page, continentName: $continentName) {
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
