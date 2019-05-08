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
}

class CountryProfileContainer extends React.Component<IProps, IState> {
  public fetchMore;
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    };
  }
  public render() {
    const {
      match: {
        params: { countryName }
      }
    } = this.props;
    const { page } = this.state;
    return (
      <CountryProfileQuery
        query={COUNTRY_PROFILE}
        variables={{ page, countryName }}
      >
        {({ data, loading, fetchMore }) => {
          this.fetchMore = fetchMore;
          return (
            <CountryProfilePresenter
              loading={loading}
              data={data}
              countryName={countryName}
            />
          );
        }}
      </CountryProfileQuery>
    );
  }
}

export default withRouter(CountryProfileContainer);
