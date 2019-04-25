import React from "react";
import { GetCommentsVariables, GetComments } from "../../types/api";
import { Query } from "react-apollo";
import CommentsPresenter from "./CommentsPresenter";
import { GET_COMMENTS } from "./CommentsQueries";

class GetCommentsQuery extends Query<GetComments, GetCommentsVariables> {}

interface IProps {
  openedComment: boolean;
  cardId: string;
  getDeleteCommentId?: any;
}

interface IState {
  cardId: string;
}

class CommentsContainer extends React.Component<IProps, IState> {
  public render() {
    const { getDeleteCommentId, openedComment, cardId } = this.props;
    return (
      <GetCommentsQuery
        query={GET_COMMENTS}
        variables={{ cardId: parseInt(cardId, 10) }}
      >
        {({ data: commentsData, loading: commentsLoading }) => (
          <CommentsPresenter
            openedComment={openedComment}
            commentsData={commentsData}
            commentsLoading={commentsLoading}
            getDeleteCommentId={getDeleteCommentId}
          />
        )}
      </GetCommentsQuery>
    );
  }
}

export default CommentsContainer;
