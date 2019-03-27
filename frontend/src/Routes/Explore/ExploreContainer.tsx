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
}

class ExploreContainer extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = {
      inline: false,
      modalOpen: false
    };
  }
  public render = () => {
    const { modalOpen } = this.state;
    return (
      <RecommandUsersQuery query={RECOMMAND_USERS}>
        {({ data: recommandUsersData, loading: recommandUsersLoading }) => (
          <NearCitiesQuery query={NEAR_CITIES}>
            {({ data: nearCitiesData, loading: nearCitiesLoading }) => (
              <NearCountriesQuery query={NEAR_COUNTRIES}>
                {({
                  data: nearCountriesData,
                  loading: nearCountriesLoading
                }) => (
                  <LatestCitiesQuery query={LATEST_CITIES}>
                    {({
                      data: latestCitiesData,
                      loading: latestCitiesLoading
                    }) => (
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
                    )}
                  </LatestCitiesQuery>
                )}
              </NearCountriesQuery>
            )}
          </NearCitiesQuery>
        )}
      </RecommandUsersQuery>
    );
  };
  public toggleModal = () => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen
    } as any);
  };
}

export default ExploreContainer;
