import React from "react";
import { Query } from "react-apollo";
import { RecommandUsers } from "../../types/api";
import PeoplePagePresenter from "./PeoplePagePresenter";
import { RECOMMAND_USERS } from "./PeoplePageQueries";

class RecommandUsersQuery extends Query<RecommandUsers> {}

interface IState {
  modalOpen: boolean;
  search: string;
  recommandUserList: any;
}

class PeoplePageContainer extends React.Component<any, IState> {
  public recommandUsersFetchMore;
  public recommandUsersData;
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      search: "",
      recommandUserList: []
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    console.log(prevProps);
    console.log(newProps);
    if (prevProps.match !== newProps.match) {
      this.setState({ search: "", recommandUserList: [] });
      console.log(this.state);
    }
  }
  public render() {
    const { modalOpen, search, recommandUserList } = this.state;
    return (
      <RecommandUsersQuery query={RECOMMAND_USERS}>
        {({
          data: recommandUsersData,
          loading: recommandUsersLoading,
          fetchMore: recommandUsersFetchMore
        }) => {
          this.recommandUsersData = recommandUsersData;
          this.recommandUsersFetchMore = recommandUsersFetchMore;
          return (
            <PeoplePagePresenter
              recommandUsersData={recommandUsersData}
              recommandUsersLoading={recommandUsersLoading}
              modalOpen={modalOpen}
              toggleModal={this.toggleModal}
              search={search}
              recommandUserList={recommandUserList}
              onChange={this.onChange}
              loadMore={this.loadMore}
            />
          );
        }}
      </RecommandUsersQuery>
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
    const {
      recommandUsers: { users = null }
    } = this.recommandUsersData;
    const userSearch = (list, text) =>
      list.filter(i => i.username.toLowerCase().includes(text.toLowerCase()));
    const recommandUserList = userSearch(users, value);
    console.log(recommandUserList);
    this.setState({
      search: value,
      recommandUserList
    } as any);
  };
  public loadMore = page => {
    this.recommandUsersFetchMore({
      query: RECOMMAND_USERS,
      variables: {
        page
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        const data = {
          getNotifications: {
            ...previousResult.getNotifications,
            hasNextPage: fetchMoreResult.getNotifications.hasNextPage,
            notifications: [
              ...previousResult.getNotifications.notifications,
              ...fetchMoreResult.getNotifications.notifications
            ]
          }
        };
        return data;
      }
    });
  };
}

export default PeoplePageContainer;