import { gql } from "apollo-boost";

export const GET_FEED = gql`
  query feed($page: Int!) {
    feed(page: $page) {
      cards {
        id
        file
        caption
        location {
          city
        }
        likeCount
        commentCount
        createdAt
        comments {
          id
          message
          creator {
            username
          }
        }
        creator {
          username
          profile {
            avatar
          }
        }
      }
    }
  }
`;
