import { gql } from "apollo-boost";
import { DETAIL_CARD_FRAGMENT } from "../../sharedQueries";

export const GET_FEED = gql`
  query feed($page: Int!) {
    feed(page: $page) {
      cards {
        ...DetailParts
      }
    }
  }
  ${DETAIL_CARD_FRAGMENT}
`;
