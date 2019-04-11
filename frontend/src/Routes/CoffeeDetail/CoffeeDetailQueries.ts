import gql from "graphql-tag";

export const COFFEE_DETAIL = gql`
  query CoffeeDetail($coffeeId: Int!) {
    coffeeDetail(coffeeId: $coffeeId) {
      coffee {
        expires
        status
        target
        host {
          username
          profile {
            gender
            currentCity {
              cityName
              country {
                countryName
              }
            }
            isFollowing
            nationality {
              countryName
            }
            followersCount
            followingCount
            tripCount
          }
        }
      }
    }
  }
`;
