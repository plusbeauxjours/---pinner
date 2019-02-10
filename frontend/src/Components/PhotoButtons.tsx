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
  transition: all 0.5s ease-in-out;
  svg {
    transition: all 0.5s ease-in-out;
    fill: ${props => (props.isLiked ? "#EC4956" : props.theme.blackColor)};
  }
`;

interface IProps {
  isLiked: boolean;
  onClick: () => void;
}

const PhotoButtons: React.SFC<IProps> = ({ isLiked, onClick }) => (
  <Buttons>
    <Button isLiked={isLiked} onClick={onClick}>
      {isLiked ? <HeartFilled /> : <HeartEmpty />}
    </Button>
    <Button isLiked={isLiked} onClick={onClick}>
      <Bubble />
    </Button>
  </Buttons>
);

export default PhotoButtons;
