import React from "react";
import { Query } from "react-apollo";
import CountryProfilePresenter from "./TripProfileContainerPresenter";
import { CountryProfile, CountryProfileVariables } from "../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import { COUNTRY_PROFILE } from "./TripProfileContainerQueries";

class CountryProfileQuery extends Query<
  CountryProfile,
  CountryProfileVariables
> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  page: number;
  cityName: string;
}

class TripProfileContainer extends React.Component<IProps, IState> {
  public state = {
    page: 0,
    cityName: ""
  };
  public render() {
    const {
      match: {
        params: { cityName }
      }
    } = this.props;
    console.log(this.props);
    console.log(cityName);
    const { page } = this.state;
    return (
      <CountryProfileQuery
        query={COUNTRY_PROFILE}
        variables={{ page, cityName }}
      >
        {({ data, loading }) => (
          <CountryProfilePresenter loading={loading} data={data} />
        )}
      </CountryProfileQuery>
    );
  }
}

export default withRouter(TripProfileContainer);
