import { gql } from "apollo-boost";
import { PROFILE_FRAGMENT } from "../../sharedQueries";

export const GET_FOLLOWERS = gql`
  query GetFollowers($username: String!) {
    getFollowers(username: $username) {
      profiles {
        ...ProfileParts
      }
    }
  }
  ${PROFILE_FRAGMENT}
`;
