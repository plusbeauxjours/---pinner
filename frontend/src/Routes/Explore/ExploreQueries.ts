import { gql } from "apollo-boost";
import { USER_FRAGMENT, CARD_FRAGMENT } from "src/sharedQueries";

export const EXPLORE_QUERY = gql`
  query explore {
    latestUsers {
      users {
        ...UserParts
      }
    }
    latestCards {
      cards {
        ...CardParts
      }
    }
  }
  ${USER_FRAGMENT}
  ${CARD_FRAGMENT}
`;
