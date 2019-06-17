import { gql } from "apollo-boost";
import { COFFEE_FRAGMENT } from "../../../sharedQueries";

export const GET_COFFEES = gql`
  query GetCoffees(
    $cityId: String
    $countryCode: String
    $userName: String
    $location: String!
  ) {
    getCoffees(
      cityId: $cityId
      countryCode: $countryCode
      userName: $userName
      location: $location
    ) {
      coffees {
        ...CoffeeParts
      }
    }
  }
  ${COFFEE_FRAGMENT}
`;
