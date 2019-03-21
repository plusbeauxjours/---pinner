import gql from "graphql-tag";

export const CONTINENT_PROFILE = gql`
  query ContinentProfile($page: Int!, $continentName: String!) {
    continentProfile(page: $page, continentName: $continentName) {
      continent {
        continentName
        continentPhoto
        countryCount
      }
      countries {
        countryName
        countryCode
        countryPhoto
        cityCount
        cardCount
      }
    }
  }
`;
