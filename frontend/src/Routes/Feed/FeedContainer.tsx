import React from "react";
import { Query } from "react-apollo";
import FeedPresenter from "./FeedPresenter";
import { GET_FEED } from "./FeedQueries";

class FeedQuery extends Query {}

class FeedContainer extends React.Component {
  public state = {
    page: 0
  };
  public render() {
    const { page } = this.state;
    return (
      <FeedQuery
        query={GET_FEED}
        variables={{ page }}
        fetchPolicy="network-only"
      >
        {({ data, loading, error }) => (
          <FeedPresenter loading={loading} data={data} />
        )}
      </FeedQuery>
    );
  }
}

export default FeedContainer;
