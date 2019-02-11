import { gql } from "apollo-boost";

export const EXPLORE_QUERY = gql`
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
