import gql from "graphql-tag";

export const CREATE_CITY = gql`
  mutation CreateCity(
    $cityId: String!
    $cityName: String!
    $cityLatitude: Float!
    $cityLongitude: Float!
    $countryCode: String!
  ) {
    createCity(
      cityId: $cityId
      cityName: $cityName
      cityLatitude: $cityLatitude
      cityLongitude: $cityLongitude
      countryCode: $countryCode
    ) {
      city {
        id
        latitude
        longitude
        cityName
        cityPhoto
        country {
          countryName
          countryPhoto
          countryCode
          continent {
            continentName
          }
        }
        likeCount
        isLiked
        userCount
        userLogCount
        count
        diff
      }
    }
  }
`;
