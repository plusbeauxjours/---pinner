import { gql } from "apollo-boost";
import { PROFILE_FRAGMENT } from "../../sharedQueries";

export const GET_FOLLOWERS = gql`
  query GetFollowers($userName: String!) {
    getFollowers(userName: $userName) {
      profiles {
        ...ProfileParts
      }
    }
  }
  ${PROFILE_FRAGMENT}
`;
