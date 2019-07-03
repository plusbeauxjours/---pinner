import React from "react";
import { Query } from "react-apollo";
import {
  ContinentUsersBefore,
  ContinentUsersBeforeVariables
} from "../../../types/api";
import ContinentUsersBeforePresenter from "./ContinentUsersBeforePresenter";
import { CONTINENT_USERS_BEFORE } from "./ContinentUsersBeforeQueries";
import { RouteComponentProps } from "react-router";

class ContinentUsersBeforeQuery extends Query<
  ContinentUsersBefore,
  ContinentUsersBeforeVariables
> {}

interface IProps extends RouteComponentProps<any> {}
interface IState {
  modalOpen: boolean;
  search: string;
  usersBeforeList: any;
}

class ContinentUsersBeforeContainer extends React.Component<IProps, IState> {
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
        params: { continentCode }
      }
    } = this.props;
    const { modalOpen, search, usersBeforeList } = this.state;
    return (
      <ContinentUsersBeforeQuery
        query={CONTINENT_USERS_BEFORE}
        variables={{
          continentCode
        }}
      >
        {({ data, loading, fetchMore }) => {
          this.data = data;
          this.fetchMore = fetchMore;
          return (
            <ContinentUsersBeforePresenter
              data={data}
              loading={loading}
              modalOpen={modalOpen}
              toggleModal={this.toggleModal}
              search={search}
              usersBeforeList={usersBeforeList}
              onChange={this.onChange}
              loadMore={this.loadMore}
              continentCode={continentCode}
            />
          );
        }}
      </ContinentUsersBeforeQuery>
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
      continentUsersBefore: { usersBefore = null }
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
        params: { continentCode }
      }
    } = this.props;
    this.fetchMore({
      query: CONTINENT_USERS_BEFORE,
      variables: {
        continentCode,
        page
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        const data = {
          continentUsersBefore: {
            ...previousResult.continentUsersBefore,
            usersBefore: [
              ...previousResult.continentUsersBefore.usersBefore,
              ...fetchMoreResult.continentUsersBefore.usersBefore
            ]
          }
        };
        return data;
      }
    });
  };
}

export default ContinentUsersBeforeContainer;
