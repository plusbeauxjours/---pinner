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
  width: 170px;
  height: 200px;
  padding: 10px;
  margin-right: 5px;
  margin-bottom: 25px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  target: string;
  expires: string;
}

const CoffeeCard: React.SFC<IProps> = ({
  id,
  avatar,
  username,
  target,
  expires
}) => {
  return (
    <>
      <Link to={`/c/${id}`}>
        <Container>
          <SAvatar url={avatar} size="md" />
          <Location>{id}</Location>
          <SBold text={username} />
          <Location>{target}</Location>
          <Location>{expires}</Location>
        </Container>
      </Link>
    </>
  );
};
export default CoffeeCard;
