import gql from "graphql-tag";
import { NOTIFICATION_FRAGMENT } from "../../sharedQueries";

export const GET_NOTIFICATION = gql`
  query GetNotifications($page: Int) {
    getNotifications(page: $page) {
      page
      hasNextPage
      notifications {
        ...NotificationParts
      }
    }
  }
  ${NOTIFICATION_FRAGMENT}
`;

// export const SEARCH_GET_NOTIFICATION = gql`
//   query SearchGetNotifications($page: Int, $search: String) {
//     searchGetNotifications(page: $page, search: $search) {
//       page
//       hasNextPage
//       notifications {
//         ...NotificationParts
//       }
//     }
//   }
//   ${NOTIFICATION_FRAGMENT}
// `;

export const MARK_AS_READ = gql`
  mutation MarkAsRead($notificationId: Int!) {
    markAsRead(notificationId: $notificationId) {
      notificationId
      ok
    }
  }
`;
