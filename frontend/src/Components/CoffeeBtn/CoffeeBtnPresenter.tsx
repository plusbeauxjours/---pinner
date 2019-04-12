import React from "react";
import styled from "src/Styles/typed-components";
import Button from "../Button";

const SButton = styled(Button)`
  z-index: 1;
  width: 50%;
`;

interface IProps {
  isFollowing?: boolean;
  matchFn?: any;
  unMatchFn?: any;
}

const CoffeeBtnPresenter: React.SFC<IProps> = ({
  isFollowing,
  matchFn,
  unMatchFn
}) => (
  <>
    <SButton
      active={isFollowing}
      size={"xs"}
      text={isFollowing ? "Unfollow" : "Follow"}
      onClick={matchFn}
    />
  </>
);

export default CoffeeBtnPresenter;
