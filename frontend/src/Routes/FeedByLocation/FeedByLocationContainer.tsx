import React from "react";
import { Query } from "react-apollo";
import FeedByLocationPresenter from "./FeedByLocationPresenter";
import { FeedByLocaion, FeedByLocaionVariables } from "../../types/api";
import { RouteComponentProps } from "react-router";
import { FEED_BY_LOCATION } from "./FeedByLocationQueries";

class FeedByLocationQuery extends Query<
  FeedByLocaion,
  FeedByLocaionVariables
> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  page: number;
  cityname: string;
}

class FeedByLocationContainer extends React.Component<IProps, IState> {
  public state = {
    page: 0,
    cityname: ""
  };
  public render() {
    const {
      match: {
        params: { cityname }
      }
    } = this.props;
    const { page } = this.state;
    return (
      <FeedByLocationQuery
        query={FEED_BY_LOCATION}
        variables={{ page, cityname }}
      >
        {({ data, loading }) => {
          console.log(data);
          return (
            <FeedByLocationPresenter
              loading={loading}
              data={data}
              cityname={cityname}
            />
          );
        }}
      </FeedByLocationQuery>
    );
  }
}

export default FeedByLocationContainer;
