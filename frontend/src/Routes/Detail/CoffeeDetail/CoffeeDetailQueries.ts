import gql from "graphql-tag";

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
              cityId
              cityName
              country {
                countryName
              }
            }
            nationality {
              countryName
              countryCode
              countryEmoji
            }
            residence {
              countryName
              countryCode
              countryEmoji
            }
            tripCount
          }
        }
      }
    }
  }
`;

export const DELETE_COFFEE = gql`
  mutation DeleteCoffee($coffeeId: Int!) {
    deleteCoffee(coffeeId: $coffeeId) {
      ok
      coffeeId
      username
    }
  }
`;
