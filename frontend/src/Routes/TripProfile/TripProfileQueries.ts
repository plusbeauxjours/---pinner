import gql from "graphql-tag";
import {} from "src/sharedQueries";

export const TRIP_PROFILE = gql`
  query TripProfile($cityName: String!, $startDate: Date!, $endDate: Date!) {
    tripProfile(cityName: $cityName, startDate: $startDate, endDate: $endDate) {
      usersBefore {
        actor {
          profile {
            id
            username
            avatar
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
