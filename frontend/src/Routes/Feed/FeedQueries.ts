import { gql } from "apollo-boost";
import { DETAIL_CARD_FRAGMENT } from "../../sharedQueries";

export const GET_FEED = gql`
  query Feed($page: Int!, $cityName: String!) {
    feed(page: $page, cityName: $cityName) {
      cards {
        ...DetailParts
      }
      usersNow {
        id
        username
        profile {
          avatar
          currentCity {
            cityName
            country {
              countryName
            }
          }
          isFollowing
        }
      }
      usersBefore {
        id
        actor {
          username
          profile {
            avatar
            currentCity {
              cityName
              country {
                countryName
              }
            }
            isFollowing
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
