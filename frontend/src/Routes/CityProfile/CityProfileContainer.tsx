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
  search: string;
  nowUsersList: any;
  beforeUsersList: any;
  coffeeReportModalOpen: boolean;
}

class CityProfileContainer extends React.Component<IProps, IState> {
  public data;
  public coffeeFetchMore;
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      search: "",
      nowUsersList: [],
      beforeUsersList: [],
      coffeeReportModalOpen: false
    };
  }
  public componentDidUpdate(oldProps) {
    const newProps = this.props;
    if (oldProps.match.params.cityName !== newProps.match.params.cityName) {
      this.setState({ search: "", nowUsersList: [], beforeUsersList: [] });
      console.log(this.state);
    }
  }
  public render() {
    const {
      match: {
        params: { cityName }
      }
    } = this.props;
    const {
      search,
      nowUsersList,
      beforeUsersList,
      coffeeReportModalOpen
    } = this.state;
    return (
      <NearCitiesQuery query={NEAR_CITIES} variables={{ cityName }}>
        {({ data: nearCitiesData, loading: nearCitiesLoading }) => {
          return (
            <CityProfileQuery query={CITY_PROFILE} variables={{ cityName }}>
              {({ data: cityData, loading: cityLoading }) => {
                this.data = cityData;
                return (
                  <CityProfilePresenter
                    cityData={cityData}
                    cityLoading={cityLoading}
                    nearCitiesData={nearCitiesData}
                    nearCitiesLoading={nearCitiesLoading}
                    coffeeReportModalOpen={coffeeReportModalOpen}
                    toggleCoffeeReportModal={this.toggleCoffeeReportModal}
                    cityName={cityName}
                    onChange={this.onChange}
                    search={search}
                    nowUsersList={nowUsersList}
                    beforeUsersList={beforeUsersList}
                    state={this.state}
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
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    const {
      cityProfile: { usersNow = null }
    } = this.data;
    const {
      cityProfile: { usersBefore = null }
    } = this.data;
    const nowSearch = (list, text) =>
      list.filter(i =>
        i.profile.username.toLowerCase().includes(text.toLowerCase())
      );
    const nowUsersList = nowSearch(usersNow, value);
    this.setState({
      search: value,
      nowUsersList
    } as any);
    if (usersBefore) {
      const beforeSearch = (list, text) =>
        list.filter(i =>
          i.actor.profile.username.toLowerCase().includes(text.toLowerCase())
        );
      const beforeUsersList = beforeSearch(usersBefore, value);
      this.setState({
        beforeUsersList
      } as any);
    }
  };
}

export default withRouter(CityProfileContainer);
