import React from "react";
import styled from "src/Styles/typed-components";
import FollowBtn from "./FollowBtn";
import UserHeader from "./UserHeader";

const Container = styled.div`
  background-color: #2d3a41;
  width: 600px;
  border-radius: 3px;
  border: ${props => props.theme.boxBorder};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #e6e6e6;
  }
`;
const Header = styled.header`
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

interface IProps {
  id: string;
  avatar: string;
  username: string;
  currentCity: string;
  currentCountry: string;
  isFollowing: boolean;
  size: string;
}

const UserRow: React.SFC<IProps> = ({
  id,
  avatar,
  username,
  currentCity,
  currentCountry,
  isFollowing
}) => {
  return (
    <Container>
      <UserHeader
        username={username}
        currentCity={currentCity}
        currentCountry={currentCountry}
        avatar={avatar}
        size={"sm"}
      />
      {console.log(currentCity)}
      <Header>
        <FollowBtn isFollowing={isFollowing} userId={id} username={username} />
      </Header>
    </Container>
  );
};
export default UserRow;
