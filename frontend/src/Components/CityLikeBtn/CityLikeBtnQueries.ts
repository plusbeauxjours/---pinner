import { gql } from "apollo-boost";

export const TOGGLE_LIKE_CITY = gql`
  mutation ToggleLikeCity($cityId: Int!) {
    toggleLikeCity(cityId: $cityId) {
      ok
    }
  }
`;
