import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "src/sharedQueries";

export const RECOMMAND_USERS = gql`
  query RecommandUsers($recommandUserPage: Int) {
    recommandUsers(recommandUserPage: $recommandUserPage) {
      users {
        ...UserParts
      }
    }
  }
  ${USER_FRAGMENT}
`;
