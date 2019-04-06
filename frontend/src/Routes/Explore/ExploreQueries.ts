import { gql } from "apollo-boost";
import { USER_FRAGMENT, CITY_FRAGMENT } from "src/sharedQueries";

export const RECOMMAND_USERS = gql`
  query RecommandUsers($recommandUserPage: Int) {
    recommandUsers(recommandUserPage: $recommandUserPage) {
      users {
        ...UserParts
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const LATEST_CITIES = gql`
  query LatestCities($latestCityPage: Int) {
    latestCities(latestCityPage: $latestCityPage) {
      cities {
        ...CityParts
      }
    }
  }
  ${CITY_FRAGMENT}
`;
