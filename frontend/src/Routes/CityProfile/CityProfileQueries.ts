import gql from "graphql-tag";
import { DETAIL_CARD_FRAGMENT } from "src/sharedQueries";

export const CITY_PROFILE = gql`
  query CityProfile($page: Int!, $cityName: String!) {
    cityProfile(page: $page, cityName: $cityName) {
      cards {
        ...DetailParts
      }
      usersNow {
        id
        username
        profile {
          avatar
        }
      }
      usersBefore {
        id
        actor {
          username
          profile {
            avatar
          }
        }
      }
      city {
        cityName
        cityPhoto
        country {
          countryName
          countryPhoto
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

export const GET_HEATMAP_DATA = gql`
  query GetHeatmapData(
    $page: Int
    $cityName: String!
    $startDate: Date!
    $endDate: Date!
  ) {
    getHeatmapData(
      page: $page
      cityName: $cityName
      startDate: $startDate
      endDate: $endDate
    ) {
      cards
    }
  }
`;
