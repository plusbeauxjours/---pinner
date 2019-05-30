import React from "react";
import VerifyPhonePresenter from "./VerifyPhonePresenter";
import { RouteComponentProps } from "react-router";
import { Mutation } from "react-apollo";
import {
  CompletePhoneVerification,
  CompletePhoneVerificationVariables
} from "../../../types/api";
import { COMPLETE_PHONE_SIGN_IN } from "./VerifyPhoneQueries";
import { toast } from "react-toastify";
import { LOG_USER_IN } from "../../../sharedQueries.local";

class VerifyMuataion extends Mutation<
  CompletePhoneVerification,
  CompletePhoneVerificationVariables
> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  verificationKey: string;
  phoneNumber: string;
}

class VerifyPhoneContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const { location: { state = {} } = {} } = ({} = props);
    if (!props.location.state) {
      props.history.push("/");
    }
    this.state = {
      phoneNumber: state.phone,
      verificationKey: ""
    };
  }
  public render() {
    const { history } = this.props;
    const { phoneNumber, verificationKey } = this.state;
    return (
      <Mutation mutation={LOG_USER_IN}>
        {logUserIn => (
          <VerifyMuataion
            mutation={COMPLETE_PHONE_SIGN_IN}
            variables={{
              key: verificationKey,
              phoneNumber
            }}
            onCompleted={data => {
              const { completePhoneVerification } = data;
              if (completePhoneVerification.ok) {
                if (completePhoneVerification.token) {
                  logUserIn({
                    variables: {
                      token: completePhoneVerification.token
                    }
                  });
                }
                toast.success("You're verified, loggin in now");
                setTimeout(() => {
                  history.push({
                    pathname: "/"
                  });
                }, 500);
              } else {
                toast.error("Could not be Verified you");
              }
            }}
          >
            {(mutation, { loading }) => (
              <VerifyPhonePresenter
                onSubmit={mutation}
                verificationKey={verificationKey}
                loading={loading}
                back={this.back}
                onChange={this.onChange}
              />
            )}
          </VerifyMuataion>
        )}
      </Mutation>
    );
  }
  public onChange = value => {
    console.log(value);
    this.setState({
      verificationKey: value
    } as any);
  };
  public back = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };
}

export default VerifyPhoneContainer;
