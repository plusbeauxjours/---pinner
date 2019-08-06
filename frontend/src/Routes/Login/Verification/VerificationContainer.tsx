import React from "react";
import VerificationPresenter from "./VerificationPresenter";
import { RouteComponentProps } from "react-router";
import { Mutation, MutationFn } from "react-apollo";
import {
  CompletePhoneVerification,
  CompletePhoneVerificationVariables,
  CompleteEmailVerification,
  CompleteEmailVerificationVariables
} from "../../../types/api";
import {
  COMPLETE_PHONE_SIGN_IN,
  COMPLETE_EMAIL_SIGN_IN
} from "./VerificationQueries";
import { toast } from "react-toastify";
import { LOG_USER_IN } from "../../../sharedQueries.local";
import { reverseGeoCode } from "../../../mapHelpers";
import Loader from "src/Components/Loader";

class CompletePhoneVerificationMutation extends Mutation<
  CompletePhoneVerification,
  CompletePhoneVerificationVariables
> {}
class CompleteEmailVerificationMutation extends Mutation<
  CompleteEmailVerification,
  CompleteEmailVerificationVariables
> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  latitude: number;
  longitude: number;
  cityId: string;
  cityName: string;
  countryPhoneNumber: string;
  countryPhoneCode: string;
  phoneNumber: string;
  verificationKey: string;
}

class VerificationContainer extends React.Component<IProps, IState> {
  public logUserIn: MutationFn;
  public verifyEmailFn: MutationFn;
  constructor(props: IProps) {
    super(props);
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
    const { location: { state = {} } = {} } = ({} = props);
    // if (!props.location.state) {
    //   props.history.push("/");
    // }
    this.state = {
      latitude: state.latitude,
      longitude: state.longitude,
      cityId: state.cityId,
      cityName: state.cityName,
      countryPhoneNumber: state.countryPhoneNumber,
      countryPhoneCode: state.countryPhoneCode,
      phoneNumber: state.phoneNumber,
      verificationKey: ""
    };
  }
  public componentDidMount() {
    if (!localStorage.getItem("cityId")) {
      navigator.geolocation.getCurrentPosition(
        this.handleGeoSuccess,
        this.handleGeoError
      );
    }
  }
  public render() {
    const {
      match: {
        params: { key = null }
      }
    } = this.props;
    console.log(key);
    console.log(this.state);
    if (!key) {
      const {
        countryPhoneNumber,
        countryPhoneCode,
        phoneNumber,
        verificationKey,
        cityId
      } = this.state;
      return (
        <Mutation mutation={LOG_USER_IN}>
          {logUserIn => {
            this.logUserIn = logUserIn;
            return (
              <CompletePhoneVerificationMutation
                mutation={COMPLETE_PHONE_SIGN_IN}
                variables={{
                  key: verificationKey,
                  countryPhoneNumber,
                  countryPhoneCode,
                  phoneNumber: phoneNumber.startsWith("0")
                    ? phoneNumber.substring(1)
                    : phoneNumber,
                  cityId
                }}
                onCompleted={this.onCompletedCompletePhoneVerification}
              >
                {(mutation, { loading }) => (
                  <VerificationPresenter
                    onSubmit={mutation}
                    verificationKey={verificationKey}
                    loading={loading}
                    back={this.back}
                    onChange={this.onChange}
                  />
                )}
              </CompletePhoneVerificationMutation>
            );
          }}
        </Mutation>
      );
    } else if (key && this.state.cityId) {
      const { cityId } = this.state;
      return (
        <Mutation mutation={LOG_USER_IN}>
          {logUserIn => {
            this.logUserIn = logUserIn;
            return (
              <CompleteEmailVerificationMutation
                mutation={COMPLETE_EMAIL_SIGN_IN}
                variables={{ key, cityId }}
                onCompleted={this.onCompletedCompleteEmailVerification}
              >
                {verifyEmailFn => {
                  this.verifyEmailFn = verifyEmailFn;
                  return <Loader />;
                }}
              </CompleteEmailVerificationMutation>
            );
          }}
        </Mutation>
      );
    } else {
      return <Loader />;
    }
  }
  public onCompletedCompletePhoneVerification = data => {
    const { history } = this.props;
    const { completePhoneVerification } = data;
    if (completePhoneVerification.ok) {
      if (completePhoneVerification.token) {
        this.logUserIn({
          variables: {
            token: completePhoneVerification.token
          }
        });
      }
      toast.success("You're verified, loggin in now");
      history.push({
        pathname: "/"
      });
    } else {
      toast.error("Could not be Verified you");
    }
  };
  public onCompletedCompleteEmailVerification = data => {
    const { history } = this.props;
    const { completeEmailVerification } = data;
    if (completeEmailVerification.ok) {
      if (completeEmailVerification.token) {
        this.logUserIn({
          variables: {
            token: completeEmailVerification.token
          }
        });
      }
      toast.success("You're verified, loggin in now");
      history.push({
        pathname: "/"
      });
    } else {
      toast.error("Could not be Verified you");
    }
  };
  public onChange = value => {
    console.log(value);
    this.setState({
      verificationKey: value
    } as any);
  };
  public back = async event => {
    await event.stopPropagation();
    this.props.history.goBack();
  };
  public handleGeoSuccess = (position: Position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    this.getAddress(latitude, longitude);
  };
  public getAddress = async (latitude: number, longitude: number) => {
    const address = await reverseGeoCode(latitude, longitude);
    if (address) {
      this.setState({
        cityId: address.storableLocation.cityId
      });
      this.verifyEmailFn();
    }
  };
  public handleGeoError = () => {
    console.log("No location");
  };
}

export default VerificationContainer;
