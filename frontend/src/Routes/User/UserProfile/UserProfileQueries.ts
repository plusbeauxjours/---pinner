import { gql } from "apollo-boost";
import { COUNTRY_FRAGMENT } from "src/sharedQueries";

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
          avatars {
            uuid
            image
            isMain
            likeCount
            thumbnail
          }

          website
          email
          nationality {
            countryEmoji
            ...CountryParts
          }
          residence {
            countryEmoji
            ...CountryParts
          }
          postCount
          tripCount
          cityCount
          countryCount
          continentCount
          isSelf
          currentCity {
            latitude
            longitude
            cityName
            cityId
            cityPhoto
            country {
              countryName
              countryCode
            }
          }
        }
      }
    }
  }
  ${COUNTRY_FRAGMENT}
`;

export const GET_AVATARS = gql`
  query GetAvatars($userName: String!) {
    getAvatars(userName: $userName) {
      avatars {
        uuid
        image
        thumbnail
        creator {
          username
          profile {
            isSelf
          }
        }
        isMain
        likeCount
      }
    }
  }
`;

export const GET_TRIPS = gql`
  query GetTrips($username: String!, $tripPage: Int) {
    getTrips(username: $username, tripPage: $tripPage) {
      trip {
        id
        city {
          cityId
          cityName
          cityPhoto
          country {
            countryName
            countryCode
          }
        }
        startDate
        endDate
        naturalTime
        diffDays
      }
    }
  }
`;

export const ADD_TRIP = gql`
  mutation AddTrip(
    $cityId: String!
    $startDate: DateTime!
    $endDate: DateTime!
  ) {
    addTrip(cityId: $cityId, startDate: $startDate, endDate: $endDate) {
      ok
      moveNotification {
        startDate
        endDate
        city {
          cityId
          cityName
          cityPhoto
          country {
            countryName
            countryCode
          }
        }
      }
    }
  }
`;

export const EDIT_TRIP = gql`
  mutation EditTrip(
    $moveNotificationId: Int!
    $cityId: String
    $startDate: DateTime
    $endDate: DateTime
  ) {
    editTrip(
      moveNotificationId: $moveNotificationId
      cityId: $cityId
      startDate: $startDate
      endDate: $endDate
    ) {
      moveNotification {
        id
        city {
          cityId
          cityName
          cityPhoto
          country {
            countryName
            countryCode
          }
        }
        startDate
        endDate
        naturalTime
      }
      ok
    }
  }
`;

export const DELETE_TRIP = gql`
  mutation DeleteTrip($moveNotificationId: Int!) {
    deleteTrip(moveNotificationId: $moveNotificationId) {
      ok
      tripId
    }
  }
`;

export const UPLOAD_AVATAR = gql`
  mutation UploadAvatar($file: Upload!) {
    uploadAvatar(file: $file) {
      ok
      avatar {
        uuid
        image
        thumbnail
        creator {
          username
          profile {
            isSelf
          }
        }
        isMain
        likeCount
      }
    }
  }
`;
