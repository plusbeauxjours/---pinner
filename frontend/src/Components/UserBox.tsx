import React from "react";
import styled from "src/Styles/typed-components";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import Avatar from "./Avatar";
import Bold from "./Bold";
import { History } from "history";

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const SText = styled(Bold)`
  font-size: 18px;
  font-weight: 100;
`;

const SeeAll = styled.p`
  font-size: 12px;
  font-weight: 100;
  cursor: pointer;
`;

const Container = styled.div`
  -webkit-box-flex: 0;
  padding: 15px;
`;
const Box = styled.div`
  max-width: 905px;
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(3, 50px);
  grid-auto-columns: 400px;
  column-gap: 10px;
  overflow-x: auto;
  padding-bottom: 15px;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  ::-webkit-scrollbar {
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: ${props => props.theme.bgColor};
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    background-color: ${props => props.theme.greyColor};
  }
`;

const UserRow = styled.div`
  display: grid;
  height: 50px;
  width: 400px;
  grid-template-columns: 4fr 1fr;
  padding: 0 5px 0 5px;
  grid-gap: 15px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: grey;
  }
  border-bottom: 1px solid grey;
  &:last-child {
    margin-bottom: 15px;
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  position: relative;
`;

const HeaderColumn = styled.div`
  margin-left: 15px;
`;

const CText = styled(Bold)`
  display: flex;
`;

const Location = styled.span`
  display: flex;
  margin-top: 5px;
  position: block;
  font-size: 12px;
  font-weight: 200;
`;

const Explain = styled(Location)`
  color: grey;
`;

interface IProps extends RouteComponentProps<any> {
  history: History;
  users?: any;
  type?: string;
}

const UserBox: React.SFC<IProps> = ({ history, users, type }) => (
  <>
    {console.log(history.location.pathname)}
    {console.log(history)}
    {console.log(location)}

    {(() => {
      switch (type) {
        case "usersNow":
          return (
            <>
              <Title>
                <SText text={"USERS NOW"} />
                <Link to={`${history.location.pathname}/usersnow`}>
                  <SeeAll>SEE ALL</SeeAll>
                </Link>
              </Title>
              <Container>
                <Box>
                  {users &&
                    users.map(user => {
                      return (
                        <UserRow key={user.profile.id}>
                          <Link to={`/${user.profile.username}`}>
                            <AvatarContainer>
                              <Avatar size={"sm"} url={user.profile.avatar} />
                              <HeaderColumn>
                                <CText text={user.profile.username} />
                                <Explain>with same nationality</Explain>
                              </HeaderColumn>
                            </AvatarContainer>
                          </Link>
                        </UserRow>
                      );
                    })}
                </Box>
              </Container>
            </>
          );
        case "usersBefore":
          return (
            <>
              <Title>
                <SText text={"USERS BEFORE"} />
                <Link to={`${history.location.pathname}/usersbefore`}>
                  <SeeAll>SEE ALL</SeeAll>
                </Link>
              </Title>
              <Container>
                <Box>
                  {users &&
                    users.map(user => {
                      return (
                        <UserRow key={user.actor.profile.id}>
                          <Link to={`/${user.actor.profile.username}`}>
                            <AvatarContainer>
                              <Avatar
                                size={"sm"}
                                url={user.actor.profile.avatar}
                              />
                              <HeaderColumn>
                                <CText text={user.actor.profile.username} />
                                <Explain>with same nationality</Explain>
                              </HeaderColumn>
                            </AvatarContainer>
                          </Link>
                        </UserRow>
                      );
                    })}
                </Box>
              </Container>
            </>
          );
        default:
          return null;
      }
    })()}
  </>
);

export default withRouter(UserBox);
