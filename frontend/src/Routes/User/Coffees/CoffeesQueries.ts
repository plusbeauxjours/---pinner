import { gql } from "apollo-boost";
import { COFFEE_FRAGMENT } from "../../../sharedQueries";

export const GET_COFFEES = gql`
  query GetCoffees($cityId: String, $userName: String, $location: String!) {
    getCoffees(cityId: $cityId, userName: $userName, location: $location) {
      coffees {
        ...CoffeeParts
      }
    }
  }
  ${COFFEE_FRAGMENT}
`;
