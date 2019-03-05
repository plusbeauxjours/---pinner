import React from "react";
import styled from "../Styles/typed-components";
import UserCard from "./UserCard";
import Wrapper from "./Wrapper";
import UserHeader from "./UserHeader";
import FollowBtn from "./FollowBtn";

const SWrapper = styled(Wrapper)`
  max-width: 650px;
`;

const Container = styled.div`
  border: 4px;
  display: flex;
  align-self: flex-start;
  flex-direction: row;
  position: absolute;
  -webkit-box-flex: 0;
  flex: 0 0 auto;
`;

const Header = styled.header`
  padding: 12px;
  margin: 0 15px 0 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 3px;
`;

const IContainer = styled.div`
  background-color: white;
  border-radius: 3px;
  border: ${props => props.theme.boxBorder};
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #e6e6e6;
  }
`;

interface IProps {
  inline: boolean;
  users?: any;
  className?: string;
}

const UserGrid: React.SFC<IProps> = ({ users, className, inline = true }) => {
  if (inline) {
    return (
      <SWrapper>
        <p>recommand user</p>
        <IContainer className={className}>
          {users.map(user => (
            <>
              <UserHeader
                username={user.username}
                currentCity={user.profile.currentCity.cityname}
                avatar={user.profile.avatar}
                size={"sm"}
              />
              <Header>
                <FollowBtn
                  isFollowing={user.profile.isFollowing}
                  userId={user.id}
                  username={user.username}
                />
              </Header>
            </>
          ))}
        </IContainer>
      </SWrapper>
    );
  } else {
    return (
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
  }
};

export default UserGrid;
