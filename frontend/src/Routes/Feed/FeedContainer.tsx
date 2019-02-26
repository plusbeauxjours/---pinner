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

class ReportLocationMutation extends Mutation<
  ReportLocation,
  ReportLocationVariables
> {}

class FeedQuery extends Query<Feed, FeedVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  page: number;
  currentLat: number;
  currentLng: number;
  currentCity: string;
  currentCountry: string;
  currentCountryCode: string;
}

class FeedContainer extends React.Component<IProps, IState> {
  public ReportLocationFn: MutationFn;
  public state = {
    page: 0,
    currentLat: 0,
    currentLng: 0,
    currentCity: "",
    currentCountry: "",
    currentCountryCode: ""
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
      currentLat,
      currentLng,
      currentCity,
      currentCountry,
      currentCountryCode
    } = this.state;
    return (
      <FeedQuery
        query={GET_FEED}
        variables={{
          page,
          cityname: currentCity
        }}
        fetchPolicy="network-only"
        onCompleted={() => {
          console.log("mutationFn");
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
              currentCountryCode
            }}
          >
            {ReportLocationFn => {
              this.ReportLocationFn = ReportLocationFn;
              return (
                <FeedPresenter
                  loading={loading}
                  data={data}
                  currentCity={currentCity}
                  currentCountry={currentCountry}
                  currentCountryCode={currentCountryCode}
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
        currentCity: address.city,
        currentCountry: address.country,
        currentCountryCode: address.countryCode
      });
      this.reportLocation(
        lat,
        lng,
        address.city,
        address.country,
        address.countryCode
      );
    }
  };
  public reportLocation = (
    lat: number,
    lng: number,
    lastCity: string,
    lastCountry: string,
    currentCountryCode: string
  ) => {
    this.ReportLocationFn({
      variables: {
        lastLat: lat,
        lastLng: lng,
        lastCity,
        lastCountry,
        currentCountryCode
      }
    });
    console.log(this.state);
  };
  public handleGeoError = () => {
    console.log("No location");
  };
}

export default FeedContainer;
