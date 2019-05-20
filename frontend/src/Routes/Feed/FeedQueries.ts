import { gql } from "apollo-boost";
import { DETAIL_CARD_FRAGMENT, COFFEE_FRAGMENT } from "../../sharedQueries";

export const GET_FEED = gql`
  query Feed($cityName: String!) {
    feed(cityName: $cityName) {
      city {
        cityName
        cityPhoto
        country {
          countryName
          countryPhoto
          countryCode
        }
        userCount
        userLogCount
      }
    }
  }
`;

export const GET_FEED_CARDS = gql`
  query GetFeedCards($page: Int, $cityName: String!) {
    getFeedCards(page: $page, cityName: $cityName) {
      cards {
        ...DetailParts
      }
      hasNextPage
      page
    }
  }
  ${DETAIL_CARD_FRAGMENT}
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
