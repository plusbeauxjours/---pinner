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
}

class ExploreContainer extends React.Component<any, IState> {
  public render = () => {
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
}

export default ExploreContainer;
