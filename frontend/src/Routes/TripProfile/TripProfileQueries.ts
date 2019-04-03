import gql from "graphql-tag";
import { CARD_FRAGMENT } from "src/sharedQueries";

export const TRIP_PROFILE = gql`
  query TripProfile($cityName: String!) {
    tripProfile(cityName: $cityName) {
      usersNow {
        id
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

export const GET_DURATION_AVATARS = gql`
  query GetDurationAvatars(
    $page: Int
    $cityName: String!
    $startDate: Date!
    $endDate: Date!
  ) {
    getDurationAvatars(
      page: $page
      cityName: $cityName
      startDate: $startDate
      endDate: $endDate
    ) {
      usersBefore {
        actor {
          profile {
            id
            username
            avatar
          }
        }
      }
    }
  }
`;

export const GET_DURATION_DAYS = gql`
  query GetDurationDays(
    $page: Int
    $cityName: String!
    $startDate: Date!
    $endDate: Date!
  ) {
    getDurationDays(
      page: $page
      cityName: $cityName
      startDate: $startDate
      endDate: $endDate
    ) {
      myTrips {
        id
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
