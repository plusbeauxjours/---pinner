import React, { useState } from "react";
import styled from "src/Styles/typed-components";
import { SmallHeartEmpty, SmallHeartFilled, Edit, Delete } from "../Icons";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_LIKE_COMMENT } from "./Comments/CommentsQueries";

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
  editCommentGetId: (commentId: string) => void;
  deleteCommentGetId: (commentId: string) => void;
  isLiked: boolean;
  cardId: string;
  commentId: string;
}

const CommentButtons: React.SFC<IProps> = ({
  editCommentGetId,
  deleteCommentGetId,
  isLiked,
  cardId,
  commentId
}) => {
  const [like, toggleState] = useState(isLiked);
  const toggleLikeComment = useMutation(TOGGLE_LIKE_COMMENT, {
    variables: {
      cardId: parseInt(cardId, 10),
      commentId: parseInt(commentId, 10)
    }
  });
  return (
    <Buttons>
      <Button
        onClick={() => {
          toggleState(!like);
          toggleLikeComment();
        }}
      >
        {like ? <SmallHeartFilled /> : <SmallHeartEmpty />}
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
