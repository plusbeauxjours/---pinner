import { gql } from "apollo-boost";

export const GET_MATCHES = gql`
  query GetMatches($matchPage: Int) {
    getMatches(matchPage: $matchPage) {
      matches {
        id
        naturalTime
        city {
          cityName
          country {
            countryName
          }
        }
        host {
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
        guest {
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
        coffee {
          id
          target
        }
        status
        isHost
        isGuest
        isMatching
      }
    }
  }
`;
