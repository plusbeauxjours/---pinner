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
        message
        creator {
          username
        }
      }
    }
  }
`;

export const EDIT_COMMENT = gql`
  mutation EditComment($cardId: Int!, $commentId: Int!, $message: String!) {
    editComment(cardId: $cardId, commentId: $commentId, message: $message) {
      ok
      comment {
        id
        message
        edited
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
