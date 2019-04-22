import { gql } from "apollo-boost";
import { CITY_FRAGMENT, USER_FRAGMENT } from "src/sharedQueries";

export const GET_MATCHES = gql`
  query GetMatches($matchPage: Int) {
    getMatches(matchPage: $matchPage) {
      matches {
        id
        naturalTime
        city {
          ...CityParts
        }
        host {
          ...UserParts
        }
        guest {
          ...UserParts
        }
        coffee {
          id
        }
        status
        isHost
        isGuest
        isMatching
      }
    }
  }
  ${USER_FRAGMENT}
  ${CITY_FRAGMENT}
`;
