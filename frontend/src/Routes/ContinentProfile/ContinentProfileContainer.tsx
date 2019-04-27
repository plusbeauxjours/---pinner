import React from "react";
import { Query } from "react-apollo";
import ContinentProfilePresenter from "./ContinentProfilePresenter";
import { ContinentProfile, ContinentProfileVariables } from "../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import { CONTINENT_PROFILE } from "./ContinentProfileQueries";

class ContinentProfileQuery extends Query<
  ContinentProfile,
  ContinentProfileVariables
> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  page: number;
  countryList: any;
  countryModalOpen: boolean;
}
class ContinentProfileContainer extends React.Component<IProps, IState> {
  public fetchMore;
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      countryList: null,
      countryModalOpen: false
    };
  }
  public render() {
    const {
      match: {
        params: { continentName }
      }
    } = this.props;
    const { page, countryList, countryModalOpen } = this.state;
    return (
      <ContinentProfileQuery
        query={CONTINENT_PROFILE}
        variables={{ page, continentName }}
      >
        {({ data, loading, fetchMore }) => {
          this.fetchMore = fetchMore;

          console.log(data);
          return (
            <ContinentProfilePresenter
              data={data}
              loading={loading}
              countryList={countryList}
              countryModalOpen={countryModalOpen}
              toggleCountryModal={this.toggleCountryModal}
              toggleCountrySeeAll={this.toggleCountrySeeAll}
              continentName={continentName}
            />
          );
        }}
      </ContinentProfileQuery>
    );
  }

  public toggleCountryModal = () => {
    const { countryModalOpen } = this.state;
    this.setState({
      countryModalOpen: !countryModalOpen
    } as any);
  };
  public toggleCountrySeeAll = () => {
    const {
      match: {
        params: { continentName }
      }
    } = this.props;
    const { countryModalOpen } = this.state;
    this.fetchMore({
      query: CONTINENT_PROFILE,
      variables: { page: 1, continentName },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        this.setState({
          countryList: [
            ...previousResult.continentProfile.countries,
            ...fetchMoreResult.continentProfile.countries
          ],
          countryModalOpen: !countryModalOpen
        });
        console.log(this.state);
      }
    });
  };
}

export default withRouter(ContinentProfileContainer);
