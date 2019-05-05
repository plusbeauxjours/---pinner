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
    latitude
    longitude
    cityName
    cityPhoto
    distance
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
    city {
      cityName
      country {
        countryName
      }
    }
    likeCount
    commentCount
    isLiked
    naturalTime
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

export const COFFEE_FRAGMENT = gql`
  fragment CoffeeParts on CoffeeType {
    id
    city {
      cityName
      country {
        countryName
      }
    }
    host {
      id
      username
      profile {
        avatar
        isSelf
      }
    }
    expires
    status
    target
    naturalTime
  }
`;
