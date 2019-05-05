import gql from "graphql-tag";
import { COUNTRY_FRAGMENT } from "src/sharedQueries";

export const CITY_PROFILE = gql`
  query CityProfile($page: Int!, $cityName: String!) {
    cityProfile(page: $page, cityName: $cityName) {
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
      city {
        latitude
        longitude
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
`;

export const NEAR_CITIES = gql`
  query NearCities($cityName: String!) {
    nearCities(cityName: $cityName) {
      cities {
        id
        distance
        latitude
        longitude
        cityName
        cityPhoto
        country {
          countryName
        }
      }
    }
  }
`;

export const NEAR_COUNTRIES = gql`
  query NearCountries($cityName: String!) {
    nearCountries(cityName: $cityName) {
      countries {
        ...CountryParts
      }
    }
  }
  ${COUNTRY_FRAGMENT}
`;
