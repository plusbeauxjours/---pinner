import { gql } from "apollo-boost";

export const ME = gql`
  query me {
    me {
      user {
        username
      }
    }
  }
`;

export const USER_FRAGMENT = gql`
  fragment UserParts on UserType {
    id
    username
    profile {
      isFollowing
      avatar
    }
  }
`;

export const CARD_FRAGMENT = gql`
  fragment CardParts on CardType {
    id
    likeCount
    commentCount
    file
  }
`;
