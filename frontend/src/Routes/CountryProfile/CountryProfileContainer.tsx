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
  cityList: any;
  cityModalOpen: boolean;
}

class CountryProfileContainer extends React.Component<IProps, IState> {
  public fetchMore;
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      cityList: null,
      cityModalOpen: false
    };
  }
  public render() {
    const {
      match: {
        params: { countryName }
      }
    } = this.props;
    console.log(this.props);
    console.log(countryName);
    const { page, cityList, cityModalOpen } = this.state;
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
              cityList={cityList}
              cityModalOpen={cityModalOpen}
              toggleCityModal={this.toggleCityModal}
              toggleCitySeeAll={this.toggleCitySeeAll}
            />
          );
        }}
      </CountryProfileQuery>
    );
  }
  public toggleCityModal = () => {
    const { cityModalOpen } = this.state;
    this.setState({
      cityModalOpen: !cityModalOpen
    } as any);
  };
  public toggleCitySeeAll = () => {
    const {
      match: {
        params: { countryName }
      }
    } = this.props;
    const { cityModalOpen } = this.state;
    this.fetchMore({
      query: COUNTRY_PROFILE,
      variables: { page: 1, countryName },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        this.setState({
          cityList: [
            ...previousResult.countryProfile.cities,
            ...fetchMoreResult.countryProfile.cities
          ],
          cityModalOpen: !cityModalOpen
        });
      }
    });
  };
}

export default withRouter(CountryProfileContainer);
