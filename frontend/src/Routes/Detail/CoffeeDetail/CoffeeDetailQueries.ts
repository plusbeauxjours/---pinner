import gql from "graphql-tag";
import { COUNTRY_FRAGMENT } from "src/sharedQueries";

export const COFFEE_DETAIL = gql`
  query CoffeeDetail($coffeeId: Int!) {
    coffeeDetail(coffeeId: $coffeeId) {
      coffee {
        id
        expires
        naturalTime
        status
        target
        host {
          id
          username
          profile {
            isSelf
            avatar
            gender
            currentCity {
              cityName
              country {
                countryName
              }
            }
            isFollowing
            nationality {
              countryEmoji
              ...CountryParts
            }
            residence {
              countryEmoji
              ...CountryParts
            }
            followersCount
            followingCount
            tripCount
          }
        }
      }
    }
  }
  ${COUNTRY_FRAGMENT}
`;
