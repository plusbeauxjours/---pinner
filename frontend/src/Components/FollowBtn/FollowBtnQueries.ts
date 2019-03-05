import { gql } from "apollo-boost";

export const FOLLOW_USER = gql`
  mutation FollowUser($userId: Int!) {
    followUser(userId: $userId) {
      ok
    }
  }
`;
