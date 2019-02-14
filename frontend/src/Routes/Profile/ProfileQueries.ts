import { gql } from "apollo-boost";
import { CARD_FRAGMENT } from "src/sharedQueries";

export const GET_USER = gql`
  query userProfile($username: String!) {
    userProfile(username: $username) {
      user {
        id
        username
        firstName
        lastName
        profile {
          bio
          avatar
          website
          postCount
          followersCount
          followingCount
          isFollowing
          isSelf
        }
        cards {
          ...CardParts
        }
      }
    }
  }
  ${CARD_FRAGMENT}
`;
