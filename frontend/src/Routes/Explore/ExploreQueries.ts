import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "src/sharedQueries";

export const RECOMMAND_USERS = gql`
  query RecommandUsers {
    recommandUsers {
      users {
        ...UserParts
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const NEAR_CITY = gql`
  query NearCities {
    nearCities {
      cities {
        cityName
        cityPhoto
        country {
          countryName
          countryCode
        }
      }
    }
  }
`;

export const NEAR_COUNTRY = gql`
  query NearCountries {
    nearCountries {
      countries {
        countryName
        countryCode
        countryPhoto
      }
    }
  }
`;
