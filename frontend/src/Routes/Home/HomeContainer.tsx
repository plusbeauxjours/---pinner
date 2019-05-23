import React from "react";
import HomePresenter from "./HomePresenter";
import { reverseGeoCode } from "../../mapHelpers";
import { countries } from "../../countryData";
import { RouteComponentProps } from "react-router";

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
    const { location: { state = {} } = {} } = ({} = props);
    this.state = {
      isLogIn: true,
      modalOpen: false,
      countryCode: state.countryCode,
      countryPhone: state.countryPhone,
      verificationModalOpen: false
    };
  }
  public componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
    console.log(this.state);
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
    this.getAddress(latitude, longitude);
  };
  public getAddress = async (latitude: number, longitude: number) => {
    const address = await reverseGeoCode(latitude, longitude);
    if (address) {
      const country = countries.find(
        i => i.code === address.storableLocation.countryCode
      );
      this.setState({
        countryCode: address.storableLocation.countryCode,
        countryPhone: country.phone
      });
      localStorage.setItem("cityName", address.storableLocation.city);
    }
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

export default HomeContainer;
