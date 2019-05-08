import gql from "graphql-tag";

export const CONTINENT_PROFILE = gql`
  query ContinentProfile($page: Int, $continentName: String!) {
    continentProfile(page: $page, continentName: $continentName) {
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
      continent {
        continentName
        continentPhoto
        countryCount
      }
      countries {
        id
        countryName
        countryCode
        countryPhoto
        continent {
          continentName
        }
        cityCount
        cardCount
      }
    }
  }
`;
