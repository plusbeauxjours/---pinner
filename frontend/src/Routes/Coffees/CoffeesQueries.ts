import { gql } from "apollo-boost";
import { COFFEE_FRAGMENT } from "../../sharedQueries";

export const GET_COFFEES = gql`
  query GetCoffees($cityName: String, $userName: String, $location: String!) {
    getCoffees(cityName: $cityName, userName: $userName, location: $location) {
      coffees {
        ...CoffeeParts
      }
    }
  }
  ${COFFEE_FRAGMENT}
`;
