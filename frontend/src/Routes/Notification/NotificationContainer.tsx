import React from "react";
import { Query, Mutation, MutationFn } from "react-apollo";
import { GetNotifications, GetNotificationsVariables } from "../../types/api";

import NotificationPresenter from "./NotificationPresenter";
import { GET_NOTIFICATION, MARK_AS_READ } from "./NotificationQueries";
import { MarkAsRead, MarkAsReadVariables } from "../../types/api";

class GetNotificationsQuery extends Query<
  GetNotifications,
  GetNotificationsVariables
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
      <GetNotificationsQuery query={GET_NOTIFICATION} variables={{ page }}>
        {({ data, loading }) => (
          <MarkAsReadMutation
            mutation={MARK_AS_READ}
            variables={{
              notificationId: parseInt(notificationId, 10)
            }}
          >
            {markAsReadFn => {
              this.markAsReadFn = markAsReadFn;
              return (
                <NotificationPresenter
                  data={data}
                  loading={loading}
                  modalOpen={modalOpen}
                  toggleModal={this.toggleModal}
                  onMarkRead={this.onMarkRead}
                />
              );
            }}
          </MarkAsReadMutation>
        )}
      </GetNotificationsQuery>
    );
  }
  public toggleModal = () => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen
    } as any);
  };
  public onMarkRead = (notificationId: string, isRead: boolean) => {
    this.setState({
      notificationId,
      isRead
    } as any);
    console.log(isRead, this.state);
    this.markAsReadFn({ variables: { notificationId } });
  };
}

export default NotificationContainer;
