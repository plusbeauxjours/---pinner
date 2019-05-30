import React from "react";
import { Query } from "react-apollo";
import { RecommandUsers } from "../../../types/api";
import UsersBeforePresenter from "./UsersBeforePresenter";
import { CITY_USERS_BEFORE } from "./UsersBeforeQueries";

class RecommandUsersQuery extends Query<RecommandUsers> {}

interface IState {
  modalOpen: boolean;
  search: string;
  usersBeforeList: any;
}

class UsersNowContainer extends React.Component<any, IState> {
  public data;
  public fetchMore;
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      search: "",
      usersBeforeList: []
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    console.log(prevProps);
    console.log(newProps);
    if (prevProps.match !== newProps.match) {
      this.setState({ search: "", usersBeforeList: [] });
      console.log(this.state);
    }
  }
  public render() {
    const {
      match: {
        params: { cityName }
      }
    } = this.props;
    const { modalOpen, search, usersBeforeList } = this.state;
    return (
      <RecommandUsersQuery
        query={CITY_USERS_BEFORE}
        variables={{
          cityName
        }}
      >
        {({ data, loading, fetchMore }) => {
          this.data = data;
          this.fetchMore = fetchMore;
          return (
            <UsersBeforePresenter
              data={data}
              loading={loading}
              modalOpen={modalOpen}
              toggleModal={this.toggleModal}
              search={search}
              usersBeforeList={usersBeforeList}
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
      cityUsersBefore: { usersBefore = null }
    } = this.data;
    const userSearch = (list, text) =>
      list.filter(i =>
        i.actor.profile.username.toLowerCase().includes(text.toLowerCase())
      );
    const usersBeforeList = userSearch(usersBefore, value);
    console.log(usersBeforeList);
    this.setState({
      search: value,
      usersBeforeList
    } as any);
  };
  public loadMore = page => {
    const {
      match: {
        params: { cityName }
      }
    } = this.props;
    this.fetchMore({
      query: CITY_USERS_BEFORE,
      variables: {
        cityName,
        page
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        const data = {
          cityUsersBefore: {
            ...previousResult.cityUsersBefore,
            usersBefore: [
              ...previousResult.cityUsersBefore.usersBefore,
              ...fetchMoreResult.cityUsersBefore.usersBefore
            ]
          }
        };
        return data;
      }
    });
  };
}

export default UsersNowContainer;
