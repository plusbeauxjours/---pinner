import React from "react";
import { Query } from "react-apollo";
import {
  GetFollowersVariables,
  GetFollowers,
  RecommandUsers
} from "src/types/api";
import FollowersPresenter from "./FollowersPresenter";
import { GET_FOLLOWERS } from "./FollowersQueries";
import { RouteComponentProps } from "react-router";
import { RECOMMAND_USERS } from "../PeoplePage/PeoplePageQueries";

class GetFollowersQuery extends Query<GetFollowers, GetFollowersVariables> {}
class RecommandUsersQuery extends Query<RecommandUsers> {}

interface IProps extends RouteComponentProps<any> {}
interface IState {
  username: string;
  search: string;
  usersList: any;
}

class FollowersContainer extends React.Component<IProps, IState> {
  public data;
  constructor(props) {
    super(props);
    this.state = { username: props.username, search: "", usersList: [] };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match.params.username !== newProps.match.params.username) {
      this.setState({ search: "", usersList: [] });
      console.log(this.state);
    }
  }
  public render = () => {
    const {
      match: {
        params: { username }
      }
    } = this.props;
    const { search, usersList } = this.state;
    return (
      <RecommandUsersQuery query={RECOMMAND_USERS}>
        {({ data: recommandUsersData, loading: recommandUsersLoading }) => {
          return (
            <GetFollowersQuery
              query={GET_FOLLOWERS}
              variables={{ userName: username }}
            >
              {({ data, loading }) => {
                this.data = data;
                return (
                  <FollowersPresenter
                    data={data}
                    loading={loading}
                    recommandUsersData={recommandUsersData}
                    recommandUsersLoading={recommandUsersLoading}
                    userName={username}
                    onChange={this.onChange}
                    search={search}
                    usersList={usersList}
                  />
                );
              }}
            </GetFollowersQuery>
          );
        }}
      </RecommandUsersQuery>
    );
  };
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    console.log(this.data);
    const {
      getFollowers: { profiles = null }
    } = this.data;
    const nowSearch = (list, text) =>
      list.filter(
        i =>
          i.username.toLowerCase().includes(text.toLowerCase()) ||
          i.currentCity.cityName.toLowerCase().includes(text.toLowerCase()) ||
          i.currentCity.country.countryName
            .toLowerCase()
            .includes(text.toLowerCase())
      );
    const usersList = nowSearch(profiles, value);
    this.setState({
      search: value,
      usersList
    } as any);
  };
}

export default FollowersContainer;
