import React from "react";
import { Query } from "react-apollo";
import { CountryUsersNow, CountryUsersNowVariables } from "../../../types/api";
import CountryUsersNowPresenter from "./CountryUsersNowPresenter";
import { COUNTRY_USERS_NOW } from "./CountryUsersNowQueries";
import { RouteComponentProps } from "react-router";

class CountryUsersNowQuery extends Query<
  CountryUsersNow,
  CountryUsersNowVariables
> {}

interface IProps extends RouteComponentProps<any> {}
interface IState {
  modalOpen: boolean;
  search: string;
  usersNowList: any;
  usersNowActiveId: number;
}

class CountryUsersNowContainer extends React.Component<IProps, IState> {
  public data;
  public fetchMore;
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      search: "",
      usersNowList: [],
      usersNowActiveId: null
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
        params: { countryName }
      }
    } = this.props;
    console.log(this.props);
    const { modalOpen, search, usersNowList, usersNowActiveId } = this.state;
    return (
      <CountryUsersNowQuery
        query={COUNTRY_USERS_NOW}
        variables={{
          countryName
        }}
      >
        {({ data, loading, fetchMore }) => {
          this.data = data;
          this.fetchMore = fetchMore;
          return (
            <CountryUsersNowPresenter
              data={data}
              loading={loading}
              modalOpen={modalOpen}
              toggleModal={this.toggleModal}
              search={search}
              usersNowActiveId={usersNowActiveId}
              usersNowList={usersNowList}
              onChange={this.onChange}
              loadMore={this.loadMore}
              countryName={countryName}
              onKeyDown={this.onKeyDown}
              onClick={this.onClick}
              onBlur={this.onBlur}
            />
          );
        }}
      </CountryUsersNowQuery>
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
      countryUsersNow: { usersNow = null }
    } = this.data;
    const userSearch = (list, text) =>
      list.filter(i =>
        i.profile.username.toLowerCase().includes(text.toLowerCase())
      );
    const usersNowList = userSearch(usersNow, value);
    console.log(usersNowList);
    this.setState({
      search: value,
      usersNowList,
      usersNowActiveId: 0
    } as any);
  };
  public loadMore = page => {
    const {
      match: {
        params: { countryName }
      }
    } = this.props;
    this.fetchMore({
      query: COUNTRY_USERS_NOW,
      variables: {
        countryName,
        page
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        const data = {
          countryUsersNow: {
            ...previousResult.countryUsersNow,
            usersNow: [
              ...previousResult.countryUsersNow.usersNow,
              ...fetchMoreResult.countryUsersNow.usersNow
            ]
          }
        };
        return data;
      }
    });
  };
  public onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { keyCode } = event;
    const { usersNowActiveId, usersNowList } = this.state;
    const { history } = this.props;

    const { countryUsersNow: { usersNow = null } = {} } = this.data;

    if (keyCode === 13 && (usersNowList.length || usersNow)) {
      {
        usersNowList.length
          ? history.push({
              pathname: `/${usersNowList[usersNowActiveId].profile.username}`
            })
          : history.push({
              pathname: `/${usersNow[usersNowActiveId].profile.username}`
            });
      }
      this.setState({
        usersNowActiveId: 0
      });
    } else if (keyCode === 38) {
      if (usersNowActiveId === 0) {
        return;
      }
      this.setState({
        usersNowActiveId: usersNowActiveId - 1
      });
    } else if (keyCode === 40) {
      if (usersNowList.length) {
        if (usersNowActiveId === usersNowList.length - 1) {
          return;
        }
      } else {
        if (usersNowActiveId === usersNow.length - 1) {
          return;
        }
      }
      this.setState({
        usersNowActiveId: usersNowActiveId + 1
      });
    }
  };
  public onClick: React.MouseEventHandler<HTMLDivElement> = () => {
    this.setState({
      usersNowActiveId: 0
    });
  };
  public onBlur: React.MouseEventHandler<HTMLDivElement> = () => {
    this.setState({
      usersNowActiveId: null
    });
  };
}

export default CountryUsersNowContainer;
