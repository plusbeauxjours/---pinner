import React from "react";
import { Query } from "react-apollo";
import {
  GetFollowingsVariables,
  GetFollowings,
  RecommandUsers
} from "src/types/api";
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
  activeId: number;
}

class FollowingsContainer extends React.Component<IProps, IState> {
  public data;
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      search: "",
      usersList: [],
      activeId: 0
    };
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
    const { search, usersList, activeId } = this.state;
    return (
      <RecommandUsersQuery query={RECOMMAND_USERS}>
        {({ data: recommandUsersData, loading: recommandUsersLoading }) => {
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
                    recommandUsersData={recommandUsersData}
                    recommandUsersLoading={recommandUsersLoading}
                    userName={username}
                    search={search}
                    activeId={activeId}
                    onChange={this.onChange}
                    usersList={usersList}
                    onKeyDown={this.onKeyDown}
                    onClick={this.onClick}
                    onBlur={this.onBlur}
                  />
                );
              }}
            </GetFollowingsQuery>
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
      usersList,
      activeId: 0
    } as any);
  };
  public onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { keyCode } = event;
    const { activeId, usersList } = this.state;
    const { history } = this.props;

    const {
      getFollowings: { profiles = null }
    } = this.data;

    if (keyCode === 13 && (usersList.length || profiles)) {
      {
        usersList.length
          ? history.push({
              pathname: `/${usersList[activeId].username}`
            })
          : history.push({
              pathname: `/${profiles[activeId].username}`
            });
      }
      this.setState({
        activeId: 0
      });
    } else if (keyCode === 38) {
      if (activeId === 0) {
        return;
      }
      this.setState({
        activeId: activeId - 1
      });
    } else if (keyCode === 40) {
      if (usersList.length) {
        if (activeId === usersList.length - 1) {
          console.log(activeId);
          return;
        }
      } else {
        if (activeId === profiles.length - 1) {
          console.log(activeId);
          return;
        }
      }
      this.setState({
        activeId: activeId + 1
      });
    }
  };
  public onClick: React.MouseEventHandler<HTMLDivElement> = () => {
    this.setState({
      activeId: 0
    });
  };
  public onBlur: React.MouseEventHandler<HTMLDivElement> = () => {
    this.setState({
      activeId: 0
    });
  };
}

export default FollowingsContainer;
