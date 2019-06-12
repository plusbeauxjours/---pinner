import gql from "graphql-tag";
import { CITY_FRAGMENT, PROFILE_FRAGMENT } from "src/sharedQueries";

export const CITY_PROFILE = gql`
  query CityProfile($page: Int, $cityId: String!) {
    cityProfile(page: $page, cityId: $cityId) {
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
        count
        diff
      }
    }
  }
  ${PROFILE_FRAGMENT}
`;

export const NEAR_CITIES = gql`
  query NearCities($cityId: String!) {
    nearCities(cityId: $cityId) {
      cities {
        ...CityParts
      }
    }
  }
  ${CITY_FRAGMENT}
`;
