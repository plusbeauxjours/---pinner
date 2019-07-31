import gql from "graphql-tag";

export const PHONE_SIGN_IN = gql`
  mutation StartPhoneVerification($phoneNumber: String!) {
    startPhoneVerification(phoneNumber: $phoneNumber) {
      ok
    }
  }
`;
