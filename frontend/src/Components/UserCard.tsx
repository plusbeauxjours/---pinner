import React from "react";
import styled from "src/Styles/typed-components";
import FollowBtn from "./FollowBtn";
import Avatar from "./Avatar";
import Bold from "./Bold";
import { Link } from "react-router-dom";

const BlobWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  max-width: 160px;
  height: 160px;
  width: 160px;
  margin: 0 auto;
`;

const Blob = styled.div<ITheme>`
  z-index: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-top: 20px;
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
    <BlobWrapper>
      <Blob borderRadius={"46% 54% 69% 31% / 30% 49% 51% 70%"}>
        <Link to={`/${username}`}>
          <SAvatar url={avatar} size="md" />
          <SBold text={username} />
        </Link>
        <FollowBtn
          isFollowing={isFollowing}
          userId={id}
          username={username}
          cityname={cityname}
        />
      </Blob>
    </BlobWrapper>
  );
};
export default UserCard;
