import React from "react";
import ExplorePresenter from "./ExplorePresenter";
import { Query } from "react-apollo";
import { LATEST_CITIES } from "./ExploreQueries";
import { LatestCities } from "../../types/api";

class LatestCitiesQuery extends Query<LatestCities> {}

interface IState {
  inline: boolean;

  latestCityList: any;

  latestCityPage: number;

  latestCityModalOpen: boolean;
}

class ExploreContainer extends React.Component<any, IState> {
  public latestCitiesFetchMore;
  constructor(props) {
    super(props);
    this.state = {
      inline: false,

      latestCityList: null,

      latestCityPage: 0,

      latestCityModalOpen: false
    };
  }
  public render = () => {
    const { latestCityPage, latestCityList, latestCityModalOpen } = this.state;
    return (
      <LatestCitiesQuery query={LATEST_CITIES} variables={{ latestCityPage }}>
        {({
          data: latestCitiesData,
          loading: latestCitiesLoading,
          fetchMore: latestCitiesFetchMore
        }) => {
          this.latestCitiesFetchMore = latestCitiesFetchMore;
          return (
            <ExplorePresenter
              latestCitiesData={latestCitiesData}
              latestCitiesLoading={latestCitiesLoading}
              toggleLatestCitySeeAll={this.toggleLatestCitySeeAll}
              latestCityList={latestCityList}
              latestCityModalOpen={latestCityModalOpen}
              toggleLatestCityModal={this.toggleLatestCityModal}
            />
          );
        }}
      </LatestCitiesQuery>
    );
  };

  public toggleLatestCityModal = () => {
    const { latestCityModalOpen } = this.state;
    this.setState({
      latestCityModalOpen: !latestCityModalOpen
    } as any);
  };

  public toggleLatestCitySeeAll = () => {
    const { latestCityModalOpen } = this.state;
    this.latestCitiesFetchMore({
      query: LATEST_CITIES,
      variables: { latestCityPage: 1 },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        this.setState({
          latestCityList: [
            ...previousResult.latestCities.cities,
            ...fetchMoreResult.latestCities.cities
          ],
          latestCityModalOpen: !latestCityModalOpen
        });
      }
    });
  };
}

export default ExploreContainer;
