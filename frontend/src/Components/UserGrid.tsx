import React from "react";
import styled from "../Styles/typed-components";
import UserCard from "./UserCard";
import Wrapper from "./Wrapper";

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

const UserGrid: React.SFC<IProps> = ({ users, className }) => (
  <Wrapper>
    <p>recommand user</p>
    <p>see all</p>
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
  </Wrapper>
);

export default UserGrid;
