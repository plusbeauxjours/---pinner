import gql from "graphql-tag";

export const GET_NOTIFICATION = gql`
  query GetNotifictions($page: Int!) {
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
        createdAt
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
        createdAt
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
