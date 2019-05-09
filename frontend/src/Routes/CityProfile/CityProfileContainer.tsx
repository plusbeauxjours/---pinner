import React from "react";
import { Query } from "react-apollo";
import CityProfilePresenter from "./CityProfilePresenter";
import {
  CityProfile,
  CityProfileVariables,
  NearCities,
  NearCitiesVariables
} from "../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import { CITY_PROFILE, NEAR_CITIES } from "./CityProfileQueries";

class CityProfileQuery extends Query<CityProfile, CityProfileVariables> {}
class NearCitiesQuery extends Query<NearCities, NearCitiesVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  page: number;
  coffeeReportModalOpen: boolean;
}

class CityProfileContainer extends React.Component<IProps, IState> {
  public coffeeFetchMore;
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
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
        {({ data: nearCitiesData, loading: nearCitiesLoading }) => {
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
                    coffeeReportModalOpen={coffeeReportModalOpen}
                    toggleCoffeeReportModal={this.toggleCoffeeReportModal}
                    cityName={cityName}
                  />
                );
              }}
            </CityProfileQuery>
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
