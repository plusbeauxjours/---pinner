import React from "react";
import styled from "src/Styles/typed-components";
import Button from "../Button";

const SButton = styled(Button)`
  z-index: 1;
  width: 100%;
`;

interface IProps {
  isFollowing: boolean;
  toggleBtn: () => void;
}

const FollowBtnPresenter: React.SFC<IProps> = ({ isFollowing, toggleBtn }) => (
  <>
    <SButton
      active={isFollowing}
      size={"xs"}
      text={isFollowing ? "Unfollow" : "Follow"}
      onClick={toggleBtn}
    />
  </>
);

export default FollowBtnPresenter;
