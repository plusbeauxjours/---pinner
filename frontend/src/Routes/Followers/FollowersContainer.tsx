import React from "react";
import { Query } from "react-apollo";
import { GetFollowersVariables, GetFollowers } from "src/types/api";
import FollowersPresenter from "./FollowersPresenter";
import { GET_FOLLOWERS } from "./FollowersQueries";
import { RouteComponentProps } from "react-router";

class GetFollowersQuery extends Query<GetFollowers, GetFollowersVariables> {}

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
    this.state = { username: props.username, search: "", usersList: null };
  }
  public render = () => {
    const {
      match: {
        params: { username }
      }
    } = this.props;
    const { search, usersList } = this.state;
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
              userName={username}
              onChange={this.onChange}
              search={search}
              usersList={usersList}
            />
          );
        }}
      </GetFollowersQuery>
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
