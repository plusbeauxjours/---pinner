import React from "react";
import styled from "src/Styles/typed-components";
import Button from "../Button";

const SButton = styled(Button)`
  width: 50%;
`;

interface IProps {
  isFollowing: boolean;
  toggleBtn: () => void;
}

const FollowBtnPresenter: React.SFC<IProps> = ({ isFollowing, toggleBtn }) => (
  <SButton
    active={isFollowing}
    size={null}
    text={isFollowing ? "Unfollow" : "Follow"}
    onClick={toggleBtn}
  />
);

export default FollowBtnPresenter;
