import React from "react";
import CardDetail from "../../Routes/CardDetail";
import NotificationRow from "../../Components/NotificationRow";
import styled from "src/Styles/typed-components";
import Wrapper from "src/Components/Wrapper";
import { GetNotifictions, GetMoveNotifications } from "../../types/api";
import Loader from "src/Components/Loader";
import { Route } from "react-router";

const SWrapper = styled(Wrapper)`
  max-width: 650px;
`;

interface IProps {
  getNotifications?: GetNotifictions;
  getMoveNotifications?: GetMoveNotifications;
  loading: boolean;
  className?: string;
  modalOpen: boolean;
  toggleModal: () => void;
  onMarkRead: any;
}

const NotificationPresenter: React.SFC<IProps> = ({
  getNotifications: {
    getNotifications: { notifications: getNotifications = null } = {}
  } = {},
  getMoveNotifications: {
    getMoveNotifications: { notifications: getMoveNotifications = null } = {}
  } = {},
  loading,
  modalOpen,
  onMarkRead
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && getNotifications && getMoveNotifications) {
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
                  loading={loading}
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
                  loading={loading}
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
