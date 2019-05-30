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
import { CITY_PROFILE, NEAR_CITIES } from "./CityProfileQueries";

class CityProfileQuery extends Query<CityProfile, CityProfileVariables> {}
class NearCitiesQuery extends Query<NearCities, NearCitiesVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  search: string;
  nowUsersList: any;
  coffeeReportModalOpen: boolean;
  nowUsersActiveId: number;
}

class CityProfileContainer extends React.Component<IProps, IState> {
  public data;
  public coffeeFetchMore;
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      nowUsersList: [],
      coffeeReportModalOpen: false,
      nowUsersActiveId: null
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match.params.cityName !== newProps.match.params.cityName) {
      this.setState({ search: "", nowUsersList: [] });
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
      coffeeReportModalOpen,
      nowUsersActiveId
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
                    nowUsersActiveId={nowUsersActiveId}
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
    const nowUsersList = nowSearch(usersNow, value);
    this.setState({
      search: value,
      nowUsersList,
      activeId: 0
    } as any);
  };
  public onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { keyCode } = event;
    const { nowUsersActiveId, nowUsersList } = this.state;
    const { history } = this.props;

    const {
      cityProfile: { usersNow = null }
    } = this.data;

    if (keyCode === 13 && (nowUsersList.length || usersNow)) {
      {
        nowUsersList.length
          ? history.push({
              pathname: `/${nowUsersList[nowUsersActiveId].profile.username}`
            })
          : history.push({
              pathname: `/${usersNow[nowUsersActiveId].profile.username}`
            });
      }
      this.setState({
        nowUsersActiveId: 0
      });
    } else if (keyCode === 38) {
      if (nowUsersActiveId === 0) {
        return;
      }
      this.setState({
        nowUsersActiveId: nowUsersActiveId - 1
      });
    } else if (keyCode === 40) {
      if (nowUsersList.length) {
        if (nowUsersActiveId === nowUsersList.length - 1) {
          return;
        }
      } else {
        if (nowUsersActiveId === usersNow.length - 1) {
          return;
        }
      }
      this.setState({
        nowUsersActiveId: nowUsersActiveId + 1
      });
    }
  };
  public onClick: React.MouseEventHandler<HTMLDivElement> = () => {
    this.setState({
      nowUsersActiveId: 0
    });
  };
  public onBlur: React.MouseEventHandler<HTMLDivElement> = () => {
    this.setState({
      nowUsersActiveId: null
    });
  };
}

export default withRouter(CityProfileContainer);
