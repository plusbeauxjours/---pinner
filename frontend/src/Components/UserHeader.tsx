import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Bold from "./Bold";
import Avatar from "./Avatar";

const Header = styled.header`
  padding: 12px;
  margin: 0 15px 0 15px;
  display: flex;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
`;

const HeaderColumn = styled.div`
  margin-left: 15px;
`;

const Location = styled.span`
  margin-top: 5px;
  display: block;
  font-size: 12px;
  font-weight: 200;
`;

const SAvatar = styled(Avatar)``;

const SBold = styled(Bold)`
  display: flex;
`;

interface IProps {
  username: string;
  avatar: string;
  currentCity?: string;
  currentCountry?: string;
  size?: string;
}

const UserHeader: React.SFC<IProps> = ({
  username,
  avatar,
  currentCity,
  currentCountry,
  size
}) => (
  <Link to={`/${username}`}>
    <Header>
      <SAvatar size={size} url={avatar} />
      <HeaderColumn>
        <SBold text={username} />
        <Location>
          {currentCity}, {currentCountry}
        </Location>
      </HeaderColumn>
    </Header>
  </Link>
);

export default UserHeader;
