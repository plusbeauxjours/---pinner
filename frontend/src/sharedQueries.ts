import { gql } from "apollo-boost";

export const ME = gql`
  query Me {
    me {
      user {
        username
        profile {
          currentCity {
            cityName
          }
        }
      }
    }
  }
`;

export const USER_FRAGMENT = gql`
  fragment UserParts on UserType {
    id
    username
    profile {
      isFollowing
      avatar
      currentCity {
        country {
          countryName
        }
        cityName
      }
    }
  }
`;

export const CARD_FRAGMENT = gql`
  fragment CardParts on CardType {
    id
    file
    caption
    likeCount
    commentCount
  }
`;

export const CITY_FRAGMENT = gql`
  fragment CityParts on CityType {
    id
    lat
    lng
    cityName
    cityPhoto
    country {
      countryName
    }
  }
`;

export const COUNTRY_FRAGMENT = gql`
  fragment CountryParts on CountryType {
    id
    countryName
    countryCode
    countryPhoto
    continent {
      continentName
    }
  }
`;

export const CONTINENT_FRAGMENT = gql`
  fragment ContinentParts on ContinentType {
    id
    continentName
    continentPhoto
  }
`;

export const DETAIL_CARD_FRAGMENT = gql`
  fragment DetailParts on CardType {
    id
    file
    caption
    country {
      countryName
    }
    city {
      cityName
    }
    likeCount
    commentCount
    isLiked
    naturalTime
    comments {
      id
      message
      creator {
        username
      }
      __typename
    }
    creator {
      id
      username
      profile {
        avatar
        isFollowing
        isSelf
      }
    }
  }
`;
