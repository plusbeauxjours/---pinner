import { gql } from "apollo-boost";

export const COMPLETE_PHONE_SIGN_IN = gql`
  mutation CompletePhoneVerification($key: String!, $phoneNumber: String!) {
    completePhoneVerification(key: $key, phoneNumber: $phoneNumber) {
      ok
      token
    }
  }
`;
