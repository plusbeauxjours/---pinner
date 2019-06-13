import React from "react";
import styled from "src/Styles/typed-components";
import Bold from "../Bold";
import { SmallHeartEmpty, SmallHeartFilled } from "../../Icons";

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
`;

const Button = styled.span<ITheme>`
  cursor: pointer;
  &:first-child {
    margin-left: 10px;
  }
  transition: all 0.3s ease-in-out;
  svg {
    transition: all 0.3s ease-in-out;
    fill: ${props => (props.isLiked ? "#EC4956" : props.theme.greyColor)};
  }
`;

const Text = styled(Bold)`
  font-weight: 300;
  display: flex;
  align-items: center;
`;

interface ITheme {
  isLiked: boolean;
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
            <ButtonContainer>
              <Text text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
              <Button isLiked={isLiked} onClick={onLikeClick}>
                {isLiked ? <SmallHeartFilled /> : <SmallHeartEmpty />}
              </Button>
            </ButtonContainer>
          );
        case "profile":
          return (
            <>
              <Button isLiked={isLiked} onClick={onLikeClick}>
                {isLiked ? <SmallHeartFilled /> : <SmallHeartEmpty />}
              </Button>
              <Text text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
            </>
          );
        default:
          return null;
      }
    })()}
  </>
);

export default CityLikeBtnPresenter;
