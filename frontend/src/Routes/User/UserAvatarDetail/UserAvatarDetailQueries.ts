import { gql } from "apollo-boost";

export const GET_AVATAR_DETAIL = gql`
  query GetAvatarDetail($avatarId: String!) {
    getAvatarDetail(avatarId: $avatarId) {
      avatar {
        uuid
        image
        isMain
        likeCount
        thumbnail
      }
    }
  }
`;
