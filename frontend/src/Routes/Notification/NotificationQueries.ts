import gql from "graphql-tag";

export const GET_NOTIFICATION = gql`
  query GetNotifications($page: Int) {
    getNotifications(page: $page) {
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
