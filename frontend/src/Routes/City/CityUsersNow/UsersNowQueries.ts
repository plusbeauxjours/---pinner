import gql from "graphql-tag";
import { PROFILE_FRAGMENT } from "src/sharedQueries";

export const CITY_USERS_NOW = gql`
  query CityUsersNow($page: Int, $cityName: String!) {
    cityUsersNow(page: $page, cityName: $cityName) {
      usersNow {
        profile {
          ...ProfileParts
        }
      }
    }
  }
  ${PROFILE_FRAGMENT}
`;
