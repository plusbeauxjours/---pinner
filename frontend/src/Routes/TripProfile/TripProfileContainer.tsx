import React from "react";
import moment from "moment";
import { Query } from "react-apollo";
import {
  TripProfile,
  TripProfileVariables,
  NearCities,
  NearCitiesVariables
} from "../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import { TRIP_PROFILE } from "./TripProfileQueries";
import TripProfilePresenter from "./TripProfilePresenter";
import { NEAR_CITIES } from "../City/NearCities/NearCitiesQueries";

class TripProfileQuery extends Query<TripProfile, TripProfileVariables> {}

class NearCitiesQuery extends Query<NearCities, NearCitiesVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  search: string;
  cityName: string;
  cityId: string;
  cityPhoto: string;
  countryName: string;
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  usersBeforeList: any;
  usersBeforeActiveId: number;
}

class TripProfileContainer extends React.Component<IProps, IState> {
  public data;
  public fetchMore;
  constructor(props) {
    super(props);
    const { location: { state = {} } = {} } = ({} = props);
    if (!props.location.state) {
      props.history.goBack();
    }
    this.state = {
      search: "",
      cityName: state.cityName,
      cityId: state.cityId,
      cityPhoto: state.cityPhoto,
      countryName: state.countryName,
      startDate: state.tripStartDate,
      endDate: state.tripEndDate,
      usersBeforeList: [],
      usersBeforeActiveId: null
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match.params.cityName !== newProps.match.params.cityName) {
      this.setState({ search: "", usersBeforeList: [] });
    }
  }
  public render() {
    const {
      search,
      cityName,
      cityId,
      cityPhoto,
      countryName,
      startDate,
      endDate,
      usersBeforeList,
      usersBeforeActiveId
    } = this.state;
    return (
      <NearCitiesQuery query={NEAR_CITIES} variables={{ cityId }}>
        {({ data: nearCitiesData, loading: nearCitiesLoading }) => {
          return (
            <TripProfileQuery
              query={TRIP_PROFILE}
              variables={{ cityId, startDate, endDate }}
            >
              {({ data: profileDate, loading: profileLoading }) => {
                this.data = profileDate;
                return (
                  <TripProfilePresenter
                    cityName={cityName}
                    cityPhoto={cityPhoto}
                    countryName={countryName}
                    startDate={startDate}
                    endDate={endDate}
                    profileDate={profileDate}
                    profileLoading={profileLoading}
                    nearCitiesData={nearCitiesData}
                    nearCitiesLoading={nearCitiesLoading}
                    search={search}
                    usersBeforeList={usersBeforeList}
                    usersBeforeActiveId={usersBeforeActiveId}
                    onKeyDown={this.onKeyDown}
                    onClick={this.onClick}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                  />
                );
              }}
            </TripProfileQuery>
          );
        }}
      </NearCitiesQuery>
    );
  }
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    const {
      tripProfile: { usersBefore = null }
    } = this.data;
    const beforeSearch = (list, text) =>
      list.filter(i =>
        i.actor.profile.username.toLowerCase().includes(text.toLowerCase())
      );
    const usersBeforeList = beforeSearch(usersBefore, value);
    this.setState({
      search: value,
      usersBeforeList,
      activeId: 0
    } as any);
  };
  public onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { keyCode } = event;
    const { usersBeforeActiveId, usersBeforeList } = this.state;
    const { history } = this.props;

    const { tripProfile: { usersBefore = null } = {} } = this.data;

    if (keyCode === 13 && (usersBeforeList.length || usersBefore)) {
      {
        usersBeforeList.length
          ? history.push({
              pathname: `/${
                usersBeforeList[usersBeforeActiveId].actor.profile.username
              }`
            })
          : history.push({
              pathname: `/${
                usersBefore[usersBeforeActiveId].actor.profile.username
              }`
            });
      }
      this.setState({
        usersBeforeActiveId: 0
      });
    } else if (keyCode === 38) {
      if (usersBeforeActiveId === 0) {
        return;
      }
      this.setState({
        usersBeforeActiveId: usersBeforeActiveId - 1
      });
    } else if (keyCode === 40) {
      if (usersBeforeList.length) {
        if (usersBeforeActiveId === usersBeforeList.length - 1) {
          return;
        }
      } else {
        if (usersBeforeActiveId === usersBefore.length - 1) {
          return;
        }
      }
      this.setState({
        usersBeforeActiveId: usersBeforeActiveId + 1
      });
    }
  };
  public onClick: React.MouseEventHandler<HTMLDivElement> = () => {
    this.setState({
      usersBeforeActiveId: 0
    });
  };
  public onBlur: React.MouseEventHandler<HTMLDivElement> = () => {
    this.setState({
      usersBeforeActiveId: null
    });
  };
}

export default withRouter(TripProfileContainer);
