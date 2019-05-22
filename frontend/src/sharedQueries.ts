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
      isFollowing
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
    isFollowing
    isSelf
    currentCity {
      cityName
      country {
        countryName
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

export const NOTIFICATION_FRAGMENT = gql`
  fragment NotificationParts on NotificationType {
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
      }
    }
    verb
    card {
      id
    }
    comment {
      id
      message
    }
    match {
      id
    }
    read
    naturalTime
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
        isFollowing
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
        isFollowing
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
