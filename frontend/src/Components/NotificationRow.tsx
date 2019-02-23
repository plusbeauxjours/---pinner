import React from "react";
import styled from "src/Styles/typed-components";
import UserHeader from "./UserHeader";
import Bold from "./Bold";
import { Link } from "react-router-dom";

const Container = styled.div`
  background-color: white;
  border-radius: 3px;
  border: ${props => props.theme.boxBorder};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #e6e6e6;
  }
`;

const Header = styled.header`
  padding: 12px;
  margin: 0 15px 0 15px;
  display: flex;
  align-items: center;
  border-radius: 3px;
`;

const Location = styled.span`
  margin-top: 5px;
  display: block;
  font-size: 12px;
  font-weight: 200;
`;

const TimeStamp = styled.span`
  text-transform: uppercase;
  font-size: 10px;
  line-height: 18px;
  margin-top: 10px;
  display: block;
  color: ${props => props.theme.greyColor};
`;

const SBold = styled(Bold)`
  display: flex;
`;

interface IProps {
  className?: any;
  id: string;
  key: string;
  notification: any;
  actor: any;
  target: any;
  payload?: any;
  toggleModal: () => void;
  getCardId: (cardId: string) => void;
}
const NotificationRow: React.SFC<IProps> = ({
  notification,
  actor,
  payload,
  getCardId
}) => (
  <>
    {(() => {
      switch (notification.verb) {
        case "FOLLOW":
          return (
            <>
              <Link to={`/${actor.username}`}>
                <Container>
                  <UserHeader
                    username={actor.username}
                    lastCountry={actor.profile.lastCountry}
                    avatar={actor.profile.avatar}
                    size={"sm"}
                  />
                  <SBold text={"started to follow me"} />
                  <TimeStamp>{notification.createdAt}</TimeStamp>
                </Container>
              </Link>
            </>
          );
        case "COMMENT":
          return (
            <>
              <Container onClick={() => getCardId(payload.id)}>
                <UserHeader
                  username={actor.username}
                  lastCountry={actor.profile.lastCountry}
                  avatar={actor.profile.avatar}
                  size={"sm"}
                />
                <SBold text={"commented on card"} />
                <Header>
                  <Location>
                    <SBold text={notification.comment} />
                  </Location>
                </Header>
                <TimeStamp>{notification.createdAt}</TimeStamp>
              </Container>
            </>
          );
        case "LIKE":
          return (
            <>
              <Container>
                <UserHeader
                  username={actor.username}
                  lastCountry={actor.profile.lastCountry}
                  avatar={actor.profile.avatar}
                  size={"sm"}
                />
                <SBold text={"liked card"} />
                <TimeStamp>{notification.createdAt}</TimeStamp>
              </Container>
            </>
          );
        case "MOVE":
          return (
            <>
              <SBold text={"moved to"} />

              <TimeStamp>{notification.createdAt}</TimeStamp>
            </>
          );
        case "UPLOAD":
          return (
            <>
              <SBold text={"uploaded card"} />

              <TimeStamp>{notification.createdAt}</TimeStamp>
            </>
          );
        default:
          return <p>hi</p>;
      }
    })()}
  </>
);

export default NotificationRow;
