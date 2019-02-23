import gql from "graphql-tag";

export const GET_NOTIFICATION = gql`
  query GetNotifictions($page: Int!) {
    getNotifications(page: $page) {
      ok
      notifications {
        id
        actor {
          username
        }
        target {
          username
        }
        verb
        payload {
          country {
            countryname
          }
          city {
            cityname
          }
        }
        read
        createdAt
      }
    }
  }
`;
