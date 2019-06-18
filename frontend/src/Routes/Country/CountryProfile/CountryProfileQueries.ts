import gql from "graphql-tag";
import {
  CITY_FRAGMENT,
  COUNTRY_FRAGMENT,
  CONTINENT_FRAGMENT,
  PROFILE_FRAGMENT
} from "src/sharedQueries";

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
          ...ContinentParts
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
      cities {
        ...CityParts
      }
    }
  }
  ${CITY_FRAGMENT}
  ${PROFILE_FRAGMENT}
  ${CONTINENT_FRAGMENT}
`;

export const GET_COUNTRIES = gql`
  query GetCountries($countryCode: String!) {
    getCountries(countryCode: $countryCode) {
      countries {
        ...CountryParts
      }
    }
  }
  ${COUNTRY_FRAGMENT}
`;
