import { gql } from "apollo-boost";

export const TOGGLE_LIKE_CARD = gql`
  mutation LikeCard($cardId: Int!) {
    likeCard(cardId: $cardId) {
      ok
    }
  }
`;

export const DELETE_CARD = gql`
  mutation DeleteCard($cardId: Int!) {
    deleteCard(cardId: $cardId) {
      ok
      cardId
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($cardId: Int!, $message: String!) {
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

export const DELETE_COMMENT = gql`
  mutation DeleteComment($cardId: Int!, $commentId: Int!) {
    deleteComment(cardId: $cardId, commentId: $commentId) {
      ok
      cardId
      commentId
    }
  }
`;
