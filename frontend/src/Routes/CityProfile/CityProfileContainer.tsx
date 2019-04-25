import React from "react";
import { Query } from "react-apollo";
import CityProfilePresenter from "./CityProfilePresenter";
import {
  CityProfile,
  CityProfileVariables,
  NearCities,
  NearCountries,
  NearCitiesVariables,
  NearCountriesVariables,
  GetCoffees,
  GetCoffeesVariables
} from "../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import {
  CITY_PROFILE,
  NEAR_CITIES,
  NEAR_COUNTRIES
} from "./CityProfileQueries";
import { GET_COFFEES } from "../Feed/FeedQueries";

class CityProfileQuery extends Query<CityProfile, CityProfileVariables> {}

class NearCitiesQuery extends Query<NearCities, NearCitiesVariables> {}
class NearCountriesQuery extends Query<NearCountries, NearCountriesVariables> {}
class GetCoffeesQuery extends Query<GetCoffees, GetCoffeesVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  page: number;
  lat: number;
  lng: number;
  coffeeModalOpen: boolean;
  coffeeReportModalOpen: boolean;
  coffeePage: number;
}

class CityProfileContainer extends React.Component<IProps, IState> {
  public coffeeFetchMore;
  public nearCitiesFetchMore;
  public nearCountriesFetchMore;
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      lat: 0,
      lng: 0,
      coffeeModalOpen: false,
      coffeeReportModalOpen: false,
      coffeePage: 0
    };
  }
  public componentDidMount() {
    console.log("goodmorning");
  }
  public render() {
    const {
      match: {
        params: { cityName }
      }
    } = this.props;
    const {
      page,
      coffeeModalOpen,
      coffeeReportModalOpen,
      coffeePage
    } = this.state;
    return (
      <GetCoffeesQuery query={GET_COFFEES} variables={{ cityName, coffeePage }}>
        {({
          data: coffeeData,
          loading: coffeeLoading,
          fetchMore: coffeeFetchMore
        }) => {
          this.coffeeFetchMore = coffeeFetchMore;
          return (
            <NearCitiesQuery query={NEAR_CITIES} variables={{ cityName }}>
              {({
                data: nearCitiesData,
                loading: nearCitiesLoading,
                fetchMore: nearCitiesFetchMore
              }) => {
                this.nearCitiesFetchMore = nearCitiesFetchMore;
                return (
                  <NearCountriesQuery
                    query={NEAR_COUNTRIES}
                    variables={{ cityName }}
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
                                coffeeData={coffeeData}
                                coffeeLoading={coffeeLoading}
                                coffeeModalOpen={coffeeModalOpen}
                                toggleCoffeeModal={this.toggleCoffeeModal}
                                coffeeReportModalOpen={coffeeReportModalOpen}
                                toggleCoffeeReportModal={
                                  this.toggleCoffeeReportModal
                                }
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
        }}
      </GetCoffeesQuery>
    );
  }
  public toggleCoffeeModal = () => {
    const { coffeeModalOpen } = this.state;
    this.setState({
      coffeeModalOpen: !coffeeModalOpen
    } as any);
  };
  public toggleCoffeeReportModal = () => {
    const { coffeeReportModalOpen } = this.state;
    this.setState({
      coffeeReportModalOpen: !coffeeReportModalOpen
    } as any);
  };
}

export default withRouter(CityProfileContainer);
