import React from "react";
import ExplorePresenter from "./ExplorePresenter";
import { Query } from "react-apollo";
import { RECOMMAND_USERS, LATEST_CITIES } from "./ExploreQueries";
import { RecommandUsers, LatestCities } from "../../types/api";

class RecommandUsersQuery extends Query<RecommandUsers> {}
class LatestCitiesQuery extends Query<LatestCities> {}

interface IState {
  inline: boolean;
  recommandUserList: any;

  latestCityList: any;

  latestCityPage: number;
  recommandUserPage: number;
  recommandUserModalOpen: boolean;

  latestCityModalOpen: boolean;
}

class ExploreContainer extends React.Component<any, IState> {
  public recommandUsersFetchMore;
  public latestCitiesFetchMore;
  constructor(props) {
    super(props);
    this.state = {
      inline: false,
      recommandUserList: null,

      latestCityList: null,
      recommandUserPage: 0,

      latestCityPage: 0,
      recommandUserModalOpen: false,

      latestCityModalOpen: false
    };
  }
  public render = () => {
    const {
      latestCityPage,
      recommandUserPage,
      recommandUserList,
      latestCityList,
      recommandUserModalOpen,
      latestCityModalOpen
    } = this.state;
    return (
      <RecommandUsersQuery
        query={RECOMMAND_USERS}
        variables={{ recommandUserPage }}
      >
        {({
          data: recommandUsersData,
          loading: recommandUsersLoading,
          fetchMore: recommandUsersFetchMore
        }) => {
          this.recommandUsersFetchMore = recommandUsersFetchMore;
          return (
            <LatestCitiesQuery
              query={LATEST_CITIES}
              variables={{ latestCityPage }}
            >
              {({
                data: latestCitiesData,
                loading: latestCitiesLoading,
                fetchMore: latestCitiesFetchMore
              }) => {
                this.latestCitiesFetchMore = latestCitiesFetchMore;
                return (
                  <ExplorePresenter
                    recommandUsersData={recommandUsersData}
                    recommandUsersLoading={recommandUsersLoading}
                    latestCitiesData={latestCitiesData}
                    latestCitiesLoading={latestCitiesLoading}
                    toggleRecommandUserSeeAll={this.toggleRecommandUserSeeAll}
                    toggleLatestCitySeeAll={this.toggleLatestCitySeeAll}
                    recommandUserList={recommandUserList}
                    latestCityList={latestCityList}
                    recommandUserModalOpen={recommandUserModalOpen}
                    latestCityModalOpen={latestCityModalOpen}
                    toggleLatestCityModal={this.toggleLatestCityModal}
                    toggleRecommandUserModal={this.toggleRecommandUserModal}
                  />
                );
              }}
            </LatestCitiesQuery>
          );
        }}
      </RecommandUsersQuery>
    );
  };
  public toggleRecommandUserModal = () => {
    const { recommandUserModalOpen } = this.state;
    this.setState({
      recommandUserModalOpen: !recommandUserModalOpen
    } as any);
  };
  public toggleLatestCityModal = () => {
    const { latestCityModalOpen } = this.state;
    this.setState({
      latestCityModalOpen: !latestCityModalOpen
    } as any);
  };
  public toggleRecommandUserSeeAll = () => {
    const { recommandUserModalOpen } = this.state;
    this.recommandUsersFetchMore({
      query: RECOMMAND_USERS,
      variables: { recommandUserPage: 1 },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        this.setState({
          recommandUserList: [
            ...previousResult.recommandUsers.users,
            ...fetchMoreResult.recommandUsers.users
          ],
          recommandUserModalOpen: !recommandUserModalOpen
        } as any);
      }
    });
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
