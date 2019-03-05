import { gql } from "apollo-boost";
import { USER_FRAGMENT, CARD_FRAGMENT } from "src/sharedQueries";

export const SEARCH = gql`
  query SearchTerms($term: String!) {
    searchUsers(term: $term) {
      users {
        ...UserParts
      }
    }
    searchCards(term: $term) {
      cards {
        ...CardParts
      }
    }
  }
  ${USER_FRAGMENT}
  ${CARD_FRAGMENT}
`;
