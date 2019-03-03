import React from "react";
import styled from "../Styles/typed-components";
import UserCard from "./UserCard";

const Container = styled.div`
  display: inline-flex;
  margin-bottom: 85px;
  overflow: hidden;
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
        cityname={user.profile.currentCity.cityname}
        isFollowing={user.profile.isFollowing}
      />
    ))}
  </Container>
);

export default UserGrid;
