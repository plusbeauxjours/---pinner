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
}

class FollowersContainer extends React.Component<IProps, IState> {
  public latestCitiesFetchMore;
  constructor(props) {
    super(props);
    this.state = { username: props.username };
  }
  public render = () => {
    const {
      match: {
        params: { username }
      }
    } = this.props;
    return (
      <GetFollowersQuery
        query={GET_FOLLOWERS}
        variables={{ userName: username }}
      >
        {({ data, loading }) => {
          return (
            <FollowersPresenter
              data={data}
              loading={loading}
              userName={username}
            />
          );
        }}
      </GetFollowersQuery>
    );
  };
}

export default FollowersContainer;
