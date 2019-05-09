import gql from "graphql-tag";
import { CITY_FRAGMENT } from "src/sharedQueries";

export const CITY_PROFILE = gql`
  query CityProfile($page: Int!, $cityName: String!) {
    cityProfile(page: $page, cityName: $cityName) {
      usersNow {
        profile {
          id
          username
          avatar
          isFollowing
          isSelf
          currentCity {
            cityName
            country {
              countryName
            }
          }
        }
      }
      usersBefore {
        actor {
          profile {
            id
            username
            avatar
            isFollowing
            isSelf
            currentCity {
              cityName
              country {
                countryName
              }
            }
          }
        }
      }
      coffees {
        id
        target
        host {
          profile {
            avatar
          }
        }
      }
      city {
        id
        latitude
        longitude
        cityName
        cityPhoto
        country {
          countryName
          countryPhoto
          countryCode
        }
        likeCount
        isLiked
        cardCount
        userCount
        userLogCount
      }
    }
  }
`;

export const NEAR_CITIES = gql`
  query NearCities($cityName: String!) {
    nearCities(cityName: $cityName) {
      cities {
        ...CityParts
      }
    }
  }
  ${CITY_FRAGMENT}
`;
