import React from "react";
import ExplorePresenter from "./ExplorePresenter";
import { Query } from "react-apollo";
import { RECOMMAND_USERS, NEAR_CITY, NEAR_COUNTRY } from "./ExploreQueries";
import { RecommandUsers, NearCities, NearCountries } from "../../types/api";

class RecommandUsersQuery extends Query<RecommandUsers> {}
class NearCitiesQuery extends Query<NearCities> {}
class NearCountriesQuery extends Query<NearCountries> {}

interface IState {
  inline: boolean;
}

class ExploreContainer extends React.Component<any, IState> {
  public render = () => {
    return (
      <RecommandUsersQuery query={RECOMMAND_USERS}>
        {({ data: recommandUsersData, loading: recommandUsersLoading }) => (
          <NearCitiesQuery query={NEAR_CITY}>
            {({ data: nearCitiesData, loading: nearCitiesLoading }) => (
              <NearCountriesQuery query={NEAR_COUNTRY}>
                {({
                  data: nearCountriesData,
                  loading: nearCountriesLoading
                }) => (
                  <ExplorePresenter
                    recommandUsersData={recommandUsersData}
                    nearCitiesData={nearCitiesData}
                    nearCountriesData={nearCountriesData}
                    recommandUsersLoading={recommandUsersLoading}
                    nearCitiesLoading={nearCitiesLoading}
                    nearCountriesLoading={nearCountriesLoading}
                  />
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
