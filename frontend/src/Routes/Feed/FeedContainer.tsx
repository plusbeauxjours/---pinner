import React from "react";
import { Query, Mutation, MutationFn } from "react-apollo";
import FeedPresenter from "./FeedPresenter";
import {
  ReportLocation,
  ReportLocationVariables,
  Feed,
  FeedVariables
} from "../../types/api";
import { RouteComponentProps } from "react-router";
import { REPORT_LOCATION } from "../Home/HomeQueries";
import { reverseGeoCode } from "../../mapHelpers";
import { GET_FEED } from "./FeedQueries";
import {
  cityThumbnail,
  countryThumbnail,
  continentThumbnail
} from "../../locationThumbnail";
import continents from "../../continents";

class ReportLocationMutation extends Mutation<
  ReportLocation,
  ReportLocationVariables
> {}

class FeedQuery extends Query<Feed, FeedVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  page: number;
  nowModalOpen: boolean;
  beforeModalOpen: boolean;
  currentLat: number;
  currentLng: number;
  currentCity: string;
  currentCountry: string;
  currentCountryCode: string;
  currentContinent: string;
  cityPhotoURL: string;
  countryPhotoURL: string;
  continentPhotoURL: string;
}

class FeedContainer extends React.Component<IProps, IState> {
  public ReportLocationFn: MutationFn;
  public state = {
    page: 0,
    nowModalOpen: false,
    beforeModalOpen: false,
    currentLat: 0,
    currentLng: 0,
    currentCity: "",
    currentCountry: "",
    currentCountryCode: "",
    currentContinent: "",
    cityPhotoURL: "",
    countryPhotoURL: "",
    continentPhotoURL: ""
  };
  public componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
    console.log("goodmorning");
  }
  public render() {
    const {
      page,
      nowModalOpen,
      beforeModalOpen,
      currentLat,
      currentLng,
      currentCity,
      currentCountry,
      currentCountryCode,
      currentContinent,
      cityPhotoURL,
      countryPhotoURL,
      continentPhotoURL
    } = this.state;
    return (
      <FeedQuery
        query={GET_FEED}
        variables={{
          page,
          cityName: currentCity
        }}
      >
        {({ data, loading }) => (
          <ReportLocationMutation
            mutation={REPORT_LOCATION}
            variables={{
              currentLat,
              currentLng,
              currentCity,
              currentCountry,
              currentCountryCode,
              currentContinent,
              cityPhotoURL,
              countryPhotoURL,
              continentPhotoURL
            }}
          >
            {ReportLocationFn => {
              this.ReportLocationFn = ReportLocationFn;
              return (
                <FeedPresenter
                  loading={loading}
                  data={data}
                  currentCity={currentCity}
                  nowModalOpen={nowModalOpen}
                  beforeModalOpen={beforeModalOpen}
                  toggleNowModal={this.toggleNowModal}
                  toggleBeforeModal={this.toggleBeforeModal}
                />
              );
            }}
          </ReportLocationMutation>
        )}
      </FeedQuery>
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
  public getAddress = async (lat: number, lng: number) => {
    const address = await reverseGeoCode(lat, lng);
    if (address) {
      this.setState({
        currentCity: address.storableLocation.city,
        currentCountry: address.storableLocation.country,
        currentCountryCode: address.storableLocation.countryCode
      });
      this.reportLocation(
        lat,
        lng,
        address.storableLocation.city,
        address.storableLocation.country,
        address.storableLocation.countryCode
      );
    }
  };
  public reportLocation = async (
    lat: number,
    lng: number,
    currentCity: string,
    currentCountry: string,
    currentCountryCode: string
  ) => {
    const cityPhotoURL = await cityThumbnail(currentCity);
    const countryPhotoURL = await countryThumbnail(currentCountry);
    const currentContinent = await continents[currentCountryCode];
    const continentPhotoURL = await continentThumbnail(currentContinent);
    console.log(currentContinent);
    this.setState({ cityPhotoURL, countryPhotoURL, currentContinent });
    this.ReportLocationFn({
      variables: {
        currentLat: lat,
        currentLng: lng,
        currentCity,
        currentCountry,
        currentCountryCode,
        currentContinent,
        cityPhotoURL,
        countryPhotoURL,
        continentPhotoURL
      }
    });
    console.log(this.state);
  };
  public handleGeoError = () => {
    console.log("No location");
  };
  public toggleNowModal = () => {
    const { nowModalOpen } = this.state;
    this.setState({
      nowModalOpen: !nowModalOpen
    } as any);
  };
  public toggleBeforeModal = () => {
    const { beforeModalOpen } = this.state;
    this.setState({
      beforeModalOpen: !beforeModalOpen
    } as any);
  };
}

export default FeedContainer;
