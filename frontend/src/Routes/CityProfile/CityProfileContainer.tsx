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
  latitude: number;
  longitude: number;
  coffeeReportModalOpen: boolean;
}

class CityProfileContainer extends React.Component<IProps, IState> {
  public coffeeFetchMore;
  public nearCitiesFetchMore;
  public nearCountriesFetchMore;
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      latitude: 0,
      longitude: 0,
      coffeeReportModalOpen: false
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
    const { page, coffeeReportModalOpen } = this.state;
    return (
      <NearCitiesQuery query={NEAR_CITIES} variables={{ cityName }}>
        {({
          data: nearCitiesData,
          loading: nearCitiesLoading,
          fetchMore: nearCitiesFetchMore
        }) => {
          this.nearCitiesFetchMore = nearCitiesFetchMore;
          return (
            <NearCountriesQuery query={NEAR_COUNTRIES} variables={{ cityName }}>
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
                      console.log("ho");
                      return (
                        <CityProfilePresenter
                          cityData={cityData}
                          cityLoading={cityLoading}
                          nearCitiesData={nearCitiesData}
                          nearCitiesLoading={nearCitiesLoading}
                          nearCountriesData={nearCountriesData}
                          nearCountriesLoading={nearCountriesLoading}
                          coffeeReportModalOpen={coffeeReportModalOpen}
                          toggleCoffeeReportModal={this.toggleCoffeeReportModal}
                          cityName={cityName}
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
  public toggleCoffeeReportModal = () => {
    const { coffeeReportModalOpen } = this.state;
    this.setState({
      coffeeReportModalOpen: !coffeeReportModalOpen
    } as any);
  };
}

export default withRouter(CityProfileContainer);
