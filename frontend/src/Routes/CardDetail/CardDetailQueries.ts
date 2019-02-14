import gql from "graphql-tag";
import { DETAIL_CARD_FRAGMENT } from "../../sharedQueries";

export const GET_CARD = gql`
  query cardDetail($id: Int!) {
    cardDetail(cardId: $id) {
      card {
        ...DetailParts
      }
    }
  }
  ${DETAIL_CARD_FRAGMENT}
`;
