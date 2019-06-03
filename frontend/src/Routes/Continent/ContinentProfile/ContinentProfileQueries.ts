import gql from "graphql-tag";
import { PROFILE_FRAGMENT, COUNTRY_FRAGMENT } from "src/sharedQueries";

export const CONTINENT_PROFILE = gql`
  query ContinentProfile($page: Int, $continentName: String!) {
    continentProfile(page: $page, continentName: $continentName) {
      usersNow {
        profile {
          ...ProfileParts
        }
      }
      usersBefore {
        actor {
          profile {
            ...ProfileParts
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
        ...CountryParts
        cityCount
      }
    }
  }
  ${PROFILE_FRAGMENT}
  ${COUNTRY_FRAGMENT}
`;
