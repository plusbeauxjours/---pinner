import React from "react";
import styled from "src/Styles/typed-components";
import UserHeader from "./UserHeader";
import Bold from "./Bold";
import { Link } from "react-router-dom";
import FlagHeader from "./FlagHeader";

const Container = styled.div`
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

const FContainer = styled(Container)`
  justify-content: flex-start;
`;

const MContainer = styled(Container)`
  justify-content: space-between;
`;

const CLUContainer = styled(Container)`
  justify-content: flex-start;
`;

const Header = styled.header`
  padding: 12px;
  margin: 0 15px 0 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 3px;
`;

const MHeader = styled(Header)`
  max-width: 300px;
  flex-direction: row;
  justify-content: space-between;
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
  display: block;
  color: ${props => props.theme.greyColor};
`;

const SBold = styled(Bold)`
  display: flex;
  align-items: center;
`;

interface IProps {
  className?: any;
  id: string;
  key: string;
  notification: any;
  actor: any;
  toggleModal: () => void;
}
const NotificationRow: React.SFC<IProps> = ({ notification, actor }) => (
  <>
    {(() => {
      switch (notification.verb) {
        case "FOLLOW":
          return (
            <>
              <Link to={`/${notification.actor.username}`}>
                <FContainer>
                  <UserHeader
                    username={notification.actor.username}
                    currentCity={actor.currentCity.cityname}
                    avatar={actor.avatar}
                    size={"sm"}
                  />
                  <Header>
                    <SBold text={"Follow me"} />
                    <TimeStamp>{notification.createdAt}</TimeStamp>
                  </Header>
                </FContainer>
              </Link>
            </>
          );
        case "COMMENT":
          return (
            <>
              <Link
                key={notification!.payload!.id}
                to={{
                  pathname: `/p/${notification.payload.id}`,
                  state: { modalOpen: true }
                }}
              >
                <Container>
                  <UserHeader
                    username={notification.actor.username}
                    currentCity={actor.currentCity.cityname}
                    avatar={actor.avatar}
                    size={"sm"}
                  />
                  <Header>
                    <SBold text={"Commented on card"} />
                    <TimeStamp>{notification.createdAt}</TimeStamp>
                  </Header>
                  <Header>
                    <Location>
                      <SBold text={notification.comment.message} />
                    </Location>
                  </Header>
                </Container>
              </Link>
            </>
          );
        case "LIKE":
          return (
            <>
              <Link
                key={notification!.payload!.id}
                to={{
                  pathname: `/p/${notification.payload.id}`,
                  state: { modalOpen: true }
                }}
              >
                <CLUContainer>
                  <UserHeader
                    username={notification.actor.username}
                    currentCity={actor.currentCity.cityname}
                    avatar={actor.avatar}
                    size={"sm"}
                  />
                  <Header>
                    <SBold text={"Liked card"} />
                    <TimeStamp>{notification.createdAt}</TimeStamp>
                  </Header>
                </CLUContainer>
              </Link>
            </>
          );
        case "MOVE":
          return (
            <>
              <Link to={`/${notification.actor.username}`}>
                <MContainer>
                  <UserHeader
                    username={notification.actor.username}
                    currentCity={actor.currentCity.cityname}
                    avatar={actor.avatar}
                    size={"sm"}
                  />
                  <Header>
                    <SBold text={"Moved"} />
                    <TimeStamp>{notification.createdAt}</TimeStamp>
                  </Header>
                  <MHeader>
                    <FlagHeader
                      cityname={notification.fromCity.cityname}
                      countrycode={notification.fromCountry.countrycode}
                    />
                    <SBold text={"To"} />
                    <FlagHeader
                      cityname={notification.toCity.cityname}
                      countrycode={notification.toCountry.countrycode}
                    />
                  </MHeader>
                </MContainer>
              </Link>
            </>
          );
        case "UPLOAD":
          return (
            <>
              <CLUContainer>
                <Header>
                  <SBold text={"USploaded card"} />
                  <TimeStamp>{notification.createdAt}</TimeStamp>
                </Header>
              </CLUContainer>
            </>
          );
        default:
          return <p>hi</p>;
      }
    })()}
  </>
);

export default NotificationRow;
