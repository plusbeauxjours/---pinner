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
          gender
          avatar
          website
          postCount
          followersCount
          followingCount
          isFollowing
          isSelf
          lastCountry
          lastCity
        }
        cards {
          ...CardParts
        }
      }
    }
  }
  ${CARD_FRAGMENT}
`;

export const EDIT_PROFILE = gql`
  mutation EditProfile(
    $username: String
    $bio: String
    $gender: String
    $avatar: String
    $firstName: String
    $lastName: String
  ) {
    editProfile(
      username: $username
      bio: $bio
      gender: $gender
      avatar: $avatar
      firstName: $firstName
      lastName: $lastName
    ) {
      ok
      user {
        id
        username
        firstName
        lastName
        profile {
          bio
          gender
          avatar
        }
      }
    }
  }
`;
