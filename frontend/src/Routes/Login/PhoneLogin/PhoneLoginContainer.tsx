import React from "react";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import { PHONE_SIGN_IN } from "./PhoneLoginQueries";
import { Mutation, MutationFn } from "react-apollo";
import { countries } from "../../../countryData";
import {
  StartPhoneVerification,
  StartPhoneVerificationVariables
} from "../../../types/api";

class PhoneSignInMutation extends Mutation<
  StartPhoneVerification,
  StartPhoneVerificationVariables
> {}

interface IState {
  latitude: number;
  longitude: number;
  cityId: string;
  cityName: string;
  countryCode: string;
  countryPhoneCode: string;
  countryPhoneNumber: string;
  phoneNumber: string;
  isSubmitted: boolean;
  modalOpen: boolean;
}

class PhoneLoginContainer extends React.Component<
  RouteComponentProps<any>,
  IState
> {
  public phoneSignInFn: MutationFn;
  constructor(props) {
    super(props);
    const { location: { state = {} } = {} } = ({} = props);
    if (!props.location.state) {
      props.history.push("/");
    }
    this.state = {
      latitude: state.latitude,
      longitude: state.longitude,
      cityId: state.cityId,
      cityName: state.cityName,
      countryCode: state.countryCode || localStorage.getItem("countryCode"),
      countryPhoneCode: state.countryCode || "",
      countryPhoneNumber:
        state.countryPhone ||
        countries.find(i => i.code === localStorage.getItem("countryCode"))
          .phone,
      phoneNumber: "",
      isSubmitted: false,
      modalOpen: false
    };
  }
  public componentDidMount() {
    console.log(this.state);
  }
  public render() {
    const { history } = this.props;
    const {
      latitude,
      longitude,
      cityId,
      cityName,
      countryCode,
      phoneNumber,
      countryPhoneCode,
      countryPhoneNumber,
      modalOpen
    } = this.state;
    return (
      <PhoneSignInMutation
        mutation={PHONE_SIGN_IN}
        variables={{
          phoneNumber: `${countryPhoneNumber}${phoneNumber}`
        }}
        onCompleted={data => {
          const { startPhoneVerification } = data;
          if (startPhoneVerification.ok) {
            toast.success("SMS Sent! Redirectiong you...");
            history.push({
              pathname: "/verify-phone",
              state: {
                latitude,
                longitude,
                cityId,
                cityName,
                countryCode,
                phoneNumber,
                countryPhoneCode,
                countryPhoneNumber
              }
            });
          } else {
            toast.error("Could not send you a Key");
          }
        }}
      >
        {(phoneSignInFn, { loading }) => {
          this.phoneSignInFn = phoneSignInFn;
          return (
            <PhoneLoginPresenter
              countryCode={countryCode}
              phoneNumber={phoneNumber}
              countryPhoneNumber={countryPhoneNumber}
              modalOpen={modalOpen}
              loading={loading}
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
              back={this.back}
              toggleModal={this.toggleModal}
              onSelectCountry={this.onSelectCountry}
            />
          );
        }}
      </PhoneSignInMutation>
    );
  }
  public onSelectCountry = (
    countryPhoneCode: string,
    countryPhoneNumber: string
  ) => {
    this.setState({
      countryPhoneCode,
      countryPhoneNumber,
      modalOpen: false
    });
  };
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
    const { countryPhoneNumber, phoneNumber, isSubmitted } = this.state;
    const phone = `${countryPhoneNumber}${phoneNumber}`;
    console.log(phone);
    const isValid = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(phone);
    if (isValid) {
      if (!isSubmitted) {
        this.phoneSignInFn();
        this.setState({
          isSubmitted: true
        });
      }
    } else {
      toast.error("Please write a valid phone number");
    }
  };
  public back = async event => {
    await event.stopPropagation();
    this.props.history.goBack();
  };
}

export default PhoneLoginContainer;
