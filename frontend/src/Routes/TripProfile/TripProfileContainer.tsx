import React from "react";
import moment from "moment";
import { Query } from "react-apollo";
import {
  GetDurationCards,
  GetDurationCardsVariables,
  TripProfile,
  TripProfileVariables,
  NearCities,
  NearCountries,
  NearCitiesVariables,
  NearCountriesVariables
} from "../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import { GET_DURATION_CARDS, TRIP_PROFILE } from "./TripProfileQueries";
import TripProfilePresenter from "./TripProfilePresenter";
import { NEAR_CITIES, NEAR_COUNTRIES } from "../CityProfile/CityProfileQueries";

class GetDurationCardsQuery extends Query<
  GetDurationCards,
  GetDurationCardsVariables
> {}

class TripProfileQuery extends Query<TripProfile, TripProfileVariables> {}

class NearCitiesQuery extends Query<NearCities, NearCitiesVariables> {}
class NearCountriesQuery extends Query<NearCountries, NearCountriesVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  page: number;
  payload: string;
  cityName: string;
  cityPhoto: string;
  countryName: string;
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}

class TripProfileContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    const { location: { state = {} } = {} } = ({} = props);
    if (!props.location.state) {
      props.history.goBack();
    }
    this.state = {
      page: 0,
      payload: "profile",
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
    const {
      page,
      cityName,
      cityPhoto,
      countryName,
      startDate,
      endDate
    } = this.state;
    return (
      <NearCitiesQuery query={NEAR_CITIES} variables={{ cityName }}>
        {({ data: nearCitiesData, loading: nearCitiesLoading }) => {
          return (
            <NearCountriesQuery query={NEAR_COUNTRIES} variables={{ cityName }}>
              {({ data: nearCountriesData, loading: nearCountriesLoading }) => {
                return (
                  <TripProfileQuery
                    query={TRIP_PROFILE}
                    variables={{ cityName, startDate, endDate }}
                  >
                    {({ data: profileDate, loading: profileLoading }) => (
                      <GetDurationCardsQuery
                        query={GET_DURATION_CARDS}
                        variables={{ page, cityName, startDate, endDate }}
                      >
                        {({ data: cardsData, loading: cardsLoading }) => (
                          <TripProfilePresenter
                            cityName={cityName}
                            cityPhoto={cityPhoto}
                            countryName={countryName}
                            startDate={startDate}
                            endDate={endDate}
                            cardsData={cardsData}
                            cardsLoading={cardsLoading}
                            profileDate={profileDate}
                            profileLoading={profileLoading}
                            nearCitiesData={nearCitiesData}
                            nearCitiesLoading={nearCitiesLoading}
                            nearCountriesData={nearCountriesData}
                            nearCountriesLoading={nearCountriesLoading}
                          />
                        )}
                      </GetDurationCardsQuery>
                    )}
                  </TripProfileQuery>
                );
              }}
            </NearCountriesQuery>
          );
        }}
      </NearCitiesQuery>
    );
  }
}

export default withRouter(TripProfileContainer);
