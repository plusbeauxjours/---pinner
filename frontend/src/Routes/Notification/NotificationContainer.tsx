import React from "react";
import { Query, MutationFn, Mutation } from "react-apollo";
import { GetNotifications, GetNotificationsVariables } from "../../types/api";
import NotificationPresenter from "./NotificationPresenter";
import { MarkAsRead, MarkAsReadVariables } from "../../types/api";
import { MARK_AS_READ, GET_NOTIFICATION } from "./NotificationQueries";

class MarkAsReadMutation extends Mutation<MarkAsRead, MarkAsReadVariables> {}
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
  public fetchMore;
  public markAsReadFn: MutationFn;
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
      <MarkAsReadMutation
        mutation={MARK_AS_READ}
        update={this.updateMarkAsRead}
      >
        {markAsReadFn => {
          this.markAsReadFn = markAsReadFn;
          return (
            <GetNotificationsQuery
              query={GET_NOTIFICATION}
              variables={{ page }}
            >
              {({ data, loading, fetchMore }) => {
                this.data = data;
                this.fetchMore = fetchMore;
                return (
                  <NotificationPresenter
                    data={data}
                    loading={loading}
                    modalOpen={modalOpen}
                    toggleModal={this.toggleModal}
                    search={search}
                    notificationList={notificationList}
                    onChange={this.onChange}
                    onMarkRead={this.onMarkRead}
                    loadMore={this.loadMore}
                  />
                );
              }}
            </GetNotificationsQuery>
          );
        }}
      </MarkAsReadMutation>
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
  public onMarkRead = (notificationId: string) => {
    this.markAsReadFn({ variables: { notificationId } });
  };
  public updateMarkAsRead = (cache, { data: { markAsRead } }) => {
    try {
      const data = cache.readQuery({
        query: GET_NOTIFICATION,
        variables: { page: 0 }
      });
      if (data) {
        data.getNotifications.notifications.find(
          i => parseInt(i.id, 10) === markAsRead.notificationId
        ).read = true;
        cache.writeQuery({
          query: GET_NOTIFICATION,
          variables: { page: 0 },
          data
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  public loadMore = page => {
    this.fetchMore({
      query: GET_NOTIFICATION,
      variables: {
        page
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        const newData = {
          getNotifications: {
            ...previousResult.getNotifications,
            notifications: [
              ...previousResult.getNotifications.notifications,
              ...fetchMoreResult.getNotifications.notifications
            ]
          }
        };
        return newData;
      }
    });
  };
}

export default NotificationContainer;
