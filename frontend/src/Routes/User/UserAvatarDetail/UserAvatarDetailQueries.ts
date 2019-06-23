import { gql } from "apollo-boost";

export const GET_AVATAR_DETAIL = gql`
  query GetAvatarDetail($avatarId: String!) {
    getAvatarDetail(avatarId: $avatarId) {
      avatar {
        uuid
        image
        thumbnail
        creator {
          username
          profile {
            isSelf
          }
        }
        isMain
        likeCount
      }
    }
  }
`;
