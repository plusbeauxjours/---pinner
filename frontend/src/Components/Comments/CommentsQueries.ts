import { gql } from "apollo-boost";

export const GET_COMMENTS = gql`
  query GetComments($cardId: Int!) {
    getComments(cardId: $cardId) {
      comments {
        id
        message
        creator {
          username
        }
      }
    }
  }
`;
