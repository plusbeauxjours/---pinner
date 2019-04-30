import React from "react";
import styled from "src/Styles/typed-components";
import { SmallHeartEmpty, SmallHeartFilled, Edit, Delete } from "../Icons";

const Buttons = styled.div`
  margin-bottom: 10px;
`;

const Button = styled.span`
  cursor: pointer;
  &:first-child {
    margin-right: 20px;
  }
  transition: all 0.3s ease-in-out;
  svg {
    transition: all 0.3s ease-in-out;
    fill: white;
  }
`;

interface IProps {
  toggleLikeComment: (commentId: string, isLiked: boolean) => void;
  editCommentGetId: (commentId: string) => void;
  deleteCommentGetId: (commentId: string) => void;
  isLiked: boolean;
  commentId: string;
}

const CommentButtons: React.SFC<IProps> = ({
  toggleLikeComment,
  editCommentGetId,
  deleteCommentGetId,
  isLiked,
  commentId
}) => {
  return (
    <Buttons>
      <Button onClick={() => toggleLikeComment(commentId, isLiked)}>
        {isLiked ? <SmallHeartFilled /> : <SmallHeartEmpty />}
      </Button>
      <Button onClick={() => editCommentGetId(commentId)}>
        <Edit />
      </Button>
      <Button onClick={() => deleteCommentGetId(commentId)}>
        <Delete />
      </Button>
    </Buttons>
  );
};

export default CommentButtons;
