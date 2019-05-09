import { gql } from "apollo-boost";
import {
  DETAIL_CARD_FRAGMENT,
  COFFEE_FRAGMENT,
  USER_FRAGMENT
} from "../../sharedQueries";

export const GET_FEED = gql`
  query Feed($page: Int!, $cityName: String!) {
    feed(page: $page, cityName: $cityName) {
      usersNow {
        id
        username
        profile {
          avatar
          currentCity {
            cityName
            country {
              countryName
            }
          }
          isFollowing
          isSelf
        }
      }
      usersBefore {
        id
        actor {
          username
          profile {
            avatar
            currentCity {
              cityName
              country {
                countryName
              }
            }
            isFollowing
            isSelf
          }
        }
      }
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
  query GetFeedCards($page: Int!, $cityName: String!) {
    getFeedCards(page: $page, cityName: $cityName) {
      cards {
        ...DetailParts
      }
      hasNextPage
    }
  }
  ${DETAIL_CARD_FRAGMENT}
`;

export const RECOMMAND_USERS = gql`
  query RecommandUsers($recommandUserPage: Int) {
    recommandUsers(recommandUserPage: $recommandUserPage) {
      users {
        ...UserParts
      }
    }
  }
  ${USER_FRAGMENT}
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
