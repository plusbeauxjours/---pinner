import React from "react";
import styled from "src/Styles/typed-components";
import FollowBtn from "./FollowBtn";
import Avatar from "./Avatar";
import Bold from "./Bold";
import { Link } from "react-router-dom";

const Container = styled.div`
  background-color: white;
  border-radius: 3px;
  border: ${props => props.theme.boxBorder};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 15px;
`;

const SAvatar = styled(Avatar)`
  margin-bottom: 15px;
`;

const SBold = styled(Bold)`
  margin-bottom: 10px;
  display: block;
`;

interface IProps {
  id: string;
  avatar?: string;
  username: string;
  cityname: string;
  isFollowing: boolean;
}

const UserCard: React.SFC<IProps> = ({
  id,
  avatar,
  username,
  cityname,
  isFollowing
}) => {
  return (
    <Container>
      {avatar && (
        <Link to={`/${username}`}>
          <SAvatar url={avatar} size="md" />
        </Link>
      )}
      <Link to={`/${username}`}>
        <SBold text={username} />
      </Link>

      <FollowBtn
        isFollowing={isFollowing}
        userId={id}
        username={username}
        cityname={cityname}
      />
    </Container>
  );
};
export default UserCard;
