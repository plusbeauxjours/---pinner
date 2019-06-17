import { gql } from "apollo-boost";
import { COFFEE_FRAGMENT, MATCH_FRAGMENT } from "src/sharedQueries";

export const MATCH = gql`
  mutation Match($coffeeId: String!) {
    match(coffeeId: $coffeeId) {
      ok
      coffeeId
      match {
        ...MatchParts
      }
    }
  }
  ${MATCH_FRAGMENT}
`;

export const UNMATCH = gql`
  mutation UnMatch($matchId: Int!) {
    unMatch(matchId: $matchId) {
      ok
      matchId
      coffee {
        ...CoffeeParts
      }
    }
  }
  ${COFFEE_FRAGMENT}
`;
