import React from "react";
import CardDetail from "../../Routes/CardDetail";
import NotificationRow from "../../Components/NotificationRow";
import styled from "src/Styles/typed-components";
import Wrapper from "src/Components/Wrapper";
import Loader from "src/Components/Loader";
import { Route } from "react-router";

const SWrapper = styled(Wrapper)`
  max-width: 650px;
`;

interface IProps {
  getNotifications?: any;
  getNotificationsLoading: boolean;
  getMoveNotifications?: any;
  getMoveNotificationsLoading: boolean;
  getMatchNotificationsData?: any;
  getMatchNotificationsLoading: boolean;
  getCoffeeNotificationsData: any;
  getCoffeeNotificationsLoading: boolean;
  className?: string;
  modalOpen: boolean;
  toggleModal: () => void;
  onMarkRead: any;
}

const NotificationPresenter: React.SFC<IProps> = ({
  getNotifications: {
    getNotifications: { notifications: getNotifications = null } = {}
  } = {},
  getNotificationsLoading,
  getMoveNotifications: {
    getMoveNotifications: { notifications: getMoveNotifications = null } = {}
  } = {},
  getMoveNotificationsLoading,
  getMatchNotificationsData: {
    getMatchNotifications: {
      matchNotifications: getMatchNotifications = null
    } = {}
  } = {},
  getMatchNotificationsLoading,
  getCoffeeNotificationsData: {
    getCoffeeNotifications: {
      coffeeNotifications: getCoffeeNotifications = null
    } = {}
  } = {},
  getCoffeeNotificationsLoading,
  modalOpen,
  onMarkRead
}) => {
  if (
    getNotificationsLoading ||
    getMoveNotificationsLoading ||
    getMatchNotificationsLoading ||
    getCoffeeNotificationsLoading
  ) {
    return <Loader />;
  } else if (getNotifications && getMoveNotifications) {
    return (
      <>
        {modalOpen && <Route path="/p/:id" component={CardDetail} />}
        <SWrapper>
          {getNotifications &&
            getNotifications.map(notification => {
              return (
                <NotificationRow
                  id={notification.id}
                  key={notification.id}
                  notification={notification}
                  actor={notification.actor.profile}
                  onMarkRead={onMarkRead}
                  isRead={notification.read}
                />
              );
            })}
        </SWrapper>
        <SWrapper>
          {getMoveNotifications &&
            getMoveNotifications.map(notification => {
              return (
                <NotificationRow
                  id={notification.id}
                  key={notification.id}
                  notification={notification}
                  actor={notification.actor.profile}
                  onMarkRead={onMarkRead}
                  isRead={notification.read}
                />
              );
            })}
        </SWrapper>
        <SWrapper>
          {getMatchNotifications &&
            getMatchNotifications.map(notification => {
              return (
                <NotificationRow
                  id={notification.id}
                  key={notification.id}
                  notification={notification}
                  actor={notification.host.profile}
                  city={notification.city}
                  onMarkRead={onMarkRead}
                  isRead={notification.read}
                />
              );
            })}
        </SWrapper>
        <SWrapper>
          {getCoffeeNotifications &&
            getCoffeeNotifications.map(notification => {
              return (
                <NotificationRow
                  id={notification.id}
                  key={notification.id}
                  notification={notification}
                  actor={notification.host.profile}
                  city={notification.city}
                  target={notification.target}
                  onMarkRead={onMarkRead}
                  isRead={notification.read}
                />
              );
            })}
        </SWrapper>
      </>
    );
  } else {
    return null;
  }
};

export default NotificationPresenter;
