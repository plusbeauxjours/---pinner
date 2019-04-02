import React from "react";
import moment from "moment";
import { Query } from "react-apollo";
import { GetDurationCards, GetDurationCardsVariables } from "../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import { GET_DURATION_CARDS } from "./TripProfileQueries";
import TripProfilePresenter from "./TripProfilePresenter";

class GetDurationCardsQuery extends Query<
  GetDurationCards,
  GetDurationCardsVariables
> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  page: number;
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}

class TripProfileContainer extends React.Component<IProps, IState> {
  public state = {
    page: 0,
    startDate: null,
    endDate: null
  };
  public render() {
    const {
      match: {
        params: { cityName }
      }
    } = this.props;
    console.log(this.props);
    console.log(cityName);
    const { page, startDate, endDate } = this.state;
    return (
      <GetDurationCardsQuery
        query={GET_DURATION_CARDS}
        variables={{ page, cityName, startDate, endDate }}
      >
        {({ data, loading }) => (
          <TripProfilePresenter data={data} loading={loading} />
        )}
      </GetDurationCardsQuery>
    );
  }
}

export default withRouter(TripProfileContainer);
