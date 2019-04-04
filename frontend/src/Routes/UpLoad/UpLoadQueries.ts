import gql from "graphql-tag";
import { DETAIL_CARD_FRAGMENT } from "../../sharedQueries";

export const UPLOAD_CARD = gql`
  mutation UploadCard($caption: String!) {
    uploadCard(caption: $caption) {
      ok
      card {
        ...DetailParts
      }
    }
  }
  ${DETAIL_CARD_FRAGMENT}
`;
