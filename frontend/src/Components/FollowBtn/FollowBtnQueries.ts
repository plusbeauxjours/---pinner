import { gql } from "apollo-boost";

export const FOLLOW_USER = gql`
  mutation followUser($userId: Int!) {
    followUser(userId: $userId) {
      ok
    }
  }
`;
