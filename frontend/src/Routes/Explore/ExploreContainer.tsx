import React from "react";
import ExplorePresenter from "./ExplorePresenter";
import { Query } from "react-apollo";
import { EXPLORE_QUERY } from "./ExploreQueries";

class ExploreQuery extends Query {}

class ExploreContainer extends React.Component<any> {
  public render = () => {
    return (
      <ExploreQuery query={EXPLORE_QUERY}>
        {({ data, loading }) => (
          <ExplorePresenter data={data} loading={loading} />
        )}
      </ExploreQuery>
    );
  };
}

export default ExploreContainer;
