import gql from "graphql-tag";
import { PROFILE_FRAGMENT } from "src/sharedQueries";

export const RECOMMAND_USERS = gql`
  query RecommandUsers($page: Int) {
    recommandUsers(page: $page) {
      page
      hasNextPage
      users {
        ...ProfileParts
      }
    }
  }
  ${PROFILE_FRAGMENT}
`;
