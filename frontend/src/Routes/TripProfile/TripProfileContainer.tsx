import React from "react";
import moment from "moment";
import { Query } from "react-apollo";
import {
  TripProfile,
  TripProfileVariables,
  NearCities,
  NearCitiesVariables
} from "../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import { TRIP_PROFILE } from "./TripProfileQueries";
import TripProfilePresenter from "./TripProfilePresenter";
import { NEAR_CITIES } from "../City/CityProfile/CityProfileQueries";

class TripProfileQuery extends Query<TripProfile, TripProfileVariables> {}

class NearCitiesQuery extends Query<NearCities, NearCitiesVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  cityName: string;
  cityPhoto: string;
  countryName: string;
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}

class TripProfileContainer extends React.Component<IProps, IState> {
  public fetchMore;
  constructor(props) {
    super(props);
    const { location: { state = {} } = {} } = ({} = props);
    if (!props.location.state) {
      props.history.goBack();
    }
    this.state = {
      cityName: state.cityName,
      cityPhoto: state.cityPhoto,
      countryName: state.countryName,
      startDate: state.tripStartDate,
      endDate: state.tripEndDate
    };
  }
  public componentDidMount() {
    console.log("goodmorning");
  }
  public render() {
    const { cityName, cityPhoto, countryName, startDate, endDate } = this.state;
    return (
      <NearCitiesQuery query={NEAR_CITIES} variables={{ cityName }}>
        {({ data: nearCitiesData, loading: nearCitiesLoading }) => {
          return (
            <TripProfileQuery
              query={TRIP_PROFILE}
              variables={{ cityName, startDate, endDate }}
            >
              {({ data: profileDate, loading: profileLoading }) => (
                <TripProfilePresenter
                  cityName={cityName}
                  cityPhoto={cityPhoto}
                  countryName={countryName}
                  startDate={startDate}
                  endDate={endDate}
                  profileDate={profileDate}
                  profileLoading={profileLoading}
                  nearCitiesData={nearCitiesData}
                  nearCitiesLoading={nearCitiesLoading}
                />
              )}
            </TripProfileQuery>
          );
        }}
      </NearCitiesQuery>
    );
  }
}

export default withRouter(TripProfileContainer);
