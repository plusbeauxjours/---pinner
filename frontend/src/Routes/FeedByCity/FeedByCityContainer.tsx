import React from "react";
import { Query } from "react-apollo";
import FeedByCityPresenter from "./FeedByCityPresenter";
import {
  FeedByCity,
  FeedByCityVariables,
  GetUsersByCity,
  GetUsersByCityVariables
} from "../../types/api";
import { RouteComponentProps } from "react-router";
import { GET_FEED_BY_CITY, GET_USERS_BY_CITY } from "./FeedByCityQueries";

class FeedByCityQuery extends Query<FeedByCity, FeedByCityVariables> {}
class GetUsersByCityQuery extends Query<
  GetUsersByCity,
  GetUsersByCityVariables
> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  page: number;
  cityname: string;
}

class FeedByCityContainer extends React.Component<IProps, IState> {
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
      <GetUsersByCityQuery query={GET_USERS_BY_CITY} variables={{ cityname }}>
        {({ data: getUserData }) => (
          <FeedByCityQuery
            query={GET_FEED_BY_CITY}
            variables={{ page, cityname }}
          >
            {({ data: getFeedData, loading }) => {
              return (
                <FeedByCityPresenter
                  loading={loading}
                  getUserData={getUserData}
                  getFeedData={getFeedData}
                  cityname={cityname}
                />
              );
            }}
          </FeedByCityQuery>
        )}
      </GetUsersByCityQuery>
    );
  }
}

export default FeedByCityContainer;
