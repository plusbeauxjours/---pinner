import React from "react";
import CoffeeDetailPresenter from "./CoffeeDetailPresenter";
import { Query, Mutation, MutationFn } from "react-apollo";
import {
  FollowUser,
  FollowUserVariables,
  CoffeeDetail,
  CoffeeDetailVariables
} from "../../../types/api";
import { COFFEE_DETAIL } from "./CoffeeDetailQueries";
import { withRouter, RouteComponentProps } from "react-router";
import { FOLLOW_USER } from "../../../Components/FollowBtn/FollowBtnQueries";

class CoffeeDetailQuery extends Query<CoffeeDetail, CoffeeDetailVariables> {}
class FollowMutation extends Mutation<FollowUser, FollowUserVariables> {}

interface IProps extends RouteComponentProps<any> {
  isFollowing?: boolean;
}

interface IState {
  modalOpen: boolean;
  isFollowing?: boolean;
}
class CoffeeDetailContainer extends React.Component<IProps, IState> {
  public followUserFn: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      isFollowing: props.isFollowing
    };
  }
  public render() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const { modalOpen, isFollowing } = this.state;

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
                />
              )}
            </CoffeeDetailQuery>
          );
        }}
      </FollowMutation>
    );
  }
  public followUser = (userId: string) => {
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
}

export default withRouter(CoffeeDetailContainer);
