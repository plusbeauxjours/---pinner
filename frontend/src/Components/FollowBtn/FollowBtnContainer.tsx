import React from "react";
import FollowBtnPresenter from "./FollowBtnPresenter";
import { Mutation, MutationFn } from "react-apollo";
import { FollowUser, FollowUserVariables } from "../../types/api";
import { FOLLOW_USER } from "./FollowBtnQueries";
import { GET_USER } from "../../Routes/Profile/ProfileQueries";
import { GET_FEED } from "../../Routes/Feed/FeedQueries";
import Me from "src/Components/Me";
import {
  GET_MOVE_NOTIFICATION,
  GET_NOTIFICATION
} from "../../Routes/Notification/NotificationQueries";

class FollowMutation extends Mutation<FollowUser, FollowUserVariables> {}

interface IState {
  isFollowing: boolean;
}

class FollowBtnContainer extends React.Component<any, IState> {
  public followUserFn: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      isFollowing: props.isFollowing
    };
  }
  public render() {
    const { isFollowing } = this.state;
    const { userId, username } = this.props;
    return (
      <Me>
        {user => (
          <FollowMutation
            mutation={FOLLOW_USER}
            variables={{ userId: parseInt(userId, 10) }}
            onCompleted={this.toggleBtn}
            refetchQueries={[
              { query: GET_MOVE_NOTIFICATION, variables: { page: 0 } },
              { query: GET_NOTIFICATION, variables: { page: 0 } },
              { query: GET_USER, variables: { username } },
              {
                query: GET_FEED,
                variables: {
                  page: 0,
                  cityname: user.profile.currentCity.cityname
                }
              }
            ]}
          >
            {followUserFn => (
              <FollowBtnPresenter
                isFollowing={isFollowing}
                toggleBtn={followUserFn}
              />
            )}
          </FollowMutation>
        )}
      </Me>
    );
  }
  public toggleBtn = () => {
    this.setState(state => {
      return {
        isFollowing: !state.isFollowing
      };
    });
  };
}

export default FollowBtnContainer;
