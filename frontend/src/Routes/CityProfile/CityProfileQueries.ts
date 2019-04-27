import gql from "graphql-tag";
import {
  CITY_FRAGMENT,
  COUNTRY_FRAGMENT,
  COFFEE_FRAGMENT
} from "src/sharedQueries";

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
        ...CoffeeParts
      }
      city {
        lat
        lng
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
  ${COFFEE_FRAGMENT}
`;

export const NEAR_CITIES = gql`
  query NearCities($cityName: String!) {
    nearCities(cityName: $cityName) {
      cities {
        ...CityParts
      }
    }
  }
  ${CITY_FRAGMENT}
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
