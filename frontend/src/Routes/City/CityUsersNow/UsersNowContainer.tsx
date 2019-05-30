import React from "react";
import { Query } from "react-apollo";
import { RecommandUsers } from "../../../types/api";
import UsersNowPresenter from "./UsersNowPresenter";
import { CITY_USERS_NOW } from "./UsersNowQueries";

class RecommandUsersQuery extends Query<RecommandUsers> {}

interface IState {
  modalOpen: boolean;
  search: string;
  usersNowList: any;
}

class UsersNowContainer extends React.Component<any, IState> {
  public data;
  public fetchMore;
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      search: "",
      usersNowList: []
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    console.log(prevProps);
    console.log(newProps);
    if (prevProps.match !== newProps.match) {
      this.setState({ search: "", usersNowList: [] });
      console.log(this.state);
    }
  }
  public render() {
    const {
      match: {
        params: { cityName }
      }
    } = this.props;
    const { modalOpen, search, usersNowList } = this.state;
    return (
      <RecommandUsersQuery
        query={CITY_USERS_NOW}
        variables={{
          cityName
        }}
      >
        {({ data, loading, fetchMore }) => {
          this.data = data;
          this.fetchMore = fetchMore;
          return (
            <UsersNowPresenter
              data={data}
              loading={loading}
              modalOpen={modalOpen}
              toggleModal={this.toggleModal}
              search={search}
              usersNowList={usersNowList}
              onChange={this.onChange}
              loadMore={this.loadMore}
              cityName={cityName}
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
    } = this.data;
    const userSearch = (list, text) =>
      list.filter(i =>
        i.profile.username.toLowerCase().includes(text.toLowerCase())
      );
    const usersNowList = userSearch(users, value);
    console.log(usersNowList);
    this.setState({
      search: value,
      usersNowList
    } as any);
  };
  public loadMore = page => {
    const {
      match: {
        params: { cityName }
      }
    } = this.props;
    this.fetchMore({
      query: CITY_USERS_NOW,
      variables: {
        cityName,
        page
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        const data = {
          cityUsersNow: {
            ...previousResult.cityUsersNow,
            usersNow: [
              ...previousResult.cityUsersNow.usersNow,
              ...fetchMoreResult.cityUsersNow.usersNow
            ]
          }
        };
        return data;
      }
    });
  };
}

export default UsersNowContainer;
