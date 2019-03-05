import gql from "graphql-tag";
import { DETAIL_CARD_FRAGMENT } from "src/sharedQueries";

export const GET_FEED_BY_CITY = gql`
  query FeedByCity($page: Int!, $cityname: String!) {
    feedByCity(page: $page, cityname: $cityname) {
      cards {
        ...DetailParts
      }
    }
  }
  ${DETAIL_CARD_FRAGMENT}
`;

export const GET_USERS_BY_CITY = gql`
  query GetUsersByCity($cityname: String!) {
    getUsersByCity(cityname: $cityname) {
      locationLogs {
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
