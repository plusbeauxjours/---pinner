import React from "react";
import { Query } from "react-apollo";
import ContinentProfilePresenter from "./CountriesPresenter";
import { TopCountries, TopCountriesVariables } from "../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import { TOP_COUNTRIES } from "./CountriesQueries";

class GetCountriesQuery extends Query<TopCountries, TopCountriesVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  page: number;
}
class CountriesContainer extends React.Component<IProps, IState> {
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
      <GetCountriesQuery
        query={TOP_COUNTRIES}
        variables={{ userName: username }}
      >
        {({ data, loading }) => {
          return (
            <ContinentProfilePresenter
              data={data}
              loading={loading}
              userName={username}
            />
          );
        }}
      </GetCountriesQuery>
    );
  }
}

export default withRouter(CountriesContainer);
