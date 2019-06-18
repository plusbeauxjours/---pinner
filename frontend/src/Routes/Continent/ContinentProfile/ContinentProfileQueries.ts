import gql from "graphql-tag";
import {
  PROFILE_FRAGMENT,
  COUNTRY_FRAGMENT,
  CONTINENT_FRAGMENT
} from "src/sharedQueries";

export const CONTINENT_PROFILE = gql`
  query ContinentProfile($page: Int, $continentCode: String!) {
    continentProfile(page: $page, continentCode: $continentCode) {
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
      continent {
        ...ContinentParts
      }
      continents {
        ...ContinentParts
      }
      countries {
        ...CountryParts
        cityCount
      }
    }
  }
  ${PROFILE_FRAGMENT}
  ${COUNTRY_FRAGMENT}
  ${CONTINENT_FRAGMENT}
`;
