import { gql } from "apollo-boost";
import { DETAIL_CARD_FRAGMENT } from "../../sharedQueries";

export const TOGGLE_LIKE_CARD = gql`
  mutation LikeCard($cardId: Int!) {
    likeCard(cardId: $cardId) {
      ok
    }
  }
`;

export const EDIT_CARD = gql`
  mutation EditCard($cardId: Int!, $cityName: String, $caption: String) {
    editCard(cardId: $cardId, cityName: $cityName, caption: $caption) {
      ok
      card {
        ...DetailParts
      }
    }
  }
  ${DETAIL_CARD_FRAGMENT}
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
        edited
        creator {
          username
          profile {
            isSelf
          }
        }
        isLiked
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
