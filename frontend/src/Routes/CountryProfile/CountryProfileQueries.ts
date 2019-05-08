import gql from "graphql-tag";
import { CITY_FRAGMENT } from "src/sharedQueries";

export const COUNTRY_PROFILE = gql`
  query CountryProfile($page: Int, $countryName: String!) {
    countryProfile(page: $page, countryName: $countryName) {
      country {
        countryName
        countryCode
        countryPhoto
        cityCount
        cardCount
        continent {
          continentPhoto
          continentName
        }
      }
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
      cities {
        ...CityParts
      }
    }
  }
  ${CITY_FRAGMENT}
`;
