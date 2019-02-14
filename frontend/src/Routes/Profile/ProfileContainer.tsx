import React from "react";
import ProfilePresenter from "./ProfilePresenter";
import { Query } from "react-apollo";
import { userProfile, userProfileVariables } from "src/types/api";
import { GET_USER } from "./ProfileQueries";
import { withRouter, RouteComponentProps } from "react-router";

class ProfileQuery extends Query<userProfile, userProfileVariables> {}

interface IProps extends RouteComponentProps<any> {}

class ProfileContainer extends React.Component<IProps> {
  public render() {
    const {
      match: {
        params: { username }
      }
    } = this.props;
    return (
      <ProfileQuery query={GET_USER} variables={{ username }}>
        {({ data, loading }) => (
          <ProfilePresenter loading={loading} data={data} />
        )}
      </ProfileQuery>
    );
  }
}

export default withRouter(ProfileContainer);
