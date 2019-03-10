import React from "react";
import styled from "../Styles/typed-components";
import UserCard from "./UserCard";

const Container = styled.div`
  border: 4px;
  display: flex;
  align-self: flex-start;
  flex-direction: row;
  position: absolute;
  -webkit-box-flex: 0;
  flex: 0 0 auto;
`;

interface IProps {
  users?: any;
  className?: string;
}

const UserGrid: React.SFC<IProps> = ({ users, className }) => {
  return (
    <Container className={className}>
      <p>recommand user</p>
      {users.map(user => (
        <UserCard
          key={user.id}
          id={user.id}
          avatar={user.profile.avatar}
          username={user.username}
          currentCity={user.profile.currentCity.cityName}
          currentCountry={user.profile.currentCity.country.countryName}
          isFollowing={user.profile.isFollowing}
        />
      ))}
    </Container>
  );
};

export default UserGrid;
