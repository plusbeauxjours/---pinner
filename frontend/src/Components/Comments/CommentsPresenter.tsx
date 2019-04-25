import React from "react";
import styled from "src/Styles/typed-components";
import Bold from "../Bold";
import { Delete, Edit } from "../../Icons";
import Loader from "../Loader";
import Input from "../../Components/Input";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 7px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Front = styled.span``;

const Back = styled.span`
  display: flex;
  align-items: center;
`;

const TimeStamp = styled.span`
  margin-left: 10px;
  text-transform: uppercase;
  font-size: 10px;
  line-height: 18px;
  margin-top: 10px;
  display: block;
  color: ${props => props.theme.greyColor};
  display: inline;
`;

const Icon = styled.span`
  margin-left: 15px;
  cursor: pointer;
  svg {
    fill: white;
  }
`;

const ExtendedInput = styled(Input)`
  width: 287px;
  height: 48px;
`;

const SBold = styled(Bold)`
  margin-right: 5px;
`;

const Comments = styled.div`
  word-break: break-all;
  margin-top: 10px;
`;

interface IProps {
  commentsData: any;
  commentsLoading: boolean;
  openedComment: boolean;
  commentEditMode: boolean;
  deleteCommentGetId?: any;
  editCommentGetId: (commentId: string) => void;
  editCommentMessage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  editCommentOnKeyUp: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  message: string;
  commentId: string;
}

const CommentsPresenter: React.SFC<IProps> = ({
  commentsData: { getComments: { comments = null } = {} } = {},
  commentsLoading,
  openedComment,
  commentEditMode,
  deleteCommentGetId,
  editCommentGetId,
  editCommentMessage,
  editCommentOnKeyUp,
  message,
  commentId
}) => {
  if (commentsLoading) {
    return <Loader />;
  } else if (!commentsLoading && comments && openedComment) {
    return (
      <>
        {comments &&
          comments.map(comment => (
            <Comments key={comment.id}>
              <Container>
                <Front>
                  <SBold text={comment.creator.username} />
                  {commentEditMode && commentId === comment.id ? (
                    <ExtendedInput
                      onChange={editCommentMessage}
                      type={"text"}
                      value={message}
                      placeholder={comment.message}
                      name={"userName"}
                      onKeyUp={editCommentOnKeyUp}
                    />
                  ) : (
                    <>
                      {comment.message}
                      {comment.edited && <TimeStamp>Edited</TimeStamp>}
                    </>
                  )}
                </Front>
                <Back>
                  {comment.creator.profile.isSelf && (
                    <>
                      <Icon onClick={() => editCommentGetId(comment.id)}>
                        <Edit />
                      </Icon>
                      <Icon onClick={() => deleteCommentGetId(comment.id)}>
                        <Delete />
                      </Icon>
                    </>
                  )}
                </Back>
              </Container>
            </Comments>
          ))}
      </>
    );
  } else {
    return null;
  }
};

export default CommentsPresenter;
