import React from "react";
import moment from "moment";
import { Query } from "react-apollo";
import {
  GetDurationCards,
  GetDurationCardsVariables,
  GetDurationAvatars,
  GetDurationAvatarsVariables,
  TripProfile,
  TripProfileVariables
} from "../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import {
  GET_DURATION_CARDS,
  GET_DURATION_AVATARS,
  TRIP_PROFILE
} from "./TripProfileQueries";
import TripProfilePresenter from "./TripProfilePresenter";

class GetDurationCardsQuery extends Query<
  GetDurationCards,
  GetDurationCardsVariables
> {}
class GetDurationAvatarsQuery extends Query<
  GetDurationAvatars,
  GetDurationAvatarsVariables
> {}
class TripProfileQuery extends Query<TripProfile, TripProfileVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  page: number;
  cityName: string;
  cityPhoto: string;
  countryName: string;
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}

class TripProfileContainer extends React.Component<IProps, IState> {
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
      endDate: state.tripEndDate
    };
  }
  public render() {
    const {
      page,
      cityName,
      cityPhoto,
      countryName,
      startDate,
      endDate
    } = this.state;
    return (
      <TripProfileQuery query={TRIP_PROFILE} variables={{ cityName }}>
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
                    state={this.state}
                  />
                )}
              </GetDurationCardsQuery>
            )}
          </GetDurationAvatarsQuery>
        )}
      </TripProfileQuery>
    );
  }
}

export default withRouter(TripProfileContainer);
