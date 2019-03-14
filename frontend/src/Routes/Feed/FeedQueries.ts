import { gql } from "apollo-boost";
import { DETAIL_CARD_FRAGMENT } from "../../sharedQueries";

export const GET_FEED = gql`
  query Feed($page: Int!, $cityName: String!) {
    feed(page: $page, cityName: $cityName) {
      cards {
        ...DetailParts
      }
      users {
        id
        username
        profile {
          avatar
        }
      }
      city {
        cityName
        cityPhoto
        country {
          countryName
          countryName
        }
        cardCount
        userCount
        userLogCount
      }
    }
  }
  ${DETAIL_CARD_FRAGMENT}
`;
