import { gql } from "apollo-boost";

export const TOGGLE_LIKE_CARD = gql`
  mutation likeCard($cardId: Int!) {
    likeCard(cardId: $cardId) {
      ok
    }
  }
`;
