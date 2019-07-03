import React from "react";
import { Query } from "react-apollo";
import {
  ContinentUsersNow,
  ContinentUsersNowVariables
} from "../../../types/api";
import ContinentUsersNowPresenter from "./ContinentUsersNowPresenter";
import { CONTINENT_USERS_NOW } from "./ContinentUsersNowQueries";
import { RouteComponentProps } from "react-router";

class ContinentUsersNowQuery extends Query<
  ContinentUsersNow,
  ContinentUsersNowVariables
> {}

interface IProps extends RouteComponentProps<any> {}
interface IState {
  modalOpen: boolean;
  search: string;
  usersNowList: any;
}

class ContinentUsersNowContainer extends React.Component<IProps, IState> {
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
        params: { continentCode }
      }
    } = this.props;
    console.log(this.props);
    const { modalOpen, search, usersNowList } = this.state;
    return (
      <ContinentUsersNowQuery
        query={CONTINENT_USERS_NOW}
        variables={{
          continentCode
        }}
      >
        {({ data, loading, fetchMore }) => {
          this.data = data;
          this.fetchMore = fetchMore;
          return (
            <ContinentUsersNowPresenter
              data={data}
              loading={loading}
              modalOpen={modalOpen}
              toggleModal={this.toggleModal}
              search={search}
              usersNowList={usersNowList}
              onChange={this.onChange}
              loadMore={this.loadMore}
              continentCode={continentCode}
            />
          );
        }}
      </ContinentUsersNowQuery>
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
        params: { continentCode }
      }
    } = this.props;
    this.fetchMore({
      query: CONTINENT_USERS_NOW,
      variables: {
        continentCode,
        page
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        const data = {
          continentUsersNow: {
            ...previousResult.continentUsersNow,
            usersNow: [
              ...previousResult.continentUsersNow.usersNow,
              ...fetchMoreResult.continentUsersNow.usersNow
            ]
          }
        };
        return data;
      }
    });
  };
}

export default ContinentUsersNowContainer;
