import gql from "graphql-tag";
import { DETAIL_CARD_FRAGMENT } from "../../sharedQueries";

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

export const EDIT_CARD = gql`
  mutation EditCard($cardId: Int!, $cityName: String, $caption: String) {
    editCard(cardId: $cardId, cityName: $cityName, caption: $caption) {
      ok
    }
  }
`;
