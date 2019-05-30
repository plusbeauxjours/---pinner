import gql from "graphql-tag";
import { PROFILE_FRAGMENT } from "src/sharedQueries";

export const CITY_USERS_BEFORE = gql`
  query CityUsersBefore($page: Int, $cityName: String!) {
    cityUsersBefore(page: $page, cityName: $cityName) {
      usersBefore {
        actor {
          profile {
            ...ProfileParts
          }
        }
      }
    }
  }
  ${PROFILE_FRAGMENT}
`;
