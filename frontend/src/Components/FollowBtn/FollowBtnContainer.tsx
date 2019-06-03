import React from "react";
import FollowBtnPresenter from "./FollowBtnPresenter";
import { Mutation, MutationFn } from "react-apollo";
import { FollowUser, FollowUserVariables } from "../../types/api";
import { FOLLOW_USER } from "./FollowBtnQueries";
import { withRouter, RouteComponentProps } from "react-router";
import { GET_FOLLOWERS } from "../../Routes/User/Followers/FollowersQueries";
import { GET_FOLLOWINGS } from "../../Routes/User/Followings/FollowingsQueries";
import { GET_USER } from "../../Routes/User/UserProfile/UserProfileQueries";
import { CITY_PROFILE } from "../../Routes/City/CityProfile/CityProfileQueries";
import { GET_MATCHES } from "../../Routes/Match/MatchQueries";
import { RECOMMAND_USERS } from "../../Routes/Feed/PeoplePage/PeoplePageQueries";

class FollowMutation extends Mutation<FollowUser, FollowUserVariables> {}

interface IProps extends RouteComponentProps<any> {
  userId: string;
}

interface IState {
  isFollowing: boolean;
}

class FollowBtnContainer extends React.Component<IProps, IState> {
  public followUserFn: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      isFollowing: props.isFollowing
    };
  }
  public render() {
    const { isFollowing } = this.state;
    const { userId } = this.props;
    return (
      <FollowMutation
        mutation={FOLLOW_USER}
        variables={{ userId: parseInt(userId, 10) }}
        update={this.updateFollow}
      >
        {followUserFn => {
          this.followUserFn = followUserFn;
          return (
            <FollowBtnPresenter
              isFollowing={isFollowing}
              toggleBtn={this.toggleBtn}
            />
          );
        }}
      </FollowMutation>
    );
  }
  public toggleBtn = () => {
    this.followUserFn();
    this.setState(state => {
      return {
        isFollowing: !state.isFollowing
      };
    });
  };
  public updateFollow = (cache, { data: { followUser } }) => {
    const { userId } = this.props;
    const {
      match: {
        params: { username }
      }
    } = this.props;
    console.log(cache);
    try {
      const data = cache.readQuery({
        query: GET_FOLLOWERS,
        variables: { userName: username }
      });
      if (data) {
        data.getFollowers.profiles.find(
          i => parseInt(i.id, 10) === parseInt(userId, 10)
        ).isFollowing = followUser.user.profile.isFollowing;
        cache.writeQuery({
          query: GET_FOLLOWERS,
          variables: { userName: username },
          data
        });
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const data = cache.readQuery({
        query: GET_FOLLOWINGS,
        variables: { userName: username }
      });
      if (data) {
        try {
          data.getFollowings.profiles.find(
            i => parseInt(i.id, 10) === parseInt(userId, 10)
          ).isFollowing = followUser.user.profile.isFollowing;
        } catch (e) {
          if (e instanceof TypeError) {
            data.getFollowings.profiles.push(followUser.user.profile);
          } else {
            console.log(e);
          }
        }
        cache.writeQuery({
          query: GET_FOLLOWINGS,
          variables: { userName: username },
          data
        });
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const data = cache.readQuery({
        query: GET_USER,
        variables: { username: followUser.user.profile.username }
      });
      if (data) {
        data.userProfile.user.profile.isFollowing =
          followUser.user.profile.isFollowing;
        cache.writeQuery({
          query: GET_USER,
          variables: { userName: followUser.user.profile.username },
          data
        });
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const data = cache.readQuery({
        query: CITY_PROFILE,
        variables: { cityName: followUser.user.profile.currentCity.cityName }
      });
      if (data) {
        data.cityProfile.usersNow.profile.find(
          i => parseInt(i.id, 10) === parseInt(userId, 10)
        ).isFollowing = followUser.user.profile.isFollowing;
        cache.writeQuery({
          query: CITY_PROFILE,
          variables: { cityName: followUser.user.profile.currentCity.cityName },
          data
        });
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const data = cache.readQuery({
        query: GET_MATCHES
      });
      if (data) {
        data.getMatches.host.profile.find(
          i => parseInt(i.id, 10) === parseInt(userId, 10)
        ).isFollowing = followUser.user.profile.isFollowing;
        data.getMatches.guest.profile.find(
          i => parseInt(i.id, 10) === parseInt(userId, 10)
        ).isFollowing = followUser.user.profile.isFollowing;
        cache.writeQuery({
          query: GET_MATCHES,
          data
        });
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const data = cache.readQuery({
        query: RECOMMAND_USERS
      });
      if (data) {
        console.log(data);
        data.recommandUsers.users.find(
          i => parseInt(i.id, 10) === parseInt(userId, 10)
        ).profile.isFollowing = followUser.user.profile.isFollowing;
        console.log(data);
        cache.writeQuery({
          query: RECOMMAND_USERS,
          data
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export default withRouter(FollowBtnContainer);
