import React from "react";
import styled from "src/Styles/typed-components";
import FollowBtn from "./FollowBtn";
import Avatar from "./Avatar";
import Bold from "./Bold";

const Container = styled.div`
  background-color: white;
  border-radius: 3px;
  border: ${props => props.theme.boxBorder};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 15px;
  padding-bottom: 10px;
`;

const SAvatar = styled(Avatar)`
  margin-bottom: 15px;
`;

const SBold = styled(Bold)`
  margin-bottom: 10px;
`;

interface IProps {
  id: string;
  avatar: string;
  username: string;
  isFollowing: boolean;
}

const UserCard: React.SFC<IProps> = ({ id, avatar, username, isFollowing }) => (
  <Container>
    <SAvatar url={avatar} size="md" />
    <SBold text={username} />
    <FollowBtn isFollowing={isFollowing} userId={id} />
  </Container>
);

export default UserCard;
