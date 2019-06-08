import gql from "graphql-tag";
import { CITY_FRAGMENT, PROFILE_FRAGMENT } from "src/sharedQueries";

export const CITY_PROFILE = gql`
  query CityProfile($page: Int, $cityName: String!) {
    cityProfile(page: $page, cityName: $cityName) {
      usersNow {
        profile {
          ...ProfileParts
        }
      }
      usersBefore {
        actor {
          profile {
            ...ProfileParts
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
          continent {
            continentName
          }
        }
        likeCount
        isLiked
        userCount
        userLogCount
      }
    }
  }
  ${PROFILE_FRAGMENT}
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
