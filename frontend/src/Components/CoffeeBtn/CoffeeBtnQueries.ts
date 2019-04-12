import { gql } from "apollo-boost";

export const MATCH = gql`
  mutation Match($coffeeId: Int!) {
    match(coffeeId: $coffeeId) {
      ok
    }
  }
`;

export const UNMATCH = gql`
  mutation UnMatch($matchId: Int!) {
    unMatch(matchId: $matchId) {
      ok
    }
  }
`;
