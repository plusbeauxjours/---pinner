import React from "react";
import moment from "moment";
import { Query } from "react-apollo";
import {
  GetDurationCards,
  GetDurationCardsVariables,
  GetDurationAvatars,
  GetDurationAvatarsVariables,
  TripProfile,
  TripProfileVariables,
  NearCities,
  NearCountries,
  NearCitiesVariables,
  NearCountriesVariables
} from "../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import {
  GET_DURATION_CARDS,
  GET_DURATION_AVATARS,
  TRIP_PROFILE
} from "./TripProfileQueries";
import TripProfilePresenter from "./TripProfilePresenter";
import { NEAR_CITIES, NEAR_COUNTRIES } from "../CityProfile/CityProfileQueries";

class GetDurationCardsQuery extends Query<
  GetDurationCards,
  GetDurationCardsVariables
> {}
class GetDurationAvatarsQuery extends Query<
  GetDurationAvatars,
  GetDurationAvatarsVariables
> {}
class TripProfileQuery extends Query<TripProfile, TripProfileVariables> {}

class NearCitiesQuery extends Query<NearCities, NearCitiesVariables> {}
class NearCountriesQuery extends Query<NearCountries, NearCountriesVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  page: number;
  cityName: string;
  cityPhoto: string;
  countryName: string;
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  nearCityList: any;
  nearCountryList: any;
  nearCityPage: number;
  nearCountryPage: number;
  nearCityModalOpen: boolean;
  nearCountryModalOpen: boolean;
}

class TripProfileContainer extends React.Component<IProps, IState> {
  public nearCitiesFetchMore;
  public nearCountriesFetchMore;
  constructor(props) {
    super(props);
    const { location: { state = {} } = {} } = ({} = props);
    if (!props.location.state) {
      props.history.goBack();
    }
    this.state = {
      page: 0,
      cityName: state.cityName,
      cityPhoto: state.cityPhoto,
      countryName: state.countryName,
      startDate: state.tripStartDate,
      endDate: state.tripEndDate,
      nearCityList: null,
      nearCountryList: null,
      nearCityPage: 0,
      nearCountryPage: 0,
      nearCityModalOpen: false,
      nearCountryModalOpen: false
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
      endDate,
      nearCityList,
      nearCountryList,
      nearCityPage,
      nearCountryPage,
      nearCityModalOpen,
      nearCountryModalOpen
    } = this.state;
    return (
      <NearCitiesQuery
        query={NEAR_CITIES}
        variables={{ nearCityPage, cityName }}
      >
        {({
          data: nearCitiesData,
          loading: nearCitiesLoading,
          fetchMore: nearCitiesFetchMore
        }) => {
          this.nearCitiesFetchMore = nearCitiesFetchMore;
          return (
            <NearCountriesQuery
              query={NEAR_COUNTRIES}
              variables={{ nearCountryPage, cityName }}
            >
              {({
                data: nearCountriesData,
                loading: nearCountriesLoading,
                fetchMore: nearCountriesFetchMore
              }) => {
                this.nearCountriesFetchMore = nearCountriesFetchMore;
                return (
                  <TripProfileQuery
                    query={TRIP_PROFILE}
                    variables={{ cityName }}
                  >
                    {({ data: profileDate, loading: profileLoading }) => (
                      <GetDurationAvatarsQuery
                        query={GET_DURATION_AVATARS}
                        variables={{ page, cityName, startDate, endDate }}
                      >
                        {({ data: usersData, loading: usersLoading }) => (
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
                                usersData={usersData}
                                usersLoading={usersLoading}
                                profileDate={profileDate}
                                profileLoading={profileLoading}
                                nearCitiesData={nearCitiesData}
                                nearCitiesLoading={nearCitiesLoading}
                                nearCountriesData={nearCountriesData}
                                nearCountriesLoading={nearCountriesLoading}
                                nearCityList={nearCityList}
                                nearCountryList={nearCountryList}
                                nearCityModalOpen={nearCityModalOpen}
                                nearCountryModalOpen={nearCountryModalOpen}
                                toggleNearCityModal={this.toggleNearCityModal}
                                toggleNearCountryModal={
                                  this.toggleNearCountryModal
                                }
                                toggleNearCitySeeAll={this.toggleNearCitySeeAll}
                                toggleNearCountrySeeAll={
                                  this.toggleNearCountrySeeAll
                                }
                              />
                            )}
                          </GetDurationCardsQuery>
                        )}
                      </GetDurationAvatarsQuery>
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
  public toggleNearCityModal = () => {
    const { nearCityModalOpen } = this.state;
    this.setState({
      nearCityModalOpen: !nearCityModalOpen
    } as any);
  };
  public toggleNearCountryModal = () => {
    const { nearCountryModalOpen } = this.state;
    this.setState({
      nearCountryModalOpen: !nearCountryModalOpen
    } as any);
  };
  public toggleNearCitySeeAll = () => {
    const {
      match: {
        params: { cityName }
      }
    } = this.props;
    const { nearCityModalOpen } = this.state;
    this.nearCitiesFetchMore({
      query: NEAR_CITIES,
      variables: { nearCityPage: 1, cityName },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        this.setState({
          nearCityList: [
            ...previousResult.nearCities.cities,
            ...fetchMoreResult.nearCities.cities
          ],
          nearCityModalOpen: !nearCityModalOpen
        });
      }
    });
  };
  public toggleNearCountrySeeAll = () => {
    const {
      match: {
        params: { cityName }
      }
    } = this.props;
    const { nearCountryModalOpen } = this.state;
    this.nearCountriesFetchMore({
      query: NEAR_COUNTRIES,
      variables: { nearCountryPage: 1, cityName },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        this.setState({
          nearCountryList: [
            ...previousResult.nearCountries.countries,
            ...fetchMoreResult.nearCountries.countries
          ],
          nearCountryModalOpen: !nearCountryModalOpen
        });
      }
    });
  };
}

export default withRouter(TripProfileContainer);
