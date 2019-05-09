import React from "react";
import { Query } from "react-apollo";
import { GetFollowingsVariables, GetFollowings } from "src/types/api";
import FollowingsPresenter from "./FollowingsPresenter";
import { GET_FOLLOWINGS } from "./FollowingsQueries";
import { RouteComponentProps } from "react-router";

class GetFollowingsQuery extends Query<GetFollowings, GetFollowingsVariables> {}

interface IProps extends RouteComponentProps<any> {}
interface IState {
  username: string;
}

class FollowingsContainer extends React.Component<IProps, IState> {
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
      <GetFollowingsQuery
        query={GET_FOLLOWINGS}
        variables={{ userName: username }}
      >
        {({ data, loading }) => {
          return (
            <FollowingsPresenter
              data={data}
              loading={loading}
              userName={username}
            />
          );
        }}
      </GetFollowingsQuery>
    );
  };
}

export default FollowingsContainer;
