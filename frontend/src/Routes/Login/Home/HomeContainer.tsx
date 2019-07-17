import React from "react";
import HomePresenter from "./HomePresenter";
import { reverseGeoCode } from "../../../mapHelpers";
import { countries } from "../../../countryData";
import { RouteComponentProps, withRouter } from "react-router";

interface IProps extends RouteComponentProps<any> {}

interface IState {
  isLogIn: boolean;
  modalOpen: boolean;
  countryCode: string;
  countryPhone: string;
  verificationModalOpen: boolean;
}

class HomeContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
    this.state = {
      isLogIn: true,
      modalOpen: false,
      countryCode: localStorage.getItem("countryCode"),
      countryPhone: countries.find(
        i => i.code === localStorage.getItem("countryCode")
      ).phone,
      verificationModalOpen: false
    };
  }
  public componentDidMount() {
    const countryCode = localStorage.getItem("countryCode");
    if (!countryCode) {
      console.log("WORKING");
      navigator.geolocation.getCurrentPosition(
        this.handleGeoSuccess,
        this.handleGeoError
      );
    }
  }
  public render() {
    const {
      isLogIn,
      modalOpen,
      verificationModalOpen,
      countryCode,
      countryPhone
    } = this.state;
    return (
      <HomePresenter
        isLogIn={isLogIn}
        modalOpen={modalOpen}
        verificationModalOpen={verificationModalOpen}
        countryCode={countryCode}
        countryPhone={countryPhone}
        changeMode={this.changeMode}
        toggleModal={this.toggleModal}
        toggleVerificationModal={this.toggleVerificationModal}
      />
    );
  }
  public handleGeoSuccess = (position: Position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    console.log("who am i");
    this.getAddress(latitude, longitude);
  };
  public getAddress = async (latitude: number, longitude: number) => {
    const address = await reverseGeoCode(latitude, longitude);
    if (address) {
      this.setState({
        countryCode: address.storableLocation.countryCode,
        countryPhone: countries.find(
          i => i.code === address.storableLocation.countryCode
        ).phone
      });
      localStorage.setItem("cityId", address.storableLocation.cityId);
      localStorage.setItem("countryCode", address.storableLocation.countryCode);
    }
    return {
      countryCode: address.storableLocation.countryCode,
      countryPhone: countries.find(
        i => i.code === address.storableLocation.countryCode
      ).phone
    };
  };
  public handleGeoError = () => {
    console.log("No location");
  };
  public toggleModal = () => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen
    });
  };
  public toggleVerificationModal = () => {
    const { verificationModalOpen } = this.state;
    this.setState({
      verificationModalOpen: !verificationModalOpen
    });
    console.log(this.state);
  };
  public changeMode = () => {
    this.setState(state => {
      return {
        isLogIn: !state.isLogIn
      };
    });
  };
}

export default withRouter(HomeContainer);
