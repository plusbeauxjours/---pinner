import { gql } from "apollo-boost";
import { COFFEE_FRAGMENT } from "../../../sharedQueries";

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
