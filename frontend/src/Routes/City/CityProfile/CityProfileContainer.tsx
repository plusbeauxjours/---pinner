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
  beforeUsersList: any;
  coffeeReportModalOpen: boolean;
  nowUsersActiveId: number;
  beforeUsersActiveId: number;
}

class CityProfileContainer extends React.Component<IProps, IState> {
  public data;
  public coffeeFetchMore;
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      nowUsersList: [],
      beforeUsersList: [],
      coffeeReportModalOpen: false,
      nowUsersActiveId: null,
      beforeUsersActiveId: null
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match.params.cityName !== newProps.match.params.cityName) {
      this.setState({ search: "", nowUsersList: [], beforeUsersList: [] });
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
      coffeeReportModalOpen,
      nowUsersActiveId,
      beforeUsersActiveId
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
                    nowUsersActiveId={nowUsersActiveId}
                    beforeUsersActiveId={beforeUsersActiveId}
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
      cityProfile: { usersNow = null, usersBefore = null }
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
      console.log(beforeUsersList);
      this.setState({
        search: value,
        beforeUsersList
      });
    }
    if (nowUsersList.length !== 0) {
      this.setState({
        nowUsersActiveId: 0,
        beforeUsersActiveId: null
      } as any);
    } else if (nowUsersList.length === 0) {
      this.setState({
        nowUsersActiveId: null,
        beforeUsersActiveId: 0
      } as any);
    }
  };
  public onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { keyCode } = event;
    const {
      nowUsersActiveId,
      beforeUsersActiveId,
      nowUsersList,
      beforeUsersList
    } = this.state;
    const { history } = this.props;

    const {
      cityProfile: { usersNow = null, usersBefore = null }
    } = this.data;

    if (
      keyCode === 13 &&
      (nowUsersList || beforeUsersList || usersNow || usersBefore)
    ) {
      if (nowUsersActiveId !== null) {
        history.push({
          pathname: `/${usersNow[nowUsersActiveId].profile.username}`
        });
      } else if (beforeUsersActiveId !== null) {
        history.push({
          pathname: `/${
            usersBefore[beforeUsersActiveId].actor.profile.username
          }`
        });
      }
      this.setState({
        nowUsersActiveId: 0,
        beforeUsersActiveId: null
      });
    } else if (keyCode === 38) {
      if (nowUsersActiveId === 0) {
        return;
      } else if (beforeUsersActiveId === 0) {
        if (nowUsersList.length !== 0) {
          this.setState({
            nowUsersActiveId: nowUsersList.length - 1,
            beforeUsersActiveId: null
          });
        } else if (nowUsersList.length === 0 && usersNow) {
          this.setState({
            nowUsersActiveId: usersNow.length - 1,
            beforeUsersActiveId: null
          });
        } else if (nowUsersList.length === 0 && !usersNow) {
          return;
        }
      }
      if (nowUsersActiveId !== null) {
        this.setState({
          nowUsersActiveId: nowUsersActiveId - 1
        });
      } else if (beforeUsersActiveId !== null) {
        this.setState({
          beforeUsersActiveId: beforeUsersActiveId - 1
        });
      }
    } else if (keyCode === 40) {
      if (beforeUsersList.length !== 0) {
        if (beforeUsersActiveId === beforeUsersList.length - 1) {
          console.log("0");
          return;
        }
      } else if (beforeUsersList.length === 0) {
        if (beforeUsersActiveId === usersBefore.length - 1) {
          console.log("0");
          return;
        }
      } else if (
        nowUsersList.length !== 0 &&
        nowUsersActiveId === nowUsersList.length - 1
      ) {
        console.log(nowUsersActiveId);
        console.log("im waiting");
        this.setState({
          nowUsersActiveId: null,
          beforeUsersActiveId: 0
        });
      } else if (
        nowUsersList.length === 0 &&
        nowUsersActiveId === usersNow.length - 1
      ) {
        console.log(nowUsersActiveId);
        console.log("im waiting");
        this.setState({
          nowUsersActiveId: null,
          beforeUsersActiveId: 0
        });
      }
      if (nowUsersActiveId !== null) {
        console.log(nowUsersActiveId);
        console.log(usersNow.length);
        this.setState({
          nowUsersActiveId: nowUsersActiveId + 1
        });
      } else if (beforeUsersActiveId !== null) {
        console.log(nowUsersActiveId);
        console.log(usersNow.length);
        this.setState({
          beforeUsersActiveId: beforeUsersActiveId + 1
        });
      }
    }
  };
  public onClick: React.MouseEventHandler<HTMLDivElement> = () => {
    const {
      cityProfile: { usersNow = null }
    } = this.data;
    const { nowUsersList } = this.state;
    if (!usersNow || nowUsersList.length === 0) {
      this.setState({
        nowUsersActiveId: null,
        beforeUsersActiveId: 0
      });
    } else {
      this.setState({
        nowUsersActiveId: 0,
        beforeUsersActiveId: null
      });
    }
  };
  public onBlur: React.MouseEventHandler<HTMLDivElement> = () => {
    this.setState({
      nowUsersActiveId: null,
      beforeUsersActiveId: null
    });
  };
}

export default withRouter(CityProfileContainer);
