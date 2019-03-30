import React from "react";
import ExplorePresenter from "./ExplorePresenter";
import { Query } from "react-apollo";
import {
  RECOMMAND_USERS,
  NEAR_CITIES,
  NEAR_COUNTRIES,
  LATEST_CITIES
} from "./ExploreQueries";
import {
  RecommandUsers,
  NearCities,
  NearCountries,
  LatestCities
} from "../../types/api";

class RecommandUsersQuery extends Query<RecommandUsers> {}
class NearCitiesQuery extends Query<NearCities> {}
class NearCountriesQuery extends Query<NearCountries> {}
class LatestCitiesQuery extends Query<LatestCities> {}

interface IState {
  inline: boolean;
  recommandUserList: any;
  nearCityList: any;
  nearCountryList: any;
  latestCityList: any;
  nearCityPage: number;
  nearCountryPage: number;
  latestCityPage: number;
  recommandUserPage: number;
  recommandUserModalOpen: boolean;
  nearCityModalOpen: boolean;
  nearCountryModalOpen: boolean;
  latestCityModalOpen: boolean;
}

class ExploreContainer extends React.Component<any, IState> {
  public recommandUsersFetchMore;
  public nearCitiesFetchMore;
  public nearCountriesFetchMore;
  public latestCitiesFetchMore;
  constructor(props) {
    super(props);
    this.state = {
      inline: false,
      recommandUserList: null,
      nearCityList: null,
      nearCountryList: null,
      latestCityList: null,
      recommandUserPage: 0,
      nearCityPage: 0,
      nearCountryPage: 0,
      latestCityPage: 0,
      recommandUserModalOpen: false,
      nearCityModalOpen: false,
      nearCountryModalOpen: false,
      latestCityModalOpen: false
    };
  }
  public render = () => {
    const {
      nearCityPage,
      nearCountryPage,
      latestCityPage,
      recommandUserPage,
      recommandUserList,
      nearCityList,
      nearCountryList,
      latestCityList,
      recommandUserModalOpen,
      nearCityModalOpen,
      nearCountryModalOpen,
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
            <NearCitiesQuery query={NEAR_CITIES} variables={{ nearCityPage }}>
              {({
                data: nearCitiesData,
                loading: nearCitiesLoading,
                fetchMore: nearCitiesFetchMore
              }) => {
                this.nearCitiesFetchMore = nearCitiesFetchMore;
                return (
                  <NearCountriesQuery
                    query={NEAR_COUNTRIES}
                    variables={{ nearCountryPage }}
                  >
                    {({
                      data: nearCountriesData,
                      loading: nearCountriesLoading,
                      fetchMore: nearCountriesFetchMore
                    }) => {
                      this.nearCountriesFetchMore = nearCountriesFetchMore;
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
                                nearCitiesData={nearCitiesData}
                                nearCountriesData={nearCountriesData}
                                recommandUsersLoading={recommandUsersLoading}
                                nearCitiesLoading={nearCitiesLoading}
                                nearCountriesLoading={nearCountriesLoading}
                                latestCitiesData={latestCitiesData}
                                latestCitiesLoading={latestCitiesLoading}
                                toggleRecommandUserSeeAll={
                                  this.toggleRecommandUserSeeAll
                                }
                                toggleNearCitySeeAll={this.toggleNearCitySeeAll}
                                toggleNearCountrySeeAll={
                                  this.toggleNearCountrySeeAll
                                }
                                toggleLatestCitySeeAll={
                                  this.toggleLatestCitySeeAll
                                }
                                recommandUserList={recommandUserList}
                                nearCityList={nearCityList}
                                nearCountryList={nearCountryList}
                                latestCityList={latestCityList}
                                recommandUserModalOpen={recommandUserModalOpen}
                                nearCityModalOpen={nearCityModalOpen}
                                nearCountryModalOpen={nearCountryModalOpen}
                                latestCityModalOpen={latestCityModalOpen}
                                toggleNearCityModal={this.toggleNearCityModal}
                                toggleNearCountryModal={
                                  this.toggleNearCountryModal
                                }
                                toggleLatestCityModal={
                                  this.toggleLatestCityModal
                                }
                                toggleRecommandUserModal={
                                  this.toggleRecommandUserModal
                                }
                              />
                            );
                          }}
                        </LatestCitiesQuery>
                      );
                    }}
                  </NearCountriesQuery>
                );
              }}
            </NearCitiesQuery>
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
  public toggleNearCityModal = () => {
    const { nearCityModalOpen } = this.state;
    this.setState({
      nearCityModalOpen: !nearCityModalOpen
    } as any);
  };
  public toggleNearCountryModal = () => {
    const { nearCountryModalOpen } = this.state;
    this.setState({
      nearCountryModalOpen: !nearCountryModalOpen
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
  public toggleNearCitySeeAll = () => {
    const { nearCityModalOpen } = this.state;
    this.nearCitiesFetchMore({
      query: NEAR_CITIES,
      variables: { nearCityPage: 1 },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        this.setState({
          nearCityList: [
            ...previousResult.nearCities.cities,
            ...fetchMoreResult.nearCities.cities
          ],
          nearCityModalOpen: !nearCityModalOpen
        });
      }
    });
  };
  public toggleNearCountrySeeAll = () => {
    const { nearCountryModalOpen } = this.state;
    this.nearCountriesFetchMore({
      query: NEAR_COUNTRIES,
      variables: { nearCountryPage: 1 },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        this.setState({
          nearCountryList: [
            ...previousResult.nearCountries.countries,
            ...fetchMoreResult.nearCountries.countries
          ],
          nearCountryModalOpen: !nearCountryModalOpen
        });
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
