import React from "react";
import CardDetail from "../../Routes/CardDetail";
import NotificationRow from "../../Components/NotificationRow";
import styled from "src/Styles/typed-components";
import Wrapper from "src/Components/Wrapper";
import { GetNotifictions } from "../../types/api";
import Loader from "src/Components/Loader";
import { Route } from "react-router";

const SWrapper = styled(Wrapper)`
  max-width: 650px;
`;

interface IProps {
  data?: GetNotifictions;
  loading: boolean;
  className?: string;
  modalOpen: boolean;
  toggleModal: () => void;
}

const NotificationPresenter: React.SFC<IProps> = ({
  data: { getNotifications: { notifications = null } = {} } = {},
  loading,
  className,
  modalOpen,
  toggleModal
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && notifications) {
    return (
      <>
        {modalOpen && <Route path="/p/:id" component={CardDetail} />}
        <SWrapper>
          {notifications &&
            notifications.map(notification => (
              <NotificationRow
                className={className}
                id={notification.id}
                key={notification.id}
                notification={notification}
                actor={notification.actor}
                target={notification.target}
                payload={notification.payload}
                toggleModal={toggleModal}
              />
            ))}
        </SWrapper>
      </>
    );
  } else {
    return null;
  }
};

export default NotificationPresenter;
