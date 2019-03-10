import React from "react";
import { Query } from "react-apollo";
import FeedByCityPresenter from "./FeedByCityPresenter";
import { FeedByCity, FeedByCityVariables } from "../../types/api";
import { RouteComponentProps } from "react-router";
import { GET_FEED_BY_CITY } from "./FeedByCityQueries";

class FeedByCityQuery extends Query<FeedByCity, FeedByCityVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  page: number;
  cityName: string;
}

class FeedByCityContainer extends React.Component<IProps, IState> {
  public state = {
    page: 0,
    cityName: ""
  };
  public render() {
    const {
      match: {
        params: { cityName }
      }
    } = this.props;
    const { page } = this.state;
    return (
      <FeedByCityQuery query={GET_FEED_BY_CITY} variables={{ page, cityName }}>
        {({ data, loading }) => {
          return (
            <FeedByCityPresenter
              loading={loading}
              data={data}
              cityName={cityName}
            />
          );
        }}
      </FeedByCityQuery>
    );
  }
}

export default FeedByCityContainer;
