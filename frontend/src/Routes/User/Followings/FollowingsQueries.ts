import { gql } from "apollo-boost";
import { PROFILE_FRAGMENT } from "../../../sharedQueries";

export const GET_FOLLOWINGS = gql`
  query GetFollowings($userName: String!) {
    getFollowings(userName: $userName) {
      profiles {
        ...ProfileParts
      }
    }
  }
  ${PROFILE_FRAGMENT}
`;
