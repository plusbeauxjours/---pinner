import React from "react";
import moment from "moment";
import { Query } from "react-apollo";
import {
  GetDurationCards,
  GetDurationCardsVariables,
  GetDurationUsers,
  GetDurationUsersVariables
} from "../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import { GET_DURATION_CARDS, GET_DURATION_USERS } from "./TripProfileQueries";
import TripProfilePresenter from "./TripProfilePresenter";

class GetDurationCardsQuery extends Query<
  GetDurationCards,
  GetDurationCardsVariables
> {}
class GetDurationUsersQuery extends Query<
  GetDurationUsers,
  GetDurationUsersVariables
> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  page: number;
  cityName: string;
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
      startDate: state.startDate,
      endDate: state.endDate
    };
  }
  public render() {
    const { page, cityName, startDate, endDate } = this.state;
    return (
      <GetDurationCardsQuery
        query={GET_DURATION_CARDS}
        variables={{ page, cityName, startDate, endDate }}
      >
        {({ data: cardsData, loading: cardsLoading }) => (
          <GetDurationUsersQuery
            query={GET_DURATION_USERS}
            variables={{ page, cityName, startDate, endDate }}
          >
            {({ data: usersData, loading: usersLoading }) => (
              <TripProfilePresenter
                cardsData={cardsData}
                cardsLoading={cardsLoading}
                usersData={usersData}
                usersLoading={usersLoading}
              />
            )}
          </GetDurationUsersQuery>
        )}
      </GetDurationCardsQuery>
    );
  }
}

export default withRouter(TripProfileContainer);
