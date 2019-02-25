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
            lastCountry {
              countryname
              countrycode
            }
            lastCity {
              cityname
            }
            currentCountry {
              countryname
              countrycode
            }
            currentCity {
              cityname
            }
          }
        }
        target {
          username
          profile {
            avatar
            currentCountry {
              countryname
            }
            currentCity {
              cityname
            }
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
