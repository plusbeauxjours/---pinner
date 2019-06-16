import gql from "graphql-tag";
import { CITY_FRAGMENT, PROFILE_FRAGMENT } from "src/sharedQueries";

export const COUNTRY_PROFILE = gql`
  query CountryProfile($page: Int, $countryCode: String!) {
    countryProfile(page: $page, countryCode: $countryCode) {
      country {
        countryName
        countryCode
        countryPhoto
        countryCapital
        countryCurrency
        countryEmoji
        cityCount
        continent {
          continentPhoto
          continentName
        }
      }
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
      cities {
        ...CityParts
      }
    }
  }
  ${CITY_FRAGMENT}
  ${PROFILE_FRAGMENT}
`;
