import gql from "graphql-tag";
import { CITY_FRAGMENT } from "src/sharedQueries";

export const NEAR_CITIES = gql`
  query NearCities($cityId: String!) {
    nearCities(cityId: $cityId) {
      cities {
        ...CityParts
      }
    }
  }
  ${CITY_FRAGMENT}
`;
