import React from "react";
import SocialLoginPresenter from "./SocialLoginPresenter";
import { Mutation, MutationFn } from "react-apollo";
import { FacebookConnect, FacebookConnectVariables } from "../../types/api";
import { FACEBOOK_CONNECT } from "./SocialLoginQueries";
import { toast } from "react-toastify";
import { LOG_USER_IN } from "../../sharedQueries.local";
import { reverseGeoCode } from "../../mapHelpers";

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
  latitude: number;
  longitude: number;
  cityId: string;
  cityName: string;
  countryCode: string;
}

class SocialLoginContainer extends React.Component<any, IState> {
  public facebookConnectFn: MutationFn;
  public ReportLocationFn: MutationFn;
  constructor(props) {
    super(props);
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
    this.state = {
      name: "",
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      fbId: "",
      latitude: 0,
      longitude: 0,
      cityId: "",
      cityName: "",
      countryCode: ""
    };
  }
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
            {facebookConnectFn => {
              this.facebookConnectFn = facebookConnectFn;
              return (
                <SocialLoginPresenter loginCallback={this.loginCallback} />
              );
            }}
          </FacebookConnectMutaion>
        )}
      </Mutation>
    );
  }
  public handleGeoSuccess = (position: Position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    this.getAddress(latitude, longitude);
  };
  public getAddress = async (latitude: number, longitude: number) => {
    const address = await reverseGeoCode(latitude, longitude);
    if (address) {
      localStorage.setItem("cityId", address.storableLocation.cityId);
      localStorage.setItem("countryCode", address.storableLocation.countryCode);
      await this.setState({
        latitude,
        longitude,
        cityId: address.storableLocation.cityId,
        cityName: address.storableLocation.cityName,
        countryCode: address.storableLocation.countryCode
      });
    }
  };
  public handleGeoError = () => {
    console.log("No location");
  };
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    console.log("onChange");
    const {
      target: { value }
    } = event;
    this.setState({
      search: value
    } as any);
  };
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
    const { latitude, longitude, cityId, cityName, countryCode } = this.state;
    if (accessToken) {
      toast.success(`Welcom ${name}!`);
      this.facebookConnectFn({
        variables: {
          username: name,
          firstName: first_name,
          lastName: last_name,
          email,
          gender,
          latitude,
          longitude,
          cityId,
          cityName,
          countryCode,
          fbId: id
        }
      });
    } else {
      toast.error("Could not log you in 😔");
    }
  };
}

export default SocialLoginContainer;
