import React from "react";
// import Loader from "src/Components/Loader";
import NotificationRow from "../../Components/NotificationRow";
import styled from "src/Styles/typed-components";
import Wrapper from "src/Components/Wrapper";
import { GetNotifictions } from "../../types/api";
import Loader from "src/Components/Loader";

const SWrapper = styled(Wrapper)`
  max-width: 650px;
`;

interface IProps {
  data?: GetNotifictions;
  loading: boolean;
  className?: string;
}

const NotificationPresenter: React.SFC<IProps> = ({
  data: { getNotifications: { notifications = null } = {} } = {},
  loading,
  className
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && notifications) {
    console.log(notifications);
    return (
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
            />
          ))}
      </SWrapper>
    );
  } else {
    return null;
  }
};

export default NotificationPresenter;
