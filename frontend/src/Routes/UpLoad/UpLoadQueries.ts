import gql from "graphql-tag";
import { DETAIL_CARD_FRAGMENT } from "../../sharedQueries";

export const UPLOAD_CARD = gql`
  mutation UploadCard(
    $caption: String!
    $city: String!
    $country: String!
    $fontColor: String
    $font: String
    $fontSize: String
    $borderRadius: String!
  ) {
    uploadCard(
      caption: $caption
      city: $city
      country: $country
      fontColor: $fontColor
      font: $font
      fontSize: $fontSize
      borderRadius: $borderRadius
    ) {
      card {
        ...DetailParts
      }
    }
  }
  ${DETAIL_CARD_FRAGMENT}
`;
