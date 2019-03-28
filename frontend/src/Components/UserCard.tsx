import React from "react";
import styled from "src/Styles/typed-components";
import Avatar from "./Avatar";
import Bold from "./Bold";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${props => props.theme.headerColor};
  min-width: 170px;
  padding: 10px;
  margin-right: 5px;
  margin-bottom: 25px;
`;

const SAvatar = styled(Avatar)`
  margin-bottom: 15px;
`;

const SBold = styled(Bold)`
  margin-bottom: 3px;
  display: block;
`;

const Location = styled.span`
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  font-size: 12px;
  font-weight: 200;
`;

interface IProps {
  id: string;
  avatar?: string;
  username: string;
  isFollowing: boolean;
  currentCity: string;
  currentCountry: string;
}

const UserCard: React.SFC<IProps> = ({
  avatar,
  username,
  currentCity,
  currentCountry
}) => {
  return (
    <>
      <Link to={`/${username}`}>
        <Container>
          <SAvatar url={avatar} size="md" />
          <SBold text={username} />
          <Location>
            {currentCity}, {currentCountry}
          </Location>
        </Container>
      </Link>
    </>
  );
};
export default UserCard;
