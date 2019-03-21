import gql from "graphql-tag";
import { DETAIL_CARD_FRAGMENT } from "src/sharedQueries";

export const COUNTRY_PROFILE = gql`
  query CountryProfile($page: Int!, $countryName: String!) {
    countryProfile(page: $page, countryName: $countryName) {
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
      country {
        countryName
        countryCode
        countryPhoto
        cityCount
        cardCount
        continent {
          continentPhoto
          continentName
        }
      }
    }
  }
  ${DETAIL_CARD_FRAGMENT}
`;
