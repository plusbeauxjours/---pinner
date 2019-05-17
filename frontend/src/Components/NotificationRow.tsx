import React from "react";
import styled from "src/Styles/typed-components";
import UserHeader from "./UserHeader";
import Bold from "./Bold";
import { Link } from "react-router-dom";
import { RedDot } from "../Icons";

const UserRow = styled.div`
  display: grid;
  flex-direction: row;
  height: 50px;
  grid-template-columns: 3fr 3fr 1fr;
  padding: 0 5px 0 5px;
  grid-gap: 15px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: grey;
  }
  border-bottom: 1px solid grey;
`;

const GreyText = styled(Bold)`
  color: #999;
`;

const ICon = styled.div`
  position: absolute;
  margin-top: 1px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

interface IProps {
  notification: any;
  actor: any;
  isRead: boolean;
  onMarkRead: (notificationId: string) => void;
}

const NotificationRow: React.SFC<IProps> = ({
  notification,
  actor,
  onMarkRead,
  isRead
}) => {
  if (notification.verb) {
    return (
      <>
        {(() => {
          switch (notification.verb) {
            case "COMMENT":
              return (
                <>
                  <Link
                    to={{
                      pathname: `/p/${notification.card.id}`,
                      state: { modalOpen: true }
                    }}
                    onClick={() => onMarkRead(notification.id)}
                  >
                    <UserRow>
                      {!isRead ? (
                        <ICon>
                          <RedDot />
                        </ICon>
                      ) : null}
                      <UserHeader
                        username={notification.actor.username}
                        currentCity={actor.currentCity.cityName}
                        currentCountry={actor.currentCity.country.countryName}
                        avatar={actor.avatar}
                        size={"sm"}
                      />
                      <Column>
                        <GreyText text={"Commented on card"} />
                        <GreyText text={notification.naturalTime} />
                      </Column>
                    </UserRow>
                  </Link>
                </>
              );
            case "LIKE_COMMENT":
              return (
                <>
                  <Link
                    to={{
                      pathname: `/p/${notification.card.id}`,
                      state: { modalOpen: true }
                    }}
                    onClick={() => onMarkRead(notification.id)}
                  >
                    <UserRow>
                      {!isRead ? (
                        <ICon>
                          <RedDot />
                        </ICon>
                      ) : null}
                      <UserHeader
                        username={notification.actor.username}
                        currentCity={actor.currentCity.cityName}
                        currentCountry={actor.currentCity.country.countryName}
                        avatar={actor.avatar}
                        size={"sm"}
                      />
                      <Column>
                        <GreyText text={"Liked your comment"} />
                        <GreyText text={notification.naturalTime} />
                      </Column>
                      {/* <GreyText text={notification.comment.message} /> */}
                    </UserRow>
                  </Link>
                </>
              );
            case "LIKE":
              return (
                <>
                  <Link
                    to={{
                      pathname: `/p/${notification.card.id}`,
                      state: { modalOpen: true }
                    }}
                    onClick={() => onMarkRead(notification.id)}
                  >
                    <UserRow>
                      {!isRead ? (
                        <ICon>
                          <RedDot />
                        </ICon>
                      ) : null}
                      <UserHeader
                        username={notification.actor.username}
                        currentCity={actor.currentCity.cityName}
                        currentCountry={actor.currentCity.country.countryName}
                        avatar={actor.avatar}
                        size={"sm"}
                      />
                      <Column>
                        <GreyText text={"Liked card"} />
                        <GreyText text={notification.naturalTime} />
                      </Column>
                    </UserRow>
                  </Link>
                </>
              );
            case "FOLLOW":
              return (
                <>
                  <Link
                    to={`/${notification.actor.username}`}
                    onClick={() => onMarkRead(notification.id)}
                  >
                    <UserRow>
                      {!isRead ? (
                        <ICon>
                          <RedDot />
                        </ICon>
                      ) : null}
                      <UserHeader
                        username={notification.actor.username}
                        currentCity={actor.currentCity.cityName}
                        currentCountry={actor.currentCity.country.countryName}
                        avatar={actor.avatar}
                        size={"sm"}
                      />
                      <Column>
                        <GreyText text={"Follow me"} />
                        <GreyText text={notification.naturalTime} />
                      </Column>
                    </UserRow>
                  </Link>
                </>
              );
            case "UPLOAD":
              return (
                <>
                  <Link
                    to={{
                      pathname: `/p/${notification.card.id}`,
                      state: { modalOpen: true }
                    }}
                    onClick={() => onMarkRead(notification.id)}
                  >
                    <UserRow>
                      {!isRead ? (
                        <ICon>
                          <RedDot />
                        </ICon>
                      ) : null}
                      <UserHeader
                        username={notification.actor.username}
                        currentCity={actor.currentCity.cityName}
                        currentCountry={actor.currentCity.country.countryName}
                        avatar={actor.avatar}
                        size={"sm"}
                      />
                      <Column>
                        <GreyText text={"Uploaded card"} />
                        <GreyText text={notification.naturalTime} />
                      </Column>
                    </UserRow>
                  </Link>
                </>
              );
            case "MATCH":
              return (
                <>
                  <Link
                    to={{
                      pathname: `/match/`
                    }}
                    onClick={() => onMarkRead(notification.id)}
                  >
                    <UserRow>
                      {!isRead ? (
                        <ICon>
                          <RedDot />
                        </ICon>
                      ) : null}
                      <UserHeader
                        username={notification.actor.username}
                        currentCity={actor.currentCity.cityName}
                        currentCountry={actor.currentCity.country.countryName}
                        avatar={actor.avatar}
                        size={"sm"}
                      />
                      <Column>
                        <GreyText text={"You've got a Matched!"} />
                        <GreyText text={notification.naturalTime} />
                      </Column>
                    </UserRow>
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

export default NotificationRow;
