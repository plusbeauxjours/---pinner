import gql from "graphql-tag";

export const GET_LOCATION = gql`
  query location {
    location {
      locations {
        id
        city
      }
    }
  }
`;
