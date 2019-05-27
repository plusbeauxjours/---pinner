import React from "react";
import { Query } from "react-apollo";
import { GetFollowingsVariables, GetFollowings } from "src/types/api";
import FollowingsPresenter from "./FollowingsPresenter";
import { GET_FOLLOWINGS } from "./FollowingsQueries";
import { RouteComponentProps } from "react-router";
import { RECOMMAND_USERS } from "../PeoplePage/PeoplePageQueries";

class GetFollowingsQuery extends Query<GetFollowings, GetFollowingsVariables> {}
class RecommandUsersQuery extends Query<RecommandUsers> {}

interface IProps extends RouteComponentProps<any> {}
interface IState {
  username: string;
  search: string;
  usersList: any;
}

class FollowingsContainer extends React.Component<IProps, IState> {
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
      <GetFollowingsQuery
        query={GET_FOLLOWINGS}
        variables={{ userName: username }}
      >
        {({ data, loading }) => {
          this.data = data;
          return (
            <FollowingsPresenter
              data={data}
              loading={loading}
              userName={username}
              onChange={this.onChange}
              search={search}
              usersList={usersList}
            />
          );
        }}
      </GetFollowingsQuery>
    );
  };
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    console.log(this.data);
    const {
      getFollowings: { profiles = null }
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

export default FollowingsContainer;
