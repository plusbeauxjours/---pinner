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
  modalOpen: boolean;
  recommandUserList: any;
  nearCityList: any;
  nearCountryList: any;
  latestCityList: any;
  nearCityPage: number;
  nearCountryPage: number;
  latestCityPage: number;
  recommandUserPage: number;
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
      modalOpen: false,
      recommandUserList: null,
      nearCityList: null,
      nearCountryList: null,
      latestCityList: null,
      nearCityPage: 0,
      nearCountryPage: 0,
      latestCityPage: 0,
      recommandUserPage: 0
    };
  }
  public render = () => {
    const {
      modalOpen,
      nearCityPage,
      nearCountryPage,
      latestCityPage,
      recommandUserPage
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
                                modalOpen={modalOpen}
                                toggleModal={this.toggleModal}
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
  public toggleModal = () => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen
    } as any);
  };
  public toggleRecommandUserSeeAll = () => {
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
          ]
        });
      }
    });
  };
  public toggleNearCitySeeAll = () => {
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
          ]
        });
      }
    });
  };
  public toggleNearCountrySeeAll = () => {
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
          ]
        });
      }
    });
  };
  public toggleLatestCitySeeAll = () => {
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
          ]
        });
      }
    });
  };
}

export default ExploreContainer;
