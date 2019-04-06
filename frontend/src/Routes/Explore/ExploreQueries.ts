import { gql } from "apollo-boost";
import { CITY_FRAGMENT } from "src/sharedQueries";

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
