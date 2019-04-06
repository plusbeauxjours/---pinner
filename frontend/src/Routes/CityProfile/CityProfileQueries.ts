import gql from "graphql-tag";
import {
  DETAIL_CARD_FRAGMENT,
  CITY_FRAGMENT,
  COUNTRY_FRAGMENT
} from "src/sharedQueries";

export const CITY_PROFILE = gql`
  query CityProfile($page: Int!, $cityName: String!) {
    cityProfile(page: $page, cityName: $cityName) {
      cards {
        ...DetailParts
      }
      usersNow {
        id
        username
        profile {
          avatar
        }
      }
      usersBefore {
        id
        actor {
          username
          profile {
            avatar
          }
        }
      }
      city {
        cityName
        cityPhoto
        country {
          countryName
          countryPhoto
          countryCode
        }
        cardCount
        userCount
        userLogCount
      }
    }
  }
  ${DETAIL_CARD_FRAGMENT}
`;

export const NEAR_CITIES = gql`
  query NearCities($nearCityPage: Int) {
    nearCities(nearCityPage: $nearCityPage) {
      cities {
        ...CityParts
      }
    }
  }
  ${CITY_FRAGMENT}
`;

export const NEAR_COUNTRIES = gql`
  query NearCountries($nearCountryPage: Int) {
    nearCountries(nearCountryPage: $nearCountryPage) {
      countries {
        ...CountryParts
      }
    }
  }
  ${COUNTRY_FRAGMENT}
`;
