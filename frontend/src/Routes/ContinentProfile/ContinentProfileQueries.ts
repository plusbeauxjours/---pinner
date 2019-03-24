import gql from "graphql-tag";

export const CONTINENT_PROFILE = gql`
  query ContinentProfile($continentName: String!) {
    continentProfile(continentName: $continentName) {
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
        cityCount
        cardCount
      }
    }
  }
`;
