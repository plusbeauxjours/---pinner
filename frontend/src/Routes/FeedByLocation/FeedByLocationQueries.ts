import gql from "graphql-tag";
import { DETAIL_CARD_FRAGMENT } from "src/sharedQueries";

export const FEED_BY_LOCATION = gql`
  query FeedByLocaion($page: Int!, $cityname: String!) {
    feedByLocation(page: $page, cityname: $cityname) {
      cards {
        ...DetailParts
      }
    }
  }
  ${DETAIL_CARD_FRAGMENT}
`;
