import React from "react";
import CoffeeDetailPresenter from "./CoffeeDetailPresenter";
import { Query, Mutation, MutationFn } from "react-apollo";
import {
  FollowUser,
  FollowUserVariables,
  CoffeeDetail,
  CoffeeDetailVariables,
  DeleteCoffee,
  DeleteCoffeeVariables
} from "../../../types/api";
import { COFFEE_DETAIL } from "./CoffeeDetailQueries";
import { withRouter, RouteComponentProps } from "react-router";
import { FOLLOW_USER } from "../../../Components/FollowBtn/FollowBtnQueries";
import { DELETE_COFFEE } from "../../Detail/CoffeeDetail/CoffeeDetailQueries";
import { GET_COFFEES } from "../../User/Coffees/CoffeesQueries";
import { toast } from "react-toastify";
import { GET_FOLLOWERS } from "../../User/Followers/FollowersQueries";
import { GET_FOLLOWINGS } from "../../User/Followings/FollowingsQueries";
import { GET_USER } from "../../User/UserProfile/UserProfileQueries";
import { CITY_PROFILE } from "../../City/CityProfile/CityProfileQueries";
import { GET_MATCHES } from "../../Match/MatchQueries";
import { RECOMMAND_USERS } from "../../Feed/PeoplePage/PeoplePageQueries";

class CoffeeDetailQuery extends Query<CoffeeDetail, CoffeeDetailVariables> {}
class FollowMutation extends Mutation<FollowUser, FollowUserVariables> {}
class DeleteCoffeeMutation extends Mutation<
  DeleteCoffee,
  DeleteCoffeeVariables
> {}

interface IProps extends RouteComponentProps<any> {
  isFollowing?: boolean;
}

interface IState {
  modalOpen: boolean;
  isFollowing?: boolean;
  userId: string;
}

class CoffeeDetailContainer extends React.Component<IProps, IState> {
  public followUserFn: MutationFn;
  public deleteCoffeeFn: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      isFollowing: props.isFollowing,
      userId: null
    };
    console.log(this.state);
  }
  public render() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const { modalOpen, isFollowing } = this.state;
    console.log(this.state);
    return (
      <DeleteCoffeeMutation
        mutation={DELETE_COFFEE}
        onCompleted={this.onCompletedDeleteCoffee}
        update={this.updateDeleteCoffee}
      >
        {deleteCoffeeFn => {
          this.deleteCoffeeFn = deleteCoffeeFn;
          return (
            <FollowMutation
              mutation={FOLLOW_USER}
              onCompleted={() =>
                this.setState({
                  modalOpen: false,
                  isFollowing: !isFollowing
                })
              }
            >
              {followUserFn => {
                this.followUserFn = followUserFn;
                return (
                  <CoffeeDetailQuery
                    query={COFFEE_DETAIL}
                    variables={{ coffeeId: id }}
                  >
                    {({ data, loading }) => (
                      <CoffeeDetailPresenter
                        loading={loading}
                        data={data}
                        modalOpen={modalOpen}
                        toggleModal={this.toggleModal}
                        back={this.back}
                        followUser={this.followUser}
                        isFollowing={isFollowing}
                        deleteCoffee={this.deleteCoffee}
                      />
                    )}
                  </CoffeeDetailQuery>
                );
              }}
            </FollowMutation>
          );
        }}
      </DeleteCoffeeMutation>
    );
  }
  public followUser = (userId: string) => {
    this.setState({ userId });
    this.followUserFn({
      variables: {
        userId: parseInt(userId, 10)
      }
    });
    this.setState({
      modalOpen: !false
    });
  };
  public toggleModal = () => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen
    });
    console.log(this.state);
  };
  public back = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };
  public onCompletedDeleteCoffee = data => {
    if (data.deleteCoffee.ok) {
      toast.success("Coffee deleted");
    } else {
      toast.error("error");
    }
  };
  public updateDeleteCoffee = (cache, { data: { deleteCoffee } }) => {
    const { username } = deleteCoffee;
    console.log(username);
    const currentCity = localStorage.getItem("cityName");
    try {
      const profileData = cache.readQuery({
        query: GET_COFFEES,
        variables: { userName: username, location: "profile" }
      });
      console.log(profileData);
      if (profileData) {
        profileData.getCoffees.coffees = profileData.getCoffees.coffees.filter(
          i => parseInt(i.id, 10) !== deleteCoffee.coffeeId
        );
        profileData.getCoffees.coffees = profileData.getCoffees.coffees.filter(
          i => parseInt(i.id, 10) !== deleteCoffee.coffeeId
        );
        cache.writeQuery({
          query: GET_COFFEES,
          variables: { userName: username, location: "profile" },
          data: profileData
        });
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const feedData = cache.readQuery({
        query: GET_COFFEES,
        variables: { cityName: currentCity, location: "feed" }
      });
      if (feedData) {
        feedData.getCoffees.coffees = feedData.getCoffees.coffees.filter(
          i => parseInt(i.id, 10) !== deleteCoffee.coffeeId
        );
        cache.writeQuery({
          query: GET_COFFEES,
          variables: {
            cityName: currentCity,
            location: "feed"
          },
          data: feedData
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  public deleteCoffee = () => {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    this.deleteCoffeeFn({ variables: { coffeeId: parseInt(id, 10) } });
    this.setState({
      modalOpen: false
    });
  };
  public updateFollow = (cache, { data: { followUser } }) => {
    const { userId } = this.state;

    // HOW CAN I GET A USERNAME ?????? //

    const {
      match: {
        params: { username }
      }
    } = this.props;

    // ******************************* //

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

export default withRouter(CoffeeDetailContainer);
