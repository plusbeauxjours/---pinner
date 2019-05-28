import React from "react";
import { withRouter } from "react-router-dom";
import HeaderPresenter from "./HeaderPresenter";
import { reverseGeoCode } from "../../mapHelpers";
import {
  Feed,
  FeedVariables,
  ReportLocation,
  ReportLocationVariables
} from "../../types/api";
import { Mutation, MutationFn, Query } from "react-apollo";
import { REPORT_LOCATION } from "../../Routes/Home/HomeQueries";
import { GET_FEED } from "./HeaderQueries";

class FeedQuery extends Query<Feed, FeedVariables> {}
class ReportLocationMutation extends Mutation<
  ReportLocation,
  ReportLocationVariables
> {}

interface IState {
  currentLat: number;
  currentLng: number;
  currentCity: string;
  currentCountryCode: string;
  modalOpen: boolean;
  search: string;
}

class HeaderContainer extends React.Component<any, IState> {
  public ReportLocationFn: MutationFn;
  constructor(props) {
    super(props);
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
    this.state = {
      currentLat: 0,
      currentLng: 0,
      currentCity: null,
      currentCountryCode: null,
      modalOpen: false,
      search: ""
    };
    console.log(this.state);
  }
  public componentDidUpdate(prevProps) {
    console.log("update");
    const newProps = this.props;
    if (
      prevProps.match !== newProps.match ||
      !localStorage.getItem("cityName")
    ) {
      navigator.geolocation.getCurrentPosition(
        this.handleGeoSuccess,
        this.handleGeoError
      );
    }
  }
  public componentDidMount() {
    const location = localStorage.getItem("cityName");
    console.log("mount");
    console.log(location);
    if (!location) {
      navigator.geolocation.getCurrentPosition(
        this.handleGeoSuccess,
        this.handleGeoError
      );
    }
  }
  public render() {
    const {
      currentLat,
      currentLng,
      currentCity,
      currentCountryCode,
      modalOpen,
      search
    } = this.state;
    return (
      <ReportLocationMutation mutation={REPORT_LOCATION}>
        {ReportLocationFn => {
          this.ReportLocationFn = ReportLocationFn;
          return (
            <FeedQuery
              query={GET_FEED}
              variables={{
                cityName: currentCity || localStorage.getItem("cityName")
              }}
            >
              {({ data }) => {
                return (
                  <HeaderPresenter
                    data={data}
                    currentLat={currentLat}
                    currentLng={currentLng}
                    currentCity={currentCity}
                    currentCountryCode={currentCountryCode}
                    modalOpen={modalOpen}
                    search={search}
                    toggleModal={this.toggleModal}
                    onChange={this.onChange}
                  />
                );
              }}
            </FeedQuery>
          );
        }}
      </ReportLocationMutation>
    );
  }
  public toggleModal = () => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen,
      search: ""
    } as any);
    console.log(this.state);
  };
  public handleGeoSuccess = (position: Position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    this.setState({
      currentLat: latitude,
      currentLng: longitude
    });
    this.getAddress(latitude, longitude);
  };
  public getAddress = async (latitude: number, longitude: number) => {
    const address = await reverseGeoCode(latitude, longitude);
    if (address) {
      this.setState({
        currentCity: address.storableLocation.city,
        currentCountryCode: address.storableLocation.countryCode
      });
      localStorage.setItem("cityName", address.storableLocation.city);
      this.reportLocation(
        latitude,
        longitude,
        address.storableLocation.city,
        address.storableLocation.countryCode
      );
    }
  };
  public reportLocation = async (
    latitude: number,
    longitude: number,
    currentCity: string,
    currentCountryCode: string
  ) => {
    try {
      this.ReportLocationFn({
        variables: {
          currentLat: latitude,
          currentLng: longitude,
          currentCity,
          currentCountryCode
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  public handleGeoError = () => {
    console.log("No location");
  };
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    console.log(value);
    this.setState({
      search: value
    } as any);
  };
}

export default withRouter(HeaderContainer);
