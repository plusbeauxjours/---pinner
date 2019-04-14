import React from "react";
import { Query, Mutation, MutationFn } from "react-apollo";
import {
  GetNotifictions,
  GetNotifictionsVariables,
  GetMoveNotifications,
  GetMoveNotificationsVariables,
  GetMatchNotifications
} from "../../types/api";

import NotificationPresenter from "./NotificationPresenter";
import {
  GET_NOTIFICATION,
  GET_MOVE_NOTIFICATION,
  MARK_AS_READ,
  GET_MATCH_NOTIFICATION
} from "./NotificationQueries";
import { MarkAsRead, MarkAsReadVariables } from "../../types/api";

class GetNotifictionsQuery extends Query<
  GetNotifictions,
  GetNotifictionsVariables
> {}
class GetMoveNotifictionsQuery extends Query<
  GetMoveNotifications,
  GetMoveNotificationsVariables
> {}
class GetMatchNotificationsQuery extends Query<GetMatchNotifications> {}
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
      <GetMatchNotificationsQuery query={GET_MATCH_NOTIFICATION}>
        {({
          data: getMatchNotificationsData,
          loading: getMatchNotificationsLoading
        }) => (
          <GetMoveNotifictionsQuery
            query={GET_MOVE_NOTIFICATION}
            variables={{ page }}
          >
            {({
              data: getMoveNotifications,
              loading: getMoveNotificationsLoading
            }) => (
              <GetNotifictionsQuery
                query={GET_NOTIFICATION}
                variables={{ page }}
              >
                {({
                  data: getNotifications,
                  loading: getNotificationsLoading
                }) => (
                  <MarkAsReadMutation
                    mutation={MARK_AS_READ}
                    variables={{ notificationId: parseInt(notificationId, 10) }}
                    // refetchQueries={[
                    //   { query: GET_NOTIFICATION, variables: { page } }
                    // ]}
                  >
                    {markAsReadFn => {
                      this.markAsReadFn = markAsReadFn;
                      console.log(
                        getNotifications,
                        getMoveNotifications,
                        getMatchNotificationsData
                      );
                      return (
                        <NotificationPresenter
                          getNotifications={getNotifications}
                          getMoveNotifications={getMoveNotifications}
                          getNotificationsLoading={getNotificationsLoading}
                          getMoveNotificationsLoading={
                            getMoveNotificationsLoading
                          }
                          getMatchNotificationsData={getMatchNotificationsData}
                          getMatchNotificationsLoading={
                            getMatchNotificationsLoading
                          }
                          modalOpen={modalOpen}
                          toggleModal={this.toggleModal}
                          onMarkRead={this.onMarkRead}
                        />
                      );
                    }}
                  </MarkAsReadMutation>
                )}
              </GetNotifictionsQuery>
            )}
          </GetMoveNotifictionsQuery>
        )}
      </GetMatchNotificationsQuery>
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
      isRead,
      ko: "sexman"
    } as any);
    console.log(isRead, this.state);
    this.markAsReadFn({ variables: { notificationId } });
  };
}

export default NotificationContainer;
