import React from "react";
import styled from "src/Styles/typed-components";
import Bold from "../Bold";
import { keyframes } from "styled-components";
import {
  SmallHeartEmpty,
  SmallHeartFilled,
  BigHeartEmpty,
  BigHeartFilled
} from "../../Icons";

const RowButtonContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

const BoxButtonContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
`;

const LikeAnimation = keyframes`
	  from{
	    opacity:0;
      height: 115%
      width: 115%
	  }
	  to{
	    opacity:1;
      height: 100%
      width: 100%
	  }
	`;

const Button = styled.span<ITheme>`
  cursor: pointer;
  &:first-child {
    margin-right: 10px;
  }
  transition: all 0.5s ease-in-out;
  width: ${props => props.type === "profile" && "45px"};
  svg {
    transition: all 0.5s ease-in-out;
    fill: ${props => (props.isLiked ? "#EC4956" : props.theme.greyColor)};
  }
`;

const BoxButton = styled.span<ITheme>`
  cursor: pointer;
  &:first-child {
    margin-right: 10px;
  }
  display: flex;
  justify-content: center;
  width: ${props => props.type === "profile" && "45px"};
  svg {
    animation: ${LikeAnimation} 0.4s linear;
    fill: ${props => (props.isLiked ? "#EC4956" : props.theme.greyColor)};
  }
`;

const Text = styled(Bold)<ITheme>`
  display: flex;
  align-items: center;
  color: ${props => (props.type === "row" ? "grey" : "white")};
  /* margin-left: 8px; */
`;

interface ITheme {
  isLiked?: boolean;
  type?: string;
}

interface IProps {
  likeCount: number;
  isLiked: boolean;
  onLikeClick: () => void;
  type: string;
}

const CityLikeBtnPresenter: React.SFC<IProps> = ({
  likeCount,
  isLiked,
  onLikeClick,
  type
}) => (
  <>
    {(() => {
      switch (type) {
        case "row":
          return (
            <RowButtonContainer>
              <Button isLiked={isLiked} onClick={onLikeClick}>
                {isLiked ? <SmallHeartFilled /> : <SmallHeartEmpty />}
              </Button>
              <Text
                text={likeCount === 1 ? "1 like" : `${likeCount} likes`}
                type={type}
              />
            </RowButtonContainer>
          );
        case "profile":
          return (
            <BoxButtonContainer>
              <BoxButton isLiked={isLiked} onClick={onLikeClick} type={type}>
                {isLiked ? <BigHeartFilled /> : <BigHeartEmpty />}
              </BoxButton>
              <Text
                text={likeCount === 1 ? "1 like" : `${likeCount} likes`}
                type={type}
              />
            </BoxButtonContainer>
          );
        default:
          return null;
      }
    })()}
  </>
);

export default CityLikeBtnPresenter;
