import gql from "graphql-tag";
import { CARD_FRAGMENT } from "src/sharedQueries";

export const CONTINENT_PROFILE = gql`
  query ContinentProfile($page: Int, $continentName: String!) {
    continentProfile(page: $page, continentName: $continentName) {
      continent {
        continentName
        continentPhoto
        countryCount
      }
      countries {
        id
        countryName
        countryCode
        countryPhoto
        continent {
          continentName
        }
        cityCount
        cardCount
      }
      cards {
        ...CardParts
      }
    }
  }
  ${CARD_FRAGMENT}
`;
