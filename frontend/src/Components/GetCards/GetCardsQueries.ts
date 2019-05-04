import gql from "graphql-tag";
import { CARD_FRAGMENT } from "src/sharedQueries";

export const GET_CARDS = gql`
  query GetCards(
    $page: Int
    $location: String!
    $cityName: String
    $countryName: String
    $continentName: String
    $userName: String
  ) {
    getCards(
      page: $page
      location: $location
      cityName: $cityName
      countryName: $countryName
      continentName: $continentName
      userName: $userName
    ) {
      hasNextPage
      cards {
        ...CardParts
      }
    }
  }
  ${CARD_FRAGMENT}
`;
