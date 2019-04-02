import gql from "graphql-tag";
import { CARD_FRAGMENT } from "src/sharedQueries";

export const TRIP_PROFILE = gql`
  query TripProfile($cityName: String!) {
    tripProfile(cityName: $cityName) {
      usersNow {
        username
        avatar
      }
      city {
        cityName
        cityPhoto
        country {
          countryName
          countryPhoto
          countryCode
        }
        cardCount
        userCount
        userLogCount
      }
    }
  }
`;

export const GET_DURATION_USERS = gql`
  query GetDurationUsers(
    $page: Int!
    $cityName: String!
    $startDate: Date!
    $endDate: Date!
  ) {
    getDurationUsers(
      page: $page
      cityName: $cityName
      startDate: $startDate
      endDate: $endDate
    ) {
      moveNotifications {
        id
        actor {
          username
          profile {
            avatar
            currentCity {
              cityName
              cityPhoto
            }
          }
        }
        startDate
        endDate
      }
    }
  }
`;

export const GET_DURATION_CARDS = gql`
  query GetDurationCards(
    $page: Int!
    $cityName: String!
    $startDate: Date!
    $endDate: Date!
  ) {
    getDurationCards(
      page: $page
      cityName: $cityName
      startDate: $startDate
      endDate: $endDate
    ) {
      cards {
        ...CardParts
      }
    }
  }
  ${CARD_FRAGMENT}
`;
