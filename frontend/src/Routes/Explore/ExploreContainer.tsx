import React from "react";
import ExplorePresenter from "./ExplorePresenter";
import { Query } from "react-apollo";
import { EXPLORE_QUERY } from "./ExploreQueries";
import { Explore } from "src/types/api";

class ExploreQuery extends Query<Explore> {}

class ExploreContainer extends React.Component<any> {
  public render = () => {
    return (
      <ExploreQuery query={EXPLORE_QUERY} fetchPolicy="network-only">
        {({ data, loading }) => (
          <ExplorePresenter data={data} loading={loading} />
        )}
      </ExploreQuery>
    );
  };
}

export default ExploreContainer;
