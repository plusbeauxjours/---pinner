import React from "react";
import { Query } from "react-apollo";
import CitiesPresenter from "./CitiesPresenter";
import { FrequentVisits, FrequentVisitsVariables } from "../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import { FREQUENT_VISITS } from "./CitiesQueries";

class GetCitiesQuery extends Query<FrequentVisits, FrequentVisitsVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  page: number;
}

class CitiesContainerContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    };
  }
  public render() {
    const {
      match: {
        params: { username }
      }
    } = this.props;

    return (
      <GetCitiesQuery
        query={FREQUENT_VISITS}
        variables={{ userName: username }}
        // fetchPolicy="cache-and-network"
      >
        {({ data, loading }) => {
          console.log(username);
          return (
            <CitiesPresenter
              loading={loading}
              data={data}
              userName={username}
            />
          );
        }}
      </GetCitiesQuery>
    );
  }
}

export default withRouter(CitiesContainerContainer);
