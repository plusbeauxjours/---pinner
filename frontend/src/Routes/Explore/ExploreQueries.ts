import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "src/sharedQueries";

export const EXPLORE_QUERY = gql`
  query explore {
    latestUsers {
      users {
        ...UserParts
      }
    }
  }
  ${USER_FRAGMENT}
`;
