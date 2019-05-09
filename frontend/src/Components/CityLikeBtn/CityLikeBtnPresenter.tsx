import React from "react";
import styled from "src/Styles/typed-components";
import Bold from "../Bold";

import { HeartFilled, HeartEmpty, Bubble } from "../../Icons";

const Button = styled.span<IProps>`
  cursor: pointer;
  &:first-child {
    margin-right: 20px;
  }
  transition: all 0.3s ease-in-out;
  svg {
    transition: all 0.3s ease-in-out;
    fill: ${props => (props.isLiked ? "#EC4956" : props.theme.greyColor)};
  }
`;

interface IProps {
  likeCount?: number;
  isLiked: boolean;
  onLikeClick?: () => void;
}

const CityLikeBtnPresenter: React.SFC<IProps> = ({
  likeCount,
  isLiked,
  onLikeClick
}) => (
  <>
    <Button isLiked={isLiked} onClick={onLikeClick}>
      {isLiked ? <HeartFilled /> : <HeartEmpty />}
    </Button>
    <Bubble />
    <Bold text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
  </>
);

export default CityLikeBtnPresenter;
