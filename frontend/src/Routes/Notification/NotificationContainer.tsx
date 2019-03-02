import React from "react";
import { Query } from "react-apollo";
import {
  GetNotifictions,
  GetNotifictionsVariables,
  GetMoveNotifications,
  GetMoveNotificationsVariables
} from "../../types/api";

import NotificationPresenter from "./NotificationPresenter";
import { GET_NOTIFICATION, GET_MOVE_NOTIFICATION } from "./NotificationQueries";

class GetNotifictionQuery extends Query<
  GetNotifictions,
  GetNotifictionsVariables
> {}
class GetMoveNotifictionQuery extends Query<
  GetMoveNotifications,
  GetMoveNotificationsVariables
> {}

interface IState {
  page: number;
  modalOpen: boolean;
}

class NotificationContainer extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      modalOpen: false
    };
  }
  public render() {
    const { page, modalOpen } = this.state;
    console.log("hi");
    return (
      <GetMoveNotifictionQuery
        query={GET_MOVE_NOTIFICATION}
        variables={{ page }}
      >
        {({ data: getMoveNotifications }) => (
          <GetNotifictionQuery query={GET_NOTIFICATION} variables={{ page }}>
            {({ data: getNotifications, loading }) => (
              <NotificationPresenter
                getNotifications={getNotifications}
                getMoveNotifications={getMoveNotifications}
                loading={loading}
                modalOpen={modalOpen}
                toggleModal={this.toggleModal}
              />
            )}
          </GetNotifictionQuery>
        )}
      </GetMoveNotifictionQuery>
    );
  }
  public toggleModal = () => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen
    } as any);
  };
}

export default NotificationContainer;
