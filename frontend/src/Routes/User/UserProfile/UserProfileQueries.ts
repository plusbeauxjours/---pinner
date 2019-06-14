import { gql } from "apollo-boost";
import { CITY_FRAGMENT, COUNTRY_FRAGMENT } from "src/sharedQueries";

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

export const EDIT_PROFILE = gql`
  mutation EditProfile(
    $userName: String
    $bio: String
    $gender: String
    $avatar: String
    $firstName: String
    $lastName: String
    $nationality: String
    $residence: String
    $email: String
  ) {
    editProfile(
      username: $userName
      bio: $bio
      gender: $gender
      avatar: $avatar
      firstName: $firstName
      lastName: $lastName
      nationality: $nationality
      residence: $residence
      email: $email
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
  }
  ${COUNTRY_FRAGMENT}
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
    $cityName: String!
    $startDate: DateTime!
    $endDate: DateTime!
  ) {
    addTrip(cityName: $cityName, startDate: $startDate, endDate: $endDate) {
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

export const SEARCH_TRIP_CITIES = gql`
  query SearchTripCities($search: String!) {
    searchTripCities(search: $search) {
      cities {
        ...CityParts
      }
    }
  }
  ${CITY_FRAGMENT}
`;
