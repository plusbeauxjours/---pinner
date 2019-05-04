import gql from "graphql-tag";

export const CONTINENT_PROFILE = gql`
  query ContinentProfile($page: Int, $continentName: String!) {
    continentProfile(page: $page, continentName: $continentName) {
      usersNow {
        id
        profile {
          username
          avatar
        }
      }
      usersBefore {
        id
        actor {
          profile {
            username
            avatar
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
