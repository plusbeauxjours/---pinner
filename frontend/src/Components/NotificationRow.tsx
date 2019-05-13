import React from "react";
import styled from "src/Styles/typed-components";
import UserHeader from "./UserHeader";
import Bold from "./Bold";
import { Link } from "react-router-dom";
import { RedDot } from "../Icons";
import { MutationFn, Mutation } from "react-apollo";
import {
  MARK_AS_READ,
  GET_NOTIFICATION
} from "../Routes/Notification/NotificationQueries";
import { MarkAsRead, MarkAsReadVariables } from "../types/api";

class MarkAsReadMutation extends Mutation<MarkAsRead, MarkAsReadVariables> {}

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
  border-top: 1px solid grey;
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
}

interface IState {
  isRead: boolean;
}

class NotificationRow extends React.Component<IProps, IState> {
  public markAsReadFn: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      isRead: props.isRead
    };
  }
  public render() {
    const { notification, actor } = this.props;
    const { isRead } = this.state;
    return (
      <MarkAsReadMutation
        mutation={MARK_AS_READ}
        update={this.updateMarkAsRead}
      >
        {markAsReadFn => {
          this.markAsReadFn = markAsReadFn;
          {
            switch (notification.verb) {
              case "COMMENT":
                return (
                  <>
                    <Link
                      to={{
                        pathname: `/p/${notification.card.id}`,
                        state: { modalOpen: true }
                      }}
                      onClick={() => this.onMarkRead(notification.id)}
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
                        {/* <GreyText text={notification.comment.message} /> */}
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
                      onClick={() => this.onMarkRead(notification.id)}
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
                      onClick={() => this.onMarkRead(notification.id)}
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
                      onClick={() => this.onMarkRead(notification.id)}
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
                      onClick={() => this.onMarkRead(notification.id)}
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
                      onClick={() => this.onMarkRead(notification.id)}
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
          }
        }}
      </MarkAsReadMutation>
    );
  }
  public onMarkRead = (notificationId: string) => {
    this.markAsReadFn({ variables: { notificationId } });
    this.setState({
      isRead: false
    } as any);
  };
  public updateMarkAsRead = (cache, { data: { markAsRead } }) => {
    try {
      const data = cache.readQuery({
        query: GET_NOTIFICATION,
        variables: { page: 0 }
      });
      if (data) {
        const notification = data.getNotifications.notifications.find(
          i => parseInt(i.id, 10) === markAsRead.notificationId
        );
        console.log(notification);
        notification.read = true;
        cache.writeQuery({
          query: GET_NOTIFICATION,
          variables: { page: 0 },
          data
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export default NotificationRow;
