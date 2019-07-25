import { gql } from "apollo-boost";

export const COMPLETE_PHONE_SIGN_IN = gql`
  mutation CompletePhoneVerification(
    $key: String!
    $phoneNumber: String!
    $cityId: String!
  ) {
    completePhoneVerification(
      key: $key
      phoneNumber: $phoneNumber
      cityId: $cityId
    ) {
      ok
      token
    }
  }
`;
