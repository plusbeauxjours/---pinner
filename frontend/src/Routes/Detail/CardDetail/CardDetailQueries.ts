import gql from "graphql-tag";
import { DETAIL_CARD_FRAGMENT } from "../../../sharedQueries";

export const GET_CARD = gql`
  query CardDetail($cardId: Int!) {
    cardDetail(cardId: $cardId) {
      card {
        ...DetailParts
      }
    }
  }
  ${DETAIL_CARD_FRAGMENT}
`;
