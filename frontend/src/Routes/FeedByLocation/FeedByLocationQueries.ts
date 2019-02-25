import gql from "graphql-tag";
import { DETAIL_CARD_FRAGMENT } from "src/sharedQueries";

export const GET_FEED_BY_LOCATION = gql`
  query FeedByLocaion($page: Int!, $countryname: String!) {
    feedByLocation(page: $page, countryname: $countryname) {
      cards {
        ...DetailParts
      }
    }
  }
  ${DETAIL_CARD_FRAGMENT}
`;
