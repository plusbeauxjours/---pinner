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
  data?: any;
  loading: boolean;
  className?: string;
  modalOpen: boolean;
  toggleModal: () => void;
  onMarkRead: any;
}

const NotificationPresenter: React.SFC<IProps> = ({
  data: { getNotifications: { notifications = null } = {} } = {},
  loading,
  modalOpen,
  onMarkRead
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && notifications) {
    return (
      <>
        {modalOpen && <Route path="/p/:id" component={CardDetail} />}
        <SWrapper>
          {notifications &&
            notifications.map(notification => {
              return (
                <NotificationRow
                  id={notification.id}
                  key={notification.id}
                  notification={notification}
                  actor={notification.actor.profile}
                  onMarkRead={onMarkRead}
                  isRead={notification.read}
                  city={notification.city}
                  target={notification.target}
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
