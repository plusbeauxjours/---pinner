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
            lastCountry
          }
        }
        target {
          username
          profile {
            avatar
            lastCountry
          }
        }
        verb
        payload {
          id
          country {
            countryname
          }
          city {
            cityname
          }
          caption
        }
        read
        comment {
          message
        }
        createdAt
      }
    }
  }
`;
