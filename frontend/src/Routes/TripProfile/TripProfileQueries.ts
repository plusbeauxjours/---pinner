import gql from "graphql-tag";
import { CONTINENT_FRAGMENT } from "src/sharedQueries";

export const TRIP_PROFILE = gql`
  query TripProfile($cityId: String!, $startDate: Date!, $endDate: Date!) {
    tripProfile(cityId: $cityId, startDate: $startDate, endDate: $endDate) {
      usersBefore {
        actor {
          profile {
            id
            username
            avatar
            isSelf
            currentCity {
              cityId
              cityName
              country {
                countryName
              }
            }
          }
        }
      }
      userCount
      coffees {
        id
        uuid
        target
        host {
          id
          username
          profile {
            avatar
          }
        }
      }
      city {
        id
        latitude
        longitude
        cityId
        cityName
        cityPhoto
        country {
          countryName
          countryPhoto
          countryCode
          continent {
            ...ContinentParts
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
  ${CONTINENT_FRAGMENT}
`;
