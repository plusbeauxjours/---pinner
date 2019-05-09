import React from "react";
import { Query } from "react-apollo";
import { GetFollowingsVariables, GetFollowings } from "src/types/api";
import CoffeesPresenter from "./CoffeesPresenter";
import { GET_COFFEES } from "./CoffeesQueries";
import { RouteComponentProps } from "react-router";

class GetCoffeesQuery extends Query<GetFollowings, GetFollowingsVariables> {}

interface IProps extends RouteComponentProps<any> {}
interface IState {
  username: string;
}

class CoffeesContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = { username: props.username };
  }
  public render = () => {
    const {
      match: {
        params: { username }
      }
    } = this.props;
    return (
      <GetCoffeesQuery
        query={GET_COFFEES}
        variables={{ userName: username, location: "history" }}
      >
        {({ data, loading }) => {
          return (
            <CoffeesPresenter
              data={data}
              loading={loading}
              userName={username}
            />
          );
        }}
      </GetCoffeesQuery>
    );
  };
}

export default CoffeesContainer;
