import gql from "graphql-tag";
import { COUNTRY_FRAGMENT } from "src/sharedQueries";

export const TOP_CONTINENTS = gql`
  query TopContinents($userName: String!) {
    topContinents(userName: $userName) {
      continents {
        count
        diff
        ...ContinentParts
      }
    }
  }
  ${COUNTRY_FRAGMENT}
`;
