import { gql } from "apollo-boost";
import { PROFILE_FRAGMENT } from "../../sharedQueries";

export const FOLLOW_USER = gql`
  mutation FollowUser($userId: Int!) {
    followUser(userId: $userId) {
      ok
      user {
        profile {
          ...ProfileParts
        }
      }
    }
  }
  ${PROFILE_FRAGMENT}
`;
