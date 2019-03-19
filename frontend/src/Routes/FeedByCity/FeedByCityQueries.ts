import gql from "graphql-tag";
import { DETAIL_CARD_FRAGMENT } from "src/sharedQueries";

export const GET_FEED_BY_CITY = gql`
  query FeedByCity($page: Int!, $cityName: String!) {
    feedByCity(page: $page, cityName: $cityName) {
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
          countryCode
        }
        cardCount
        userCount
        userLogCount
      }
    }
  }
  ${DETAIL_CARD_FRAGMENT}
`;
