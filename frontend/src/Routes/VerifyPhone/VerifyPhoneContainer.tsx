import React from "react";
import VerifyPhonePresenter from "./VerifyPhonePresenter";
import { RouteComponentProps } from "react-router";
import { Mutation } from "react-apollo";
import {
  CompletePhoneVerification,
  CompletePhoneVerificationVariables
} from "../../types/api";
import { COMPLETE_PHONE_SIGN_IN } from "./VerifyPhoneQueries";
import { toast } from "react-toastify";
import { LOG_USER_IN } from "../../sharedQueries.local";

class VerifyMuataion extends Mutation<
  CompletePhoneVerification,
  CompletePhoneVerificationVariables
> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  verificationKey: string;
  phoneNumber: string;
  focused: boolean;
}

const CODE_LENGTH = new Array(6).fill(0);

class VerifyPhoneContainer extends React.Component<IProps, IState> {
  public inputRef: React.RefObject<HTMLInputElement>;
  constructor(props: IProps) {
    super(props);
    this.inputRef = React.createRef();
    const { location: { state = {} } = {} } = ({} = props);
    console.log(this.inputRef);
    console.log(this.state);
    if (!props.location.state) {
      props.history.push("/");
    }
    this.state = {
      phoneNumber: state.phone,
      verificationKey: "",
      focused: false
    };
  }
  public render() {
    const { history } = this.props;
    const { phoneNumber, verificationKey, focused } = this.state;
    const verificationKeys = verificationKey.split("");
    const selectedIndex =
      verificationKeys.length < CODE_LENGTH.length
        ? verificationKeys.length
        : CODE_LENGTH.length - 1;
    const hideInput = !(verificationKeys.length < CODE_LENGTH.length);
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
                CODE_LENGTH={CODE_LENGTH}
                onSubmit={mutation}
                verificationKey={verificationKey}
                loading={loading}
                back={this.back}
                focused={focused}
                selectedIndex={selectedIndex}
                hideInput={hideInput}
                inputRef={this.inputRef}
                onChange={this.onChange}
                onClick={this.onClick}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onKeyUp={this.onKeyUp}
              />
            )}
          </VerifyMuataion>
        )}
      </Mutation>
    );
  }
  public onClick = () => {
    this.inputRef.current.focus();
  };
  public onFocus = () => {
    this.setState({ focused: true });
  };
  public onBlur = () => {
    this.setState({
      focused: false
    });
  };
  public onKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { keyCode } = event;
    const { verificationKey } = this.state;
    if (keyCode === 8) {
      this.setState({
        verificationKey: verificationKey.slice(0, verificationKey.length - 1)
      });
    }
  };
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    this.setState(state => {
      if (state.verificationKey.length >= CODE_LENGTH.length) {
        return null;
      }
      return {
        verificationKey: (state.verificationKey + value).slice(
          0,
          CODE_LENGTH.length
        )
      };
    });
  };
  public back = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };
}

export default VerifyPhoneContainer;
