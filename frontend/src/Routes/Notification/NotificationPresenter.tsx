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
}

const NotificationPresenter: React.SFC<IProps> = ({
  getNotifications: {
    getNotifications: { notifications: getNotifications = null } = {}
  } = {},
  getMoveNotifications: {
    getMoveNotifications: { notifications: getMoveNotifications = null } = {}
  } = {},
  loading,
  className,
  modalOpen,
  toggleModal
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && getNotifications && getMoveNotifications) {
    console.log(getNotifications, getMoveNotifications);
    return (
      <>
        {modalOpen && <Route path="/p/:id" component={CardDetail} />}
        <SWrapper>
          {getNotifications &&
            getNotifications.map(notification => {
              return (
                <NotificationRow
                  className={className}
                  id={notification.id}
                  key={notification.id}
                  notification={notification}
                  actor={notification.actor.profile}
                  toggleModal={toggleModal}
                />
              );
            })}
        </SWrapper>
        <SWrapper>
          {getMoveNotifications &&
            getMoveNotifications.map(notification => {
              return (
                <NotificationRow
                  className={className}
                  id={notification.id}
                  key={notification.id}
                  notification={notification}
                  actor={notification.actor.profile}
                  toggleModal={toggleModal}
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
