import React from "react";
import { Query } from "react-apollo";
import { GetNotifictions, GetNotifictionsVariables } from "../../types/api";

import NotificationPresenter from "./NotificationPresenter";
import { GET_NOTIFICATION } from "./NotificationQueries";

class GetNotifictionQuery extends Query<
  GetNotifictions,
  GetNotifictionsVariables
> {}

interface IState {
  page: number;
}

class NotificationContainer extends React.Component<any, IState> {
  public state = {
    page: 0
  };
  public render() {
    const { page } = this.state;
    return (
      <GetNotifictionQuery
        query={GET_NOTIFICATION}
        variables={{ page }}
        // pollInterval={1000}
      >
        {({ data, loading }) => (
          <NotificationPresenter data={data} loading={loading} />
        )}
      </GetNotifictionQuery>
    );
  }
}

export default NotificationContainer;
