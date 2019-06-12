import React from "react";
import { Query } from "react-apollo";
import { CityUsersBefore, CityUsersBeforeVariables } from "../../../types/api";
import CityUsersBeforePresenter from "./CityUsersBeforePresenter";
import { CITY_USERS_BEFORE } from "./CityUsersBeforeQueries";
import { RouteComponentProps } from "react-router";

class CityUsersBeforeQuery extends Query<
  CityUsersBefore,
  CityUsersBeforeVariables
> {}

interface IProps extends RouteComponentProps<any> {}
interface IState {
  modalOpen: boolean;
  search: string;
  usersBeforeList: any;
  usersBeforeActiveId: number;
}

class CityUsersBeforeContainer extends React.Component<IProps, IState> {
  public data;
  public fetchMore;
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      search: "",
      usersBeforeList: [],
      usersBeforeActiveId: null
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
        params: { cityId }
      }
    } = this.props;
    const {
      modalOpen,
      search,
      usersBeforeList,
      usersBeforeActiveId
    } = this.state;
    return (
      <CityUsersBeforeQuery
        query={CITY_USERS_BEFORE}
        variables={{
          cityId
        }}
      >
        {({ data, loading, fetchMore }) => {
          this.data = data;
          this.fetchMore = fetchMore;
          return (
            <CityUsersBeforePresenter
              data={data}
              loading={loading}
              modalOpen={modalOpen}
              toggleModal={this.toggleModal}
              search={search}
              usersBeforeActiveId={usersBeforeActiveId}
              usersBeforeList={usersBeforeList}
              onChange={this.onChange}
              loadMore={this.loadMore}
              cityId={cityId}
              onKeyDown={this.onKeyDown}
              onClick={this.onClick}
              onBlur={this.onBlur}
            />
          );
        }}
      </CityUsersBeforeQuery>
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
      usersBeforeList,
      usersBeforeActiveId: 0
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
  public onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { keyCode } = event;
    const { usersBeforeActiveId, usersBeforeList } = this.state;
    const { history } = this.props;

    const { cityUsersBefore: { usersBefore = null } = {} } = this.data;

    if (keyCode === 13 && (usersBeforeList.length || usersBefore)) {
      {
        usersBeforeList.length
          ? history.push({
              pathname: `/${
                usersBeforeList[usersBeforeActiveId].actor.profile.username
              }`
            })
          : history.push({
              pathname: `/${
                usersBefore[usersBeforeActiveId].actor.profile.username
              }`
            });
      }
      this.setState({
        usersBeforeActiveId: 0
      });
    } else if (keyCode === 38) {
      if (usersBeforeActiveId === 0) {
        return;
      }
      this.setState({
        usersBeforeActiveId: usersBeforeActiveId - 1
      });
    } else if (keyCode === 40) {
      if (usersBeforeList.length) {
        if (usersBeforeActiveId === usersBeforeList.length - 1) {
          return;
        }
      } else {
        if (usersBeforeActiveId === usersBefore.length - 1) {
          return;
        }
      }
      this.setState({
        usersBeforeActiveId: usersBeforeActiveId + 1
      });
    }
  };
  public onClick: React.MouseEventHandler<HTMLDivElement> = () => {
    this.setState({
      usersBeforeActiveId: 0
    });
  };
  public onBlur: React.MouseEventHandler<HTMLDivElement> = () => {
    this.setState({
      usersBeforeActiveId: null
    });
  };
}

export default CityUsersBeforeContainer;
