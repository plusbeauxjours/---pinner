import { gql } from "apollo-boost";
import { DETAIL_CARD_FRAGMENT, COFFEE_FRAGMENT } from "src/sharedQueries";

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
          countryCount
          continentCount
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
      }
    }
  }
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
        naturalTime
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

export const TOP_COUNTRIES = gql`
  query TopCountries($username: String!) {
    topCountries(username: $username) {
      footprints {
        id
        city {
          country {
            countryName
            countryCode
            countryPhoto
            continent {
              continentName
            }
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
        city {
          latitude
          longitude
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

export const GET_CITIES = gql`
  query GetCities($username: String!) {
    getCities(username: $username) {
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

export const GET_COUNTRIES = gql`
  query GetCountries($username: String!) {
    getCountries(username: $username) {
      footprints {
        id
        city {
          country {
            countryName
            countryPhoto
            continent {
              continentName
            }
          }
        }
      }
    }
  }
`;

export const GET_CONTINENTS = gql`
  query GetContinents($username: String!) {
    getContinents(username: $username) {
      footprints {
        id
        city {
          country {
            continent {
              continentName
              continentPhoto
            }
          }
        }
      }
    }
  }
`;

export const GET_FOLLOWERS = gql`
  query GetFollowers($username: String!) {
    getFollowers(username: $username) {
      profiles {
        id
        username
        avatar
        isFollowing
        currentCity {
          cityName
          country {
            countryName
          }
        }
      }
    }
  }
`;

export const GET_FOLLOWINGS = gql`
  query GetFollowings($username: String!) {
    getFollowings(username: $username) {
      profiles {
        id
        username
        avatar
        isFollowing
        currentCity {
          cityName
          country {
            countryName
          }
        }
      }
    }
  }
`;

export const GET_KNOWING_FOLLOWERS = gql`
  query GetKnowingFollowers($username: String!) {
    getKnowingFollowers(username: $username) {
      count
      profiles {
        id
        username
        avatar
        isFollowing
        currentCity {
          cityName
          country {
            countryName
          }
        }
      }
    }
  }
`;

export const UPLOAD_CARD = gql`
  mutation UploadCard($caption: String!) {
    uploadCard(caption: $caption) {
      card {
        ...DetailParts
      }
    }
  }
  ${DETAIL_CARD_FRAGMENT}
`;

export const GET_MY_COFFEE = gql`
  query GetMyCoffee($username: String!) {
    getMyCoffee(username: $username) {
      requestingCoffees {
        ...CoffeeParts
      }
      coffees {
        ...CoffeeParts
      }
    }
  }
  ${COFFEE_FRAGMENT}
`;

export const DELETE_COFFEE = gql`
  mutation DeleteCoffee($coffeeId: Int!) {
    deleteCoffee(coffeeId: $coffeeId) {
      ok
      coffeeId
      username
    }
  }
`;
