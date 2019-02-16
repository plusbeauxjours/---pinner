import React from "react";
import ProfilePresenter from "./ProfilePresenter";
import { Query, Mutation } from "react-apollo";
import { userProfile, userProfileVariables } from "src/types/api";
import { GET_USER } from "./ProfileQueries";
import { withRouter, RouteComponentProps } from "react-router";
import { LOG_USER_OUT } from "src/sharedQueries.local";

class ProfileQuery extends Query<userProfile, userProfileVariables> {}
class LogOutMutation extends Mutation {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  modalOpen: boolean;
}

class ProfileContainer extends React.Component<IProps, IState> {
  public state = {
    modalOpen: false
  };
  public render() {
    const {
      match: {
        params: { username }
      }
    } = this.props;
    const { modalOpen } = this.state;
    return (
      <LogOutMutation mutation={LOG_USER_OUT}>
        {logUserOutFn => (
          <ProfileQuery
            query={GET_USER}
            variables={{ username }}
            fetchPolicy="network-only"
          >
            {({ data, loading }) => (
              <ProfilePresenter
                logUserOutFn={logUserOutFn}
                toggleModal={this.toggleModal}
                loading={loading}
                data={data}
                modalOpen={modalOpen}
              />
            )}
          </ProfileQuery>
        )}
      </LogOutMutation>
    );
  }
  public toggleModal = () => {
    this.setState(state => {
      return {
        modalOpen: !state.modalOpen
      };
    });
  };
}

export default withRouter(ProfileContainer);
