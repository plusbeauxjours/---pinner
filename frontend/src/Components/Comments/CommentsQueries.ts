import { gql } from "apollo-boost";

export const GET_COMMENTS = gql`
  query GetComments($cardId: Int!) {
    getComments(cardId: $cardId) {
      comments {
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

export const EDIT_COMMENT = gql`
  mutation EditComment($cardId: Int!, $commentId: Int!, $message: String!) {
    editComment(cardId: $cardId, commentId: $commentId, message: $message) {
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

export const TOGGLE_LIKE_COMMENT = gql`
  mutation ToggleLikeComment($cardId: Int!, $commentId: Int!) {
    toggleLikeComment(cardId: $cardId, commentId: $commentId) {
      ok
      comment {
        isLiked
      }
    }
  }
`;
