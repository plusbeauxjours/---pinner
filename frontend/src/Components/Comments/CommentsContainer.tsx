import React from "react";
import {
  GetCommentsVariables,
  GetComments,
  EditComment,
  EditCommentVariables
} from "../../types/api";
import { Query, MutationFn, Mutation } from "react-apollo";
import CommentsPresenter from "./CommentsPresenter";
import { GET_COMMENTS, EDIT_COMMENT } from "./CommentsQueries";
import { toast } from "react-toastify";

class GetCommentsQuery extends Query<GetComments, GetCommentsVariables> {}
class EditCommentMutation extends Mutation<EditComment, EditCommentVariables> {}
interface IProps {
  openedComment: boolean;
  cardId: string;
  deleteCommentGetId?: any;
  message?: string;
}

interface IState {
  message: string;
  commentId: string;
  commentEditMode: boolean;
}

class CommentsContainer extends React.Component<IProps, IState> {
  public editCommentFn: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      message: props.message,
      commentId: null,
      commentEditMode: false
    };
  }

  public render() {
    const { deleteCommentGetId, openedComment, cardId } = this.props;
    const { message, commentId, commentEditMode } = this.state;
    return (
      <EditCommentMutation
        mutation={EDIT_COMMENT}
        variables={{
          cardId: parseInt(cardId, 10),
          commentId: parseInt(commentId, 10),
          message
        }}
        onCompleted={this.onCompletedEditComment}
      >
        {editCommentFn => {
          this.editCommentFn = editCommentFn;
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
                  commentEditMode={commentEditMode}
                  deleteCommentGetId={deleteCommentGetId}
                  editCommentGetId={this.editCommentGetId}
                  editCommentMessage={this.editCommentMessage}
                  editCommentOnKeyUp={this.editCommentOnKeyUp}
                  message={message}
                  commentId={commentId}
                />
              )}
            </GetCommentsQuery>
          );
        }}
      </EditCommentMutation>
    );
  }
  public editCommentMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event;
    this.setState({
      message: value
    } as any);
  };
  public editCommentGetId = commentId => {
    const { commentEditMode } = this.state;
    this.setState({
      commentEditMode: !commentEditMode,
      commentId
    } as any);
  };
  public editCommentOnKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { keyCode } = event;
    if (keyCode === 13) {
      this.editCommentFn();
    } else {
      return;
    }
  };
  public onCompletedEditComment = data => {
    const { commentEditMode } = this.state;
    if (data.editComment.ok) {
      toast.success("Comment edited");
    } else {
      toast.error("error");
    }
    this.setState({
      commentEditMode: !commentEditMode,
      commentId: null,
      message: ""
    });
  };
}

export default CommentsContainer;
