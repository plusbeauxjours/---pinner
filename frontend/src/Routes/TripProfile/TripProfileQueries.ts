import gql from "graphql-tag";
import {} from "src/sharedQueries";

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
        target
        host {
          profile {
            avatar
          }
        }
      }
      city {
        latitude
        longitude
        cityId
        cityName
        cityPhoto
        country {
          countryName
          countryPhoto
          countryCode
        }
        userCount
        userLogCount
        count
        diff
      }
    }
  }
`;
