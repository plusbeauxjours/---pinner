import React from "react";
import styled from "../Styles/typed-components";
import UserCard from "./UserCard";

const Container = styled.div<IProps>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 200px));
  grid-template-rows: 175px;
  grid-auto-rows: 175px;
  grid-gap: 25px;
  margin-bottom: 85px;
`;

interface IProps {
  users?: any;
  className?: string;
}

const UserGrid: React.SFC<IProps> = ({ users, className }) => (
  <Container className={className}>
    {users.map(user => (
      <UserCard
        key={user.id}
        id={user.id}
        avatar={user.profile.avatar}
        username={user.username}
        isFollowing={user.profile.isFollowing}
      />
    ))}
  </Container>
);

export default UserGrid;
