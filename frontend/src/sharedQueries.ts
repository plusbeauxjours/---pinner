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
      avatar
      isSelf
      currentCity {
        cityName
        country {
          countryName
        }
      }
    }
  }
`;

export const PROFILE_FRAGMENT = gql`
  fragment ProfileParts on ProfileType {
    id
    username
    avatar
    isSelf
    currentCity {
      cityName
      country {
        countryName
      }
    }
  }
`;

export const CITY_FRAGMENT = gql`
  fragment CityParts on CityType {
    id
    latitude
    longitude
    cityName
    cityId
    cityPhoto
    distance
    country {
      countryName
    }
    likeCount
    isLiked
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
        currentCity {
          cityName
          country {
            countryName
          }
        }
      }
    }
    status
    expires
    target
    createdAt
  }
`;

export const MATCH_FRAGMENT = gql`
  fragment MatchParts on MatchType {
    id
    naturalTime
    city {
      cityName
      country {
        countryName
      }
    }
    host {
      profile {
        id
        username
        avatar
        isSelf
        currentCity {
          cityName
          country {
            countryName
          }
        }
      }
    }
    guest {
      profile {
        id
        username
        avatar
        isSelf
        currentCity {
          cityName
          country {
            countryName
          }
        }
      }
    }
    coffee {
      id
      target
    }
    isHost
    isGuest
    isMatching
  }
`;
