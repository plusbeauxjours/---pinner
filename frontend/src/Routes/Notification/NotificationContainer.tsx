import React from "react";
import { Query } from "react-apollo";
import { GetNotifications, GetNotificationsVariables } from "../../types/api";

import NotificationPresenter from "./NotificationPresenter";
import { GET_NOTIFICATION } from "./NotificationQueries";

class GetNotificationsQuery extends Query<
  GetNotifications,
  GetNotificationsVariables
> {}

interface IState {
  page: number;
  modalOpen: boolean;
  notificationId: string;
  search: string;
  notificationList: any;
}

class NotificationContainer extends React.Component<any, IState> {
  public data;
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      modalOpen: false,
      notificationId: "",
      search: "",
      notificationList: []
    };
  }
  public render() {
    const { page, modalOpen, search, notificationList } = this.state;
    return (
      <GetNotificationsQuery query={GET_NOTIFICATION} variables={{ page }}>
        {({ data, loading }) => {
          this.data = data;
          return (
            <NotificationPresenter
              data={data}
              loading={loading}
              modalOpen={modalOpen}
              toggleModal={this.toggleModal}
              search={search}
              notificationList={notificationList}
              onChange={this.onChange}
            />
          );
        }}
      </GetNotificationsQuery>
    );
  }
  public toggleModal = () => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen
    } as any);
  };

  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    console.log(this.data);
    const { getNotifications: { notifications = {} } = {} } = ({} = this.data);
    const nowSearch = (list, text) =>
      list.filter(
        i =>
          i.city.cityName.toLowerCase().includes(text.toLowerCase()) ||
          i.city.country.countryName.toLowerCase().includes(text.toLowerCase())
      );
    const notificationList = nowSearch(notifications, value);
    console.log(this.data);

    console.log(notificationList);
    this.setState({
      search: value,
      notificationList
    } as any);
  };
}

export default NotificationContainer;
