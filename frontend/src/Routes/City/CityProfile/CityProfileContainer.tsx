import React from "react";
import { Query } from "react-apollo";
import CityProfilePresenter from "./CityProfilePresenter";
import {
  CityProfile,
  CityProfileVariables,
  NearCities,
  NearCitiesVariables
} from "../../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import { CITY_PROFILE } from "./CityProfileQueries";
import { NEAR_CITIES } from "../NearCities/NearCitiesQueries";

class CityProfileQuery extends Query<CityProfile, CityProfileVariables> {}
class NearCitiesQuery extends Query<NearCities, NearCitiesVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  search: string;
  usersNowList: any;
  coffeeReportModalOpen: boolean;
  usersNowActiveId: number;
}

class CityProfileContainer extends React.Component<IProps, IState> {
  public data;
  public coffeeFetchMore;
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      usersNowList: [],
      coffeeReportModalOpen: false,
      usersNowActiveId: null
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match.params.cityId !== newProps.match.params.cityId) {
      this.setState({ search: "", usersNowList: [] });
    }
  }
  public render() {
    console.log(this.props);
    const {
      match: {
        params: { cityId }
      }
    } = this.props;
    const {
      search,
      usersNowList,
      coffeeReportModalOpen,
      usersNowActiveId
    } = this.state;
    return (
      <NearCitiesQuery query={NEAR_CITIES} variables={{ cityId }}>
        {({ data: nearCitiesData, loading: nearCitiesLoading }) => {
          return (
            <CityProfileQuery query={CITY_PROFILE} variables={{ cityId }}>
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
                    cityId={cityId}
                    onChange={this.onChange}
                    search={search}
                    usersNowList={usersNowList}
                    usersNowActiveId={usersNowActiveId}
                    onKeyDown={this.onKeyDown}
                    onClick={this.onClick}
                    onBlur={this.onBlur}
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
    const nowSearch = (list, text) =>
      list.filter(i =>
        i.profile.username.toLowerCase().includes(text.toLowerCase())
      );
    const usersNowList = nowSearch(usersNow, value);
    this.setState({
      search: value,
      usersNowList,
      activeId: 0
    } as any);
  };
  public onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { keyCode } = event;
    const { usersNowActiveId, usersNowList } = this.state;
    const { history } = this.props;

    const { cityProfile: { usersNow = null } = {} } = this.data;

    if (keyCode === 13 && (usersNowList.length || usersNow)) {
      {
        usersNowList.length
          ? history.push({
              pathname: `/${usersNowList[usersNowActiveId].profile.username}`
            })
          : history.push({
              pathname: `/${usersNow[usersNowActiveId].profile.username}`
            });
      }
      this.setState({
        usersNowActiveId: 0
      });
    } else if (keyCode === 38) {
      if (usersNowActiveId === 0) {
        return;
      }
      this.setState({
        usersNowActiveId: usersNowActiveId - 1
      });
    } else if (keyCode === 40) {
      if (usersNowList.length) {
        if (usersNowActiveId === usersNowList.length - 1) {
          return;
        }
      } else {
        if (usersNowActiveId === usersNow.length - 1) {
          return;
        }
      }
      this.setState({
        usersNowActiveId: usersNowActiveId + 1
      });
    }
  };
  public onClick: React.MouseEventHandler<HTMLDivElement> = () => {
    this.setState({
      usersNowActiveId: 0
    });
  };
  public onBlur: React.MouseEventHandler<HTMLDivElement> = () => {
    this.setState({
      usersNowActiveId: null
    });
  };
}

export default withRouter(CityProfileContainer);
