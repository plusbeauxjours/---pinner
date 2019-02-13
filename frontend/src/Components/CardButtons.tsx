import React from "react";
import styled from "src/Styles/typed-components";
import { HeartFilled, HeartEmpty, Bubble } from "../Icons";

const Buttons = styled.div`
  margin-bottom: 10px;
`;

const Button = styled.span<IProps>`
  cursor: pointer;
  &:first-child {
    margin-right: 20px;
  }
  transition: all 0.3s ease-in-out;
  svg {
    transition: all 0.3s ease-in-out;
    fill: ${props =>
      props.isLiked || props.openedComment
        ? "#EC4956"
        : props.theme.blackColor};
  }
`;

interface IProps {
  openedComment?: boolean;
  toggleCommentClick?: () => void;
  isLiked?: boolean;
  onClick?: () => void;
}

const CardButtons: React.SFC<IProps> = ({
  openedComment,
  toggleCommentClick,
  isLiked,
  onClick
}) => (
  <Buttons>
    <Button isLiked={isLiked} onClick={onClick}>
      {isLiked ? <HeartFilled /> : <HeartEmpty />}
    </Button>
    <Button openedComment={openedComment} onClick={toggleCommentClick}>
      <Bubble />
    </Button>
  </Buttons>
);

export default CardButtons;
