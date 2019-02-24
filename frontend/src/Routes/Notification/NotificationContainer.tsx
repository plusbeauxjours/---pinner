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
    return (
      <GetNotifictionQuery query={GET_NOTIFICATION} variables={{ page }}>
        {({ data, loading }) => (
          <NotificationPresenter
            data={data}
            loading={loading}
            modalOpen={modalOpen}
            toggleModal={this.toggleModal}
          />
        )}
      </GetNotifictionQuery>
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
