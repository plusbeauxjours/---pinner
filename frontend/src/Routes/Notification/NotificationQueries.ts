import gql from "graphql-tag";

export const GET_ALL_NOTIFICATION = gql`
  query GetAllNotifications($page: Int!) {
    getAllNotifications(page: $page) {
      notifications {
        __typename
        ... on NotificationType {
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
          payload {
            id
            caption
          }
          comment {
            message
          }
          read
          naturalTime
        }
        ... on MoveNotificationType {
          city {
            cityName
            country {
              countryName
              countryCode
            }
          }
        }
        ... on CoffeeNotificationType {
          id
          host {
            profile {
              username
              avatar
              currentCity {
                cityName
                country {
                  countryName
                }
              }
            }
          }
          target
          payload {
            expires
          }
        }
        ... on MatchNotificationType {
          id
        }
      }
    }
  }
`;

export const GET_NOTIFICATION = gql`
  query GetNotifications($page: Int!) {
    getNotifications(page: $page) {
      ok
      notifications {
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
        payload {
          id
          caption
        }
        comment {
          message
        }
        read
        naturalTime
      }
    }
  }
`;

export const GET_MATCH_NOTIFICATION = gql`
  query GetMatchNotifications {
    getMatchNotifications {
      ok
      matchNotifications {
        id
        host {
          profile {
            username
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
        city {
          cityName
          country {
            countryName
          }
        }
        read
        naturalTime
      }
    }
  }
`;

export const GET_COFFEE_NOTIFICATION = gql`
  query GetCoffeeNotifications {
    getCoffeeNotifications {
      ok
      coffeeNotifications {
        id
        host {
          profile {
            username
            avatar
            currentCity {
              cityName
              country {
                countryName
              }
            }
          }
        }
        target
        verb
        payload {
          id
          expires
        }
        city {
          cityName
          country {
            countryName
          }
        }
        read
        naturalTime
      }
    }
  }
`;

export const GET_MOVE_NOTIFICATION = gql`
  query GetMoveNotifications($page: Int!) {
    getMoveNotifications(page: $page) {
      ok
      notifications {
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
        city {
          cityName
          country {
            countryName
            countryCode
          }
        }
        read
        naturalTime
      }
    }
  }
`;

export const MARK_AS_READ = gql`
  mutation MarkAsRead($notificationId: Int!) {
    markAsRead(notificationId: $notificationId) {
      ok
    }
  }
`;
