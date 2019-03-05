import React from "react";
import styled from "src/Styles/typed-components";
import FollowBtn from "./FollowBtn";
import Avatar from "./Avatar";
import Bold from "./Bold";
import { Link } from "react-router-dom";

const BlobWrapper = styled.div`
  max-width: 170px;
  height: 170px;
  width: 170px;
  margin: 10px;
`;

const Blob = styled.div<ITheme>`
  display: flex;
  overflow: auto;
  flex: 1;
  z-index: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: white;
  background-size: cover;
  border: 1px;
  border-radius: ${props => props.borderRadius};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.05);
`;

interface ITheme {
  borderRadius?: string;
  bgColor?: string;
  font?: string;
  fontColor?: string;
  fontSize?: string;
}

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
  isFollowing: boolean;
}

const UserCard: React.SFC<IProps> = ({ id, avatar, username, isFollowing }) => {
  return (
    <BlobWrapper>
      <Blob borderRadius={"46% 54% 69% 31% / 30% 49% 51% 70%"}>
        <SAvatar url={avatar} size="md" />
        <Link to={`/${username}`}>
          <SBold text={username} />
        </Link>
        <FollowBtn isFollowing={isFollowing} userId={id} username={username} />
      </Blob>
    </BlobWrapper>
  );
};
export default UserCard;
