import React from "react";
import { Query } from "react-apollo";
import CountryProfilePresenter from "./CountryProfilePresenter";
import { CountryProfile, CountryProfileVariables } from "../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import { COUNTRY_PROFILE } from "./CountryProfileQueries";

class CountryProfileQuery extends Query<
  CountryProfile,
  CountryProfileVariables
> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  page: number;
  countryName: string;
}

class CountryProfileContainer extends React.Component<IProps, IState> {
  public state = {
    page: 0,
    countryName: ""
  };
  public render() {
    const {
      match: {
        params: { countryName }
      }
    } = this.props;
    console.log(this.props);
    console.log(countryName);
    const { page } = this.state;
    return (
      <CountryProfileQuery
        query={COUNTRY_PROFILE}
        variables={{ page, countryName }}
      >
        {({ data, loading }) => (
          <CountryProfilePresenter loading={loading} data={data} />
        )}
      </CountryProfileQuery>
    );
  }
}

export default withRouter(CountryProfileContainer);
