import { gql } from "apollo-boost";

export const TOGGLE_LIKE_CARD = gql`
  mutation likeCard($cardId: Int!) {
    likeCard(cardId: $cardId) {
      ok
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($cardId: Int!, $message: String!) {
    addComment(cardId: $cardId, message: $message) {
      comment {
        id
        creator {
          username
        }
      }
    }
  }
`;
