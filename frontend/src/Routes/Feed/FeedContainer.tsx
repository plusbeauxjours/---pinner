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
  lastLat: number;
  lastLng: number;
  lastCity: string;
  lastCountry: string;
}

class FeedContainer extends React.Component<IProps, IState> {
  public ReportLocationFn: MutationFn;
  public state = {
    page: 0,
    lastLat: 0,
    lastLng: 0,
    lastCity: "",
    lastCountry: ""
  };
  public componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
  }
  public render() {
    const { page, lastLat, lastLng, lastCity, lastCountry } = this.state;
    return (
      <ReportLocationMutation
        mutation={REPORT_LOCATION}
        variables={{ lastLat, lastLng, lastCity, lastCountry }}
      >
        {ReportLocationFn => {
          this.ReportLocationFn = ReportLocationFn;
          return (
            <FeedQuery
              query={GET_FEED}
              variables={{ page, cityname: lastCity }}
              fetchPolicy="network-only"
              onCompleted={() =>
                this.reportLocation(lastLat, lastLng, lastCity, lastCountry)
              }
            >
              {({ data, loading }) => (
                <FeedPresenter
                  loading={loading}
                  data={data}
                  lastCity={lastCity}
                  lastCountry={lastCountry}
                />
              )}
            </FeedQuery>
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
      lastLat: latitude,
      lastLng: longitude
    });
    this.getAddress(latitude, longitude);
  };
  public getAddress = async (lat: number, lng: number) => {
    const address = await reverseGeoCode(lat, lng);
    if (address) {
      this.setState({
        lastCity: address.city,
        lastCountry: address.country
      });
    }
  };
  public reportLocation = (
    lat: number,
    lng: number,
    lastCity: string,
    lastCountry: string
  ) => {
    console.log(lat, lng, lastCity, lastCountry);
    this.ReportLocationFn({
      variables: {
        lastLat: lat,
        lastLng: lng,
        lastCity,
        lastCountry
      }
    });
  };
  public handleGeoError = () => {
    console.log("No location");
  };
}

export default FeedContainer;
