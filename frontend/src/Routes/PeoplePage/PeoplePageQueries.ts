import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "src/sharedQueries";

export const RECOMMAND_USERS = gql`
  query RecommandUsers($page: Int) {
    recommandUsers(page: $page) {
      page
      hasNextPage
      users {
        ...UserParts
      }
    }
  }
  ${USER_FRAGMENT}
`;
