import { gql } from "apollo-boost";
import { MATCH_FRAGMENT, COFFEE_FRAGMENT } from "src/sharedQueries";

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

export const REQUEST_COFFEE = gql`
  mutation RequestCoffee($currentCity: String!, $target: String) {
    requestCoffee(currentCity: $currentCity, target: $target) {
      ok
      coffee {
        ...CoffeeParts
      }
    }
  }
  ${COFFEE_FRAGMENT}
`;
