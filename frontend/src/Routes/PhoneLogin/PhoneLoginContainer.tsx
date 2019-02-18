import React from "react";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import { PHONE_SIGN_IN } from "./PhoneLoginQueries";
import { Mutation, MutationFn } from "react-apollo";
import {
  StartPhoneVerification,
  StartPhoneVerificationVariables
} from "../../types/api";

interface IState {
  countryCode: string;
  phoneNumber: string;
}

class PhoneSignInMutation extends Mutation<
  StartPhoneVerification,
  StartPhoneVerificationVariables
> {}

class PhoneLoginContainer extends React.Component<
  RouteComponentProps<any>,
  IState
> {
  public phoneMutation: MutationFn;
  public state = {
    countryCode: "+66",
    phoneNumber: ""
  };

  public render() {
    const { history } = this.props;
    const { countryCode, phoneNumber } = this.state;
    return (
      <PhoneSignInMutation
        mutation={PHONE_SIGN_IN}
        variables={{
          phoneNumber: `${countryCode}${phoneNumber}`
        }}
        onCompleted={data => {
          const { startPhoneVerification } = data;
          const phone = `${countryCode}${phoneNumber}`;
          // tslint:disable-next-line
          console.log(startPhoneVerification);
          if (startPhoneVerification.ok) {
            toast.success("SMS Sent! Redirectiong you...");
            setTimeout(() => {
              history.push({
                pathname: "/verify-phone",
                state: {
                  phone
                }
              });
            }, 500);
          } else {
            toast.error("Could not send you a Key");
          }
        }}
      >
        {(phoneMutation, { loading }) => {
          this.phoneMutation = phoneMutation;
          return (
            <PhoneLoginPresenter
              countryCode={countryCode}
              phoneNumber={phoneNumber}
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
              loading={loading}
            />
          );
        }}
      </PhoneSignInMutation>
    );
  }

  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };
  public onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    const { countryCode, phoneNumber } = this.state;
    const phone = `${countryCode}${phoneNumber}`;
    const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(phone);
    if (isValid) {
      this.phoneMutation();
    } else {
      toast.error("Please write a valid phone number");
    }
  };
}

export default PhoneLoginContainer;
