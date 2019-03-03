import gql from "graphql-tag";
import { DETAIL_CARD_FRAGMENT } from "../../sharedQueries";

export const UPLOAD_CARD = gql`
  mutation UploadCard(
    $caption: String!
    $fontColor: String
    $font: String
    $fontSize: String
    $borderRadius: String!
  ) {
    uploadCard(
      caption: $caption
      fontColor: $fontColor
      font: $font
      fontSize: $fontSize
      borderRadius: $borderRadius
    ) {
      ok
      card {
        ...DetailParts
      }
    }
  }
  ${DETAIL_CARD_FRAGMENT}
`;
