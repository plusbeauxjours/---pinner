import gql from "graphql-tag";
import { CONTINENT_FRAGMENT } from "src/sharedQueries";

export const TOP_CONTINENTS = gql`
  query TopContinents($userName: String!) {
    topContinents(userName: $userName) {
      count
      continents {
        count
        diff
        ...ContinentParts
      }
    }
  }
  ${CONTINENT_FRAGMENT}
`;
