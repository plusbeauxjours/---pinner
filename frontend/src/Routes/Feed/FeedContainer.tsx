import React from "react";
import { Query, Mutation, MutationFn } from "react-apollo";
import FeedPresenter from "./FeedPresenter";
import { GET_FEED } from "./FeedQueries";
import { feed, GetLocation, GetLocationVariables } from "../../types/api";
import { RouteComponentProps } from "react-router";
import { GET_LOCATION } from "../Home/HomeQueries";
import { reverseGeoCode } from "../../mapHelpers";

class GetLocationMutation extends Mutation<GetLocation, GetLocationVariables> {}

class FeedQuery extends Query<feed> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  page: number;
  lastLat: number;
  lastLng: number;
  lastCity: string;
  lastCountry: string;
}

class FeedContainer extends React.Component<IProps, IState> {
  public getLocationFn: MutationFn;
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
      <GetLocationMutation
        mutation={GET_LOCATION}
        variables={{ lastLat, lastLng, lastCity, lastCountry }}
      >
        {getLocationFn => {
          this.getLocationFn = getLocationFn;
          return (
            <FeedQuery
              query={GET_FEED}
              variables={{ page }}
              fetchPolicy="network-only"
            >
              {({ data, loading }) => (
                <FeedPresenter loading={loading} data={data} />
              )}
            </FeedQuery>
          );
        }}
      </GetLocationMutation>
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
    this.getFromAddress(latitude, longitude);
  };
  public handleGeoError = () => {
    console.log("No location");
  };
  public getFromAddress = async (lat: number, lng: number) => {
    const address = await reverseGeoCode(lat, lng);
    if (address) {
      this.setState({
        lastLat: lat,
        lastLng: lng,
        lastCity: address,
        lastCountry: address
      });
      console.log(this.state);
      this.getLocationFn({
        variables: {
          lastLat: lat,
          lastLng: lng,
          lastCity: address,
          lastCountry: address
        }
      });
    }
  };
}

export default FeedContainer;
