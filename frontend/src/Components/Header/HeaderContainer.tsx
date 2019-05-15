import React from "react";
import { withRouter } from "react-router-dom";
import HeaderPresenter from "./HeaderPresenter";
import { reverseGeoCode } from "../../mapHelpers";
import {
  cityThumbnail,
  countryThumbnail,
  continentThumbnail
} from "../../locationThumbnail";
import continents from "../../continents";
import { ReportLocation, ReportLocationVariables } from "../../types/api";
import { Mutation, MutationFn } from "react-apollo";
import { REPORT_LOCATION } from "../../Routes/Home/HomeQueries";

class ReportLocationMutation extends Mutation<
  ReportLocation,
  ReportLocationVariables
> {}

interface IState {
  search: string;
  currentLat: number;
  currentLng: number;
  currentCity: string;
}

class HeaderContainer extends React.Component<any, IState> {
  public ReportLocationFn: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      currentLat: 0,
      currentLng: 0,
      currentCity: null
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match !== newProps.match) {
      const location = localStorage.getItem("cityName");
      if (!location) {
        navigator.geolocation.getCurrentPosition(
          this.handleGeoSuccess,
          this.handleGeoError
        );
      }
    }
  }
  public componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
  }
  public render() {
    const { currentLat, currentLng, currentCity } = this.state;
    const { search } = this.props;
    return (
      <ReportLocationMutation mutation={REPORT_LOCATION}>
        {ReportLocationFn => {
          this.ReportLocationFn = ReportLocationFn;
          return (
            <HeaderPresenter
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              search={search}
              currentLat={currentLat}
              currentLng={currentLng}
              currentCity={currentCity}
            />
          );
        }}
      </ReportLocationMutation>
    );
  }
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
        currentCity: address.storableLocation.city
      });
      localStorage.setItem("cityName", address.storableLocation.city);
      this.reportLocation(
        latitude,
        longitude,
        address.storableLocation.city,
        address.storableLocation.country,
        address.storableLocation.countryCode
      );
    }
  };
  public reportLocation = async (
    latitude: number,
    longitude: number,
    currentCity: string,
    currentCountry: string,
    currentCountryCode: string
  ) => {
    const cityPhotoURL = await cityThumbnail(currentCity);
    const countryPhotoURL = await countryThumbnail(currentCountry);
    const currentContinent = await continents[currentCountryCode];
    const continentPhotoURL = await continentThumbnail(currentContinent);
    this.ReportLocationFn({
      variables: {
        currentLat: latitude,
        currentLng: longitude,
        currentCity,
        currentCountry,
        currentCountryCode,
        currentContinent,
        cityPhotoURL,
        countryPhotoURL,
        continentPhotoURL
      }
    });
  };
  public handleGeoError = () => {
    console.log("No location");
  };
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    // autocompleteSearch(value);
    console.log(value);
    this.setState({
      search: value
    } as any);
  };
  public onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    const { history } = this.props;
    const { search } = this.state;
    event.preventDefault();
    history.push({
      pathname: "/search",
      search: `?term=${search}`
    });
  };
}

export default withRouter(HeaderContainer);
