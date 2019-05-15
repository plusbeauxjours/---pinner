import { gql } from "apollo-boost";
import { MATCH_FRAGMENT } from "src/sharedQueries";

export const GET_MATCHES = gql`
  query GetMatches($matchPage: Int) {
    getMatches(matchPage: $matchPage) {
      matches {
        ...MatchParts
      }
    }
  }
  ${MATCH_FRAGMENT}
`;
