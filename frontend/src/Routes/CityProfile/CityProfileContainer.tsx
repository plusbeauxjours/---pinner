import React from "react";
import { Query } from "react-apollo";
import CityProfilePresenter from "./CityProfilePresenter";
import {
  CityProfile,
  CityProfileVariables,
  NearCities,
  NearCountries,
  NearCitiesVariables,
  NearCountriesVariables
} from "../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import {
  CITY_PROFILE,
  NEAR_CITIES,
  NEAR_COUNTRIES
} from "./CityProfileQueries";

class CityProfileQuery extends Query<CityProfile, CityProfileVariables> {}

class NearCitiesQuery extends Query<NearCities, NearCitiesVariables> {}
class NearCountriesQuery extends Query<NearCountries, NearCountriesVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  page: number;
  cityName: string;
  nearCityList: any;
  nearCountryList: any;
  nearCityPage: number;
  nearCountryPage: number;
  nearCityModalOpen: boolean;
  nearCountryModalOpen: boolean;
}

class CityProfileContainer extends React.Component<IProps, IState> {
  public nearCitiesFetchMore;
  public nearCountriesFetchMore;
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      cityName: this.props.match.params.cityName,
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
                  <CityProfileQuery
                    query={CITY_PROFILE}
                    variables={{ page, cityName }}
                  >
                    {({ data: cityData, loading: cityLoading }) => {
                      return (
                        <CityProfilePresenter
                          cityData={cityData}
                          cityLoading={cityLoading}
                          nearCitiesData={nearCitiesData}
                          nearCitiesLoading={nearCitiesLoading}
                          nearCountriesData={nearCountriesData}
                          nearCountriesLoading={nearCountriesLoading}
                          nearCityList={nearCityList}
                          nearCountryList={nearCountryList}
                          nearCityModalOpen={nearCityModalOpen}
                          nearCountryModalOpen={nearCountryModalOpen}
                          toggleNearCityModal={this.toggleNearCityModal}
                          toggleNearCountryModal={this.toggleNearCountryModal}
                          toggleNearCitySeeAll={this.toggleNearCitySeeAll}
                          toggleNearCountrySeeAll={this.toggleNearCountrySeeAll}
                        />
                      );
                    }}
                  </CityProfileQuery>
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
    const { nearCityModalOpen } = this.state;
    this.nearCitiesFetchMore({
      query: NEAR_CITIES,
      variables: { nearCityPage: 1 },
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
    const { nearCountryModalOpen } = this.state;
    this.nearCountriesFetchMore({
      query: NEAR_COUNTRIES,
      variables: { nearCountryPage: 1 },
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

export default withRouter(CityProfileContainer);
