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

export const TOP_COUNTRIES = gql`
  query TopCountries($username: String!) {
    topCountries(username: $username) {
      footprints {
        id
        toCity {
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
  query FrequentVisits($username: String!) {
    frequentVisits(username: $username) {
      footprints {
        id
        toCity {
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

export const GET_TRIPS = gql`
  query GetTrips($page: Int!, $username: String!) {
    getTrips(page: $page, username: $username) {
      trips {
        id
        toCity {
          cityName
          cityPhoto
          country {
            countryName
            countryCode
          }
        }
        fromDate
        toDate
        createdAt
      }
    }
  }
`;
