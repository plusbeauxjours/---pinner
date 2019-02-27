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

class PhoneSignInMutation extends Mutation<
  StartPhoneVerification,
  StartPhoneVerificationVariables
> {}

interface IState {
  countryCode: string;
  phoneNumber: string;
  isSubmitted: boolean;
}

class PhoneLoginContainer extends React.Component<
  RouteComponentProps<any>,
  IState
> {
  public phoneMutation: MutationFn;
  public state = {
    countryCode: "+66",
    phoneNumber: "",
    isSubmitted: false
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
              back={this.back}
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
    const { countryCode, phoneNumber, isSubmitted } = this.state;
    const phone = `${countryCode}${phoneNumber}`;
    const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(phone);
    if (isValid) {
      if (!isSubmitted) {
        this.phoneMutation();
        this.setState({
          isSubmitted: true
        });
      }
    } else {
      toast.error("Please write a valid phone number");
    }
  };
  public back = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };
}

export default PhoneLoginContainer;
