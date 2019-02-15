import React from "react";
import SocialLoginPresenter from "./SocialLoginPresenter";
import { Mutation, MutationFn } from "react-apollo";
import { SIGN_UP } from "./SocialLoginQueries";
import { toast } from "react-toastify";
import { LOG_USER_IN } from "../../sharedQueries.local";
import { facebookConnect, facebookConnectVariables } from "../../types/api";

class LoginMutaion extends Mutation<
  facebookConnect,
  facebookConnectVariables
> {}

interface IState {
  firstName: string;
  lastName: string;
  email: string;
  fbId: string;
  password: string;
}

class SocialLoginContainer extends React.Component<any, IState> {
  public state = {
    firstName: "",
    lastName: "",
    email: "",
    fbId: "",
    password: "",
    avatar: ""
  };
  public facebookMutation: MutationFn;
  public render() {
    return (
      <Mutation mutation={LOG_USER_IN}>
        {logUserIn => (
          <LoginMutaion
            mutation={SIGN_UP}
            onCompleted={data => {
              const { createAccount } = data;
              if (createAccount.ok) {
                logUserIn({
                  variables: {
                    token: createAccount.token
                  }
                });
              } else {
                toast.error(createAccount.error);
              }
            }}
          >
            {(facebookMutation, { loading }) => {
              this.facebookMutation = facebookMutation;
              return (
                <SocialLoginPresenter loginCallback={this.loginCallback} />
              );
            }}
          </LoginMutaion>
        )}
      </Mutation>
    );
  }
  public loginCallback = response => {
    const {
      email,
      id,
      first_name,
      last_name,
      name,
      password,
      accessToken
    } = response;
    if (accessToken) {
      toast.success(`Welcom ${name}!`);
      this.facebookMutation({
        variables: {
          email,
          fbId: id,
          firstName: first_name,
          lastName: last_name,
          password
        }
      });
    } else {
      toast.error("Could not log you in 😔");
    }
  };
}

export default SocialLoginContainer;
