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

export const DETAIL_CARD_FRAGMENT = gql`
  fragment DetailParts on CardType {
    id
    file
    caption
    location {
      city
    }
    likeCount
    commentCount
    isLiked
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
`;
