import React from "react";
import styled from "src/Styles/typed-components";
import Bold from "../Bold";
import { Delete, Edit } from "../../Icons";
import Loader from "../Loader";

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

const Icon = styled.span`
  margin-left: 15px;
  cursor: pointer;
  svg {
    fill: white;
  }
`;

const SBold = styled(Bold)`
  margin-right: 5px;
`;

const Comments = styled.div`
  word-break: break-all;
  margin-top: 10px;
`;

// ${Comments} {
//   height: 350px;
//   width: 250px;
//   word-break: break-all;
//   flex-wrap: nowrap;
//   overflow-x: visible;
//   overflow-y: auto;
//   margin-bottom: 30px;
// }

interface IProps {
  commentsData: any;
  commentsLoading: boolean;
  openedComment: boolean;
  getDeleteCommentId?: any;
}

const CommentsPresenter: React.SFC<IProps> = ({
  commentsData: { getComments: { comments = null } = {} } = {},
  commentsLoading,
  openedComment,
  getDeleteCommentId
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
                  {comment.message}
                </Front>
                <Back>
                  <Icon onClick={() => getDeleteCommentId(comment.id)}>
                    <Delete />
                  </Icon>
                  <Icon onClick={() => getDeleteCommentId(comment.id)}>
                    <Edit />
                  </Icon>
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
