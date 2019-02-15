import React from "react";
import styled from "src/Styles/typed-components";
import Button from "../Button";
import { MutationFn } from "react-apollo";

const SButton = styled(Button)`
  width: 50%;
`;

interface IProps {
  isFollowing: boolean;
  toggleBtn: MutationFn;
}

const FollowBtnPresenter: React.SFC<IProps> = ({ isFollowing, toggleBtn }) => (
  <SButton
    active={isFollowing}
    size={"xs"}
    text={isFollowing ? "Unfollow" : "Follow"}
    onClick={toggleBtn}
  />
);

export default FollowBtnPresenter;
