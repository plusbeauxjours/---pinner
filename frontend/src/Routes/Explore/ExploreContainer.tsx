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
        {({ data: recommandUsersData, loading }) => (
          <NearCitiesQuery query={NEAR_CITY}>
            {({ data: nearCitiesData }) => (
              <NearCountriesQuery query={NEAR_COUNTRY}>
                {({ data: nearCountriesData }) => (
                  <ExplorePresenter
                    recommandUsersData={recommandUsersData}
                    nearCitiesData={nearCitiesData}
                    nearCountriesData={nearCountriesData}
                    loading={loading}
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
