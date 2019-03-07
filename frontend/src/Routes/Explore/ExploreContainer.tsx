import React from "react";
import ExplorePresenter from "./ExplorePresenter";
import { Query } from "react-apollo";
import { EXPLORE_QUERY } from "./ExploreQueries";
import { Explore } from "src/types/api";

class ExploreQuery extends Query<Explore> {}

interface IState {
  inline: boolean;
}

class ExploreContainer extends React.Component<any, IState> {
  public state = {
    inline: true
  };
  public render = () => {
    const { inline } = this.state;
    return (
      <ExploreQuery query={EXPLORE_QUERY} fetchPolicy="network-only">
        {({ data, loading }) => (
          <ExplorePresenter
            data={data}
            loading={loading}
            inline={inline}
            toggleInline={this.toggleInline}
          />
        )}
      </ExploreQuery>
    );
  };
  public toggleInline = () => {
    const { inline } = this.state;
    this.setState({
      inline: !inline
    });
  };
}

export default ExploreContainer;
