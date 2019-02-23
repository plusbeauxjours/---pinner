import React from "react";
import styled from "src/Styles/typed-components";
import { Link } from "react-router-dom";
import Bold from "./Bold";
import Avatar from "./Avatar";

const Container = styled.div`
  background-color: white;
  border-radius: 3px;
  border: ${props => props.theme.boxBorder};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const Header = styled.header`
  padding: 12px;
  margin: 0 15px 0 15px;
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 3px;
  border: ${props => props.theme.boxBorder};
`;

const HeaderColumn = styled.div`
  margin-left: 15px;
`;

const Location = styled.span`
  margin-top: 5px;
  display: block;
  font-size: 12px;
`;

const TimeStamp = styled.span`
  text-transform: uppercase;
  font-size: 10px;
  line-height: 18px;
  margin-top: 10px;
  display: block;
  color: ${props => props.theme.greyColor};
`;

const SAvatar = styled(Avatar)``;

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
}
const NotificationRow: React.SFC<IProps> = ({
  notification,
  actor,
  target,
  payload
}) => (
  <>
    <Container>
      <Header>
        <Link to={`/${actor.username}`}>
          <SAvatar size="sm" url={actor.profile.avatar} />
        </Link>
        <HeaderColumn>
          <Link to={`/${actor.username}`}>
            <SBold text={actor.username} />
          </Link>
          <Location>
            <SBold text={actor.profile.lastCountry} />
          </Location>
        </HeaderColumn>
      </Header>
      {(() => {
        switch (notification.verb) {
          case "FOLLOW":
            return <SBold text={"started to follow me"} />;
          case "COMMENT":
            return (
              <>
                <SBold text={"commented on card"} />
                <Header>
                  <Location>
                    <SBold text={notification.comment} />
                  </Location>
                </Header>
                <TimeStamp>{notification.createdAt}</TimeStamp>
              </>
            );
          case "LIKE":
            return (
              <>
                <SBold text={"liked card"} />
                <Header>
                  <Location>
                    <SBold text={payload.caption} />
                  </Location>
                </Header>
                <TimeStamp>{notification.createdAt}</TimeStamp>
              </>
            );
          case "MOVE":
            return (
              <>
                <SBold text={"moved to"} />
                <Header>
                  <Link to={`/${target.username}`}>
                    <SAvatar size="sm" url={target.profile.avatar} />
                  </Link>
                  <HeaderColumn>
                    <Link to={`/${target.username}`}>
                      <SBold text={target.username} />
                    </Link>
                    <Location>
                      <SBold text={target.profile.lastCountry} />
                    </Location>
                  </HeaderColumn>
                </Header>
                <TimeStamp>{notification.createdAt}</TimeStamp>
              </>
            );
          case "UPLOAD":
            return (
              <>
                <SBold text={"uploaded card"} />
                <Header>
                  <Link to={`/${target.username}`}>
                    <SAvatar size="sm" url={target.profile.avatar} />
                  </Link>
                  <HeaderColumn>
                    <Link to={`/p/:${payload.id}`}>
                      <SBold text={payload} />
                    </Link>
                    <Location>
                      <SBold text={payload.country.countryname} />
                    </Location>
                  </HeaderColumn>
                </Header>
                <TimeStamp>{notification.createdAt}</TimeStamp>
              </>
            );
          default:
            return <p>hi</p>;
        }
      })()}
    </Container>
  </>
);

export default NotificationRow;
