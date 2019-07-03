import { gql } from "apollo-boost";
import { PROFILE_FRAGMENT } from "src/sharedQueries";

export const RECOMMAND_USERS = gql`
  query RecommandUsers($page: Int) {
    recommandUsers(page: $page) {
      page
      hasNextPage
      users {
        profile {
          ...ProfileParts
        }
      }
    }
  }
  ${PROFILE_FRAGMENT}
`;
