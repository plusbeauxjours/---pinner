import React from "react";
import styled from "../Styles/typed-components";
import UserCard from "./UserCard";
import UserRow from "./UserRow";

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
  inline: boolean;
  users?: any;
  className?: string;
}

const UserGrid: React.SFC<IProps> = ({ users, className, inline }) => {
  if (inline) {
    return (
      <>
        <p>recommand user</p>
        {users.map(user => (
          <UserRow
            key={user.id}
            id={user.id}
            username={user.username}
            avatar={user.profile.avatar}
            currentCity={user.profile.currentCity.cityname}
            currentCountry={user.profile.currentCity.country.countryname}
            isFollowing={user.profile.isFollowing}
            size={"sm"}
          />
        ))}
      </>
    );
  } else {
    return (
      <Container className={className}>
        <p>recommand user</p>
        {users.map(user => (
          <UserCard
            key={user.id}
            id={user.id}
            avatar={user.profile.avatar}
            username={user.username}
            currentCity={user.profile.currentCity.cityname}
            currentCountry={user.profile.currentCity.country.countryname}
            isFollowing={user.profile.isFollowing}
          />
        ))}
      </Container>
    );
  }
};

export default UserGrid;
