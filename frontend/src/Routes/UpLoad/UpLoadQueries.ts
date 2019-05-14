import { gql } from "apollo-boost";
import { DETAIL_CARD_FRAGMENT } from "src/sharedQueries";

export const UPLOAD_CARD = gql`
  mutation UploadCard($caption: String!) {
    uploadCard(caption: $caption) {
      card {
        ...DetailParts
      }
    }
  }
  ${DETAIL_CARD_FRAGMENT}
`;
