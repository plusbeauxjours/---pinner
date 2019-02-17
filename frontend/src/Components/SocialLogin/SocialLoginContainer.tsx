import React from "react";
import SocialLoginPresenter from "./SocialLoginPresenter";
import { Mutation, MutationFn } from "react-apollo";
import { FacebookConnect, FacebookConnectVariables } from "../../types/api";
import { FACEBOOK_CONNECT } from "./SocialLoginQueries";
import { toast } from "react-toastify";
import { LOG_USER_IN } from "../../sharedQueries.local";

class FacebookConnectMutaion extends Mutation<
  FacebookConnect,
  FacebookConnectVariables
> {}

interface IState {
  name: string;
  firstName: string;
  lastName: string;
  email?: string;
  gender: string;
  fbId: string;
}

class SocialLoginContainer extends React.Component<any, IState> {
  public state = {
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    fbId: ""
  };
  public facebookMutation: MutationFn;
  public render() {
    return (
      <Mutation mutation={LOG_USER_IN}>
        {logUserIn => (
          <FacebookConnectMutaion
            mutation={FACEBOOK_CONNECT}
            onCompleted={data => {
              const { facebookConnect } = data;
              if (facebookConnect) {
                logUserIn({
                  variables: {
                    token: facebookConnect.token
                  }
                });
              } else {
                toast.error("Could not log you in 😔");
              }
            }}
          >
            {facebookMutation => {
              this.facebookMutation = facebookMutation;
              return (
                <SocialLoginPresenter loginCallback={this.loginCallback} />
              );
            }}
          </FacebookConnectMutaion>
        )}
      </Mutation>
    );
  }
  public loginCallback = response => {
    const {
      name,
      first_name,
      last_name,
      email,
      gender,
      id,
      accessToken
    } = response;
    if (accessToken) {
      toast.success(`Welcom ${name}!`);
      this.facebookMutation({
        variables: {
          username: name,
          firstName: first_name,
          lastName: last_name,
          email,
          gender,
          fbId: id
        }
      });
    } else {
      toast.error("Could not log you in 😔");
    }
  };
}

export default SocialLoginContainer;
