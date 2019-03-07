import React from "react";
import styled from "src/Styles/typed-components";
import UserHeader from "./UserHeader";
import Bold from "./Bold";
import { Link } from "react-router-dom";
import FlagHeader from "./FlagHeader";
import Loader from "src/Components/Loader";
import { RedDot } from "../Icons";

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

const MContainer = styled(Container)`
  justify-content: space-between;
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
  id: string;
  key: string;
  notification: any;
  actor: any;
  loading: boolean;
  onMarkRead: any;
  isRead: boolean;
}
const MoveNotificationRow: React.SFC<IProps> = ({
  notification,
  actor,
  loading,
  onMarkRead,
  isRead
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && notification.verb) {
    return (
      <>
        {(() => {
          switch (notification.verb) {
            case "MOVE":
              return (
                <>
                  <Link to={`/${notification.actor.username}`}>
                    <MContainer onClick={() => onMarkRead(notification.id)}>
                      {isRead ? <RedDot /> : null}
                      <UserHeader
                        username={notification.actor.username}
                        currentCity={actor.currentCity.cityname}
                        currentCountry={actor.currentCity.country.countryname}
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
            default:
              return null;
          }
        })()}
      </>
    );
  } else {
    return null;
  }
};

export default MoveNotificationRow;
