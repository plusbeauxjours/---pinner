import { gql } from "apollo-boost";
import {
  DETAIL_CARD_FRAGMENT,
  USER_FRAGMENT,
  CITY_FRAGMENT
} from "../../sharedQueries";

export const GET_FEED = gql`
  query Feed($page: Int!, $cityName: String!) {
    feed(page: $page, cityName: $cityName) {
      cards {
        ...DetailParts
      }
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
  mutation RequestCoffee(
    $currentCity: String!
    $currentCountry: String!
    $target: String
  ) {
    requestCoffee(
      currentCity: $currentCity
      currentCountry: $currentCountry
      target: $target
    ) {
      ok
    }
  }
`;

export const GET_COFFEES = gql`
  query GetCoffees($cityName: String!, $coffeePage: Int) {
    getCoffees(cityName: $cityName, coffeePage: $coffeePage) {
      coffees {
        id
        city {
          ...CityParts
        }
        host {
          ...UserParts
        }
        expires
        status
        target
        naturalTime
      }
    }
  }
  ${USER_FRAGMENT}
  ${CITY_FRAGMENT}
`;

export const GET_MATCHES = gql`
  query GetMatches($matchPage: Int) {
    getMatches(matchPage: $matchPage) {
      matches {
        id
        city {
          ...CityParts
        }
        host {
          ...UserParts
        }
        guest {
          ...UserParts
        }
        status
      }
    }
  }
  ${USER_FRAGMENT}
  ${CITY_FRAGMENT}
`;
