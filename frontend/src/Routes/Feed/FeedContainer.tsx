import React from "react";
import { Query } from "react-apollo";
import { GET_FEED } from "./FeedQueries";
import { feed, feedVariables } from "../../types/api";
import FeedPresenter from "./FeedPresenter";

class FeedQuery extends Query<feed, feedVariables> {}

class FeedContainer extends React.Component<any> {
  public state = {
    page: 0
  };
  public render() {
    const { page } = this.state;
    return (
      <FeedQuery query={GET_FEED} variables={{ page }}>
        {({ data, loading, error }) => <FeedPresenter />}
      </FeedQuery>
    );
  }
}

export default FeedContainer;
