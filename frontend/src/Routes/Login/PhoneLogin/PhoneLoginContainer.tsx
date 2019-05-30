import React from "react";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import { PHONE_SIGN_IN } from "./PhoneLoginQueries";
import { Mutation, MutationFn } from "react-apollo";
import {
  StartPhoneVerification,
  StartPhoneVerificationVariables
} from "../../../types/api";

class PhoneSignInMutation extends Mutation<
  StartPhoneVerification,
  StartPhoneVerificationVariables
> {}

interface IState {
  countryCode: string;
  countryPhone: string;
  phoneNumber: string;
  isSubmitted: boolean;
  modalOpen: boolean;
  search: string;
}

class PhoneLoginContainer extends React.Component<
  RouteComponentProps<any>,
  IState
> {
  public phoneMutation: MutationFn;
  constructor(props) {
    super(props);
    const { location: { state = {} } = {} } = ({} = props);
    if (!props.location.state) {
      props.history.push("/");
    }
    this.state = {
      countryCode: state.countryCode,
      countryPhone: state.countryPhone,
      phoneNumber: null,
      isSubmitted: false,
      modalOpen: false,
      search: null
    };
  }
  public componentDidMount() {
    console.log(this.state);
  }
  public render() {
    const { history } = this.props;
    const {
      countryCode,
      phoneNumber,
      countryPhone,
      modalOpen,
      search
    } = this.state;
    return (
      <PhoneSignInMutation
        mutation={PHONE_SIGN_IN}
        variables={{
          phoneNumber: `${countryPhone}${phoneNumber}`
        }}
        onCompleted={data => {
          const { startPhoneVerification } = data;
          const phone = `${countryPhone}${phoneNumber}`;
          if (startPhoneVerification.ok) {
            toast.success("SMS Sent! Redirectiong you...");
            history.push({
              pathname: "/verify-phone",
              state: {
                phone
              }
            });
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
              countryPhone={countryPhone}
              modalOpen={modalOpen}
              search={search}
              loading={loading}
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
              back={this.back}
              toggleModal={this.toggleModal}
            />
          );
        }}
      </PhoneSignInMutation>
    );
  }
  public toggleModal = () => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen
    });
  };
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
    const { countryPhone, phoneNumber, isSubmitted } = this.state;
    const phone = `${countryPhone}${phoneNumber}`;
    console.log(phone);
    const isValid = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(phone);
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
