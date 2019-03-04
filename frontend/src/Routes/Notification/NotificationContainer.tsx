import React from "react";
import { Query, Mutation, MutationFn } from "react-apollo";
import {
  GetNotifictions,
  GetNotifictionsVariables,
  GetMoveNotifications,
  GetMoveNotificationsVariables
} from "../../types/api";

import NotificationPresenter from "./NotificationPresenter";
import {
  GET_NOTIFICATION,
  GET_MOVE_NOTIFICATION,
  MARK_AS_READ
} from "./NotificationQueries";
import { MarkAsRead, MarkAsReadVariables } from "../../types/api";

class GetNotifictionQuery extends Query<
  GetNotifictions,
  GetNotifictionsVariables
> {}
class GetMoveNotifictionQuery extends Query<
  GetMoveNotifications,
  GetMoveNotificationsVariables
> {}
class MarkAsReadMutation extends Mutation<MarkAsRead, MarkAsReadVariables> {}

interface IState {
  page: number;
  modalOpen: boolean;
  notificationId: string;
}

class NotificationContainer extends React.Component<any, IState> {
  public markAsReadFn: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      modalOpen: false,
      notificationId: ""
    };
  }
  public render() {
    const { page, modalOpen, notificationId } = this.state;
    return (
      <GetMoveNotifictionQuery
        query={GET_MOVE_NOTIFICATION}
        variables={{ page }}
      >
        {({ data: getMoveNotifications }) => (
          <GetNotifictionQuery query={GET_NOTIFICATION} variables={{ page }}>
            {({ data: getNotifications, loading }) => (
              <MarkAsReadMutation
                mutation={MARK_AS_READ}
                variables={{ notificationId: parseInt(notificationId, 10) }}
              >
                {markAsReadFn => {
                  this.markAsReadFn = markAsReadFn;
                  return (
                    <NotificationPresenter
                      getNotifications={getNotifications}
                      getMoveNotifications={getMoveNotifications}
                      loading={loading}
                      modalOpen={modalOpen}
                      toggleModal={this.toggleModal}
                      onMarkRead={this.onMarkRead}
                    />
                  );
                }}
              </MarkAsReadMutation>
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
  public onMarkRead = notificationId => {
    this.setState({
      notificationId
    });
    console.log(this.state);
    this.markAsReadFn({ variables: { notificationId } });
  };
}

export default NotificationContainer;
