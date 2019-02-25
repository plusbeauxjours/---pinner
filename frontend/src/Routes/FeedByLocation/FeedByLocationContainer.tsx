import React from "react";
import { Query } from "react-apollo";
import FeedByLocationPresenter from "./FeedByLocationPresenter";
import { FeedByLocaion, FeedByLocaionVariables } from "../../types/api";
import { RouteComponentProps } from "react-router";
import { GET_FEED_BY_LOCATION } from "./FeedByLocationQueries";

class FeedByLocationQuery extends Query<
  FeedByLocaion,
  FeedByLocaionVariables
> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  page: number;
  countryname: string;
}

class FeedByLocationContainer extends React.Component<IProps, IState> {
  public state = {
    page: 0,
    countryname: ""
  };
  public render() {
    const {
      match: {
        params: { countryname }
      }
    } = this.props;
    const { page } = this.state;
    return (
      <FeedByLocationQuery
        query={GET_FEED_BY_LOCATION}
        variables={{ page, countryname }}
      >
        {({ data, loading }) => {
          return (
            <FeedByLocationPresenter
              loading={loading}
              data={data}
              countryname={countryname}
            />
          );
        }}
      </FeedByLocationQuery>
    );
  }
}

export default FeedByLocationContainer;
