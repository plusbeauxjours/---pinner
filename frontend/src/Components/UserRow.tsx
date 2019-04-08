import React from "react";
import styled from "src/Styles/typed-components";
import FollowBtn from "./FollowBtn";
import UserHeader from "./UserHeader";
import { Link } from "react-router-dom";

const Container = styled.div`
  background-color: #2d3a41;
  width: 100%;
  border-radius: 3px;
  border: ${props => props.theme.boxBorder};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  padding: 10px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #e6e6e6;
  }
`;

// const Header = styled.header`
//   padding: 12px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: row;
// `;

interface IProps {
  id: string;
  avatar: string;
  username: string;
  currentCity: string;
  currentCountry: string;
  isFollowing?: boolean;
  isSelf?: boolean;
  size: string;
}

const UserRow: React.SFC<IProps> = ({
  id,
  avatar,
  username,
  currentCity,
  currentCountry,
  isSelf,
  isFollowing
}) => {
  return (
    <Link to={`/${username}`}>
      <Container>
        <UserHeader
          username={username}
          currentCity={currentCity}
          currentCountry={currentCountry}
          avatar={avatar}
          size={"sm"}
        />
        {!isSelf && (
          <FollowBtn
            isFollowing={isFollowing}
            userId={id}
            username={username}
          />
        )}
      </Container>
    </Link>
  );
};
export default UserRow;
