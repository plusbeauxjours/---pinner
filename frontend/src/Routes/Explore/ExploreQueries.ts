import { gql } from "apollo-boost";

export const EXPLORE_QUERY = gql`
  query explore {
    latestCards {
      cards {
        id
        likeCount
        commentCount
        file
      }
    }
    latestUsers {
      users {
        id
        username
        profile {
          isFollowing
          avatar
        }
      }
    }
  }
`;
