import { gql } from "apollo-boost";
import { CARD_FRAGMENT } from "src/sharedQueries";

export const GET_USER = gql`
  query UserProfile($username: String!) {
    userProfile(username: $username) {
      user {
        id
        username
        firstName
        lastName
        profile {
          bio
          gender
          avatar
          website
          postCount
          followersCount
          followingCount
          tripCount
          cityCount
          followings {
            id
            user {
              username
              profile {
                avatar
              }
            }
          }
          followers {
            id
            user {
              username
              profile {
                avatar
              }
            }
          }
          isFollowing
          isSelf
          currentCity {
            cityName
            cityPhoto
            country {
              countryName
              countryCode
            }
          }
        }
        cards {
          ...CardParts
        }
      }
    }
  }
  ${CARD_FRAGMENT}
`;

export const EDIT_PROFILE = gql`
  mutation EditProfile(
    $userName: String
    $bio: String
    $gender: String
    $avatar: String
    $firstName: String
    $lastName: String
  ) {
    editProfile(
      username: $userName
      bio: $bio
      gender: $gender
      avatar: $avatar
      firstName: $firstName
      lastName: $lastName
    ) {
      ok
      user {
        id
        username
        firstName
        lastName
        profile {
          bio
          gender
          avatar
        }
      }
    }
  }
`;

export const DELETE_PROFILE = gql`
  mutation DeleteProfile {
    deleteProfile {
      ok
    }
  }
`;

export const GET_TRIPS = gql`
  query GetTrips($username: String!, $tripPage: Int) {
    getTrips(username: $username, tripPage: $tripPage) {
      footprints {
        id
        city {
          cityName
          cityPhoto
          country {
            countryName
            countryCode
          }
        }
        startDate
        endDate
        createdAt
      }
    }
  }
`;

export const ADD_TRIP = gql`
  mutation AddTrip(
    $cityName: String!
    $startDate: DateTime!
    $endDate: DateTime!
  ) {
    addTrip(cityName: $cityName, startDate: $startDate, endDate: $endDate) {
      moveNotification {
        startDate
        endDate
        city {
          cityName
          cityPhoto
          country {
            countryName
          }
        }
      }
      ok
    }
  }
`;

export const EDIT_TRIP = gql`
  mutation EditTrip(
    $moveNotificationId: Int!
    $cityName: String
    $startDate: DateTime
    $endDate: DateTime
  ) {
    editTrip(
      moveNotificationId: $moveNotificationId
      cityName: $cityName
      startDate: $startDate
      endDate: $endDate
    ) {
      moveNotification {
        startDate
        endDate
        city {
          cityName
          cityPhoto
          country {
            countryName
          }
        }
      }
      ok
    }
  }
`;

export const DELETE_TRIP = gql`
  mutation DeleteTrip($moveNotificationId: Int!) {
    deleteTrip(moveNotificationId: $moveNotificationId) {
      ok
    }
  }
`;

export const TOP_COUNTRIES = gql`
  query TopCountries($username: String!, $countryPage: Int) {
    topCountries(username: $username, countryPage: $countryPage) {
      footprints {
        id
        city {
          country {
            countryName
            countryCode
            countryPhoto
          }
        }
      }
    }
  }
`;

export const FREQUENT_VISITS = gql`
  query FrequentVisits($username: String!, $cityPage: Int) {
    frequentVisits(username: $username, cityPage: $cityPage) {
      footprints {
        id
        city {
          cityName
          cityPhoto
          country {
            countryName
          }
        }
      }
    }
  }
`;
