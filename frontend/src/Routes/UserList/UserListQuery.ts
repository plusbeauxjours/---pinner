import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "src/sharedQueries";

export const USER_LIST_QUERY = gql`
  query UserList {
    userList {
      users {
        ...UserParts
      }
    }
  }
  ${USER_FRAGMENT}
`;
