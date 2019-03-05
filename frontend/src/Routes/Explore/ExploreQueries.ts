import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "src/sharedQueries";

export const EXPLORE_QUERY = gql`
  query Explore {
    latestUsers {
      users {
        ...UserParts
      }
    }
  }
  ${USER_FRAGMENT}
`;
