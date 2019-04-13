import React from "react";
import MatchPresenter from "./MatchPresenter";
import { Query } from "react-apollo";
import { GetMatches, GetMatchesVariables } from "src/types/api";
import { GET_MATCHES } from "./MatchQueries";

class GetMatchesQuery extends Query<GetMatches, GetMatchesVariables> {}

interface IState {
  matchPage: number;
}

class MatchContainer extends React.Component<any, IState> {
  public latestCitiesFetchMore;
  constructor(props) {
    super(props);
    this.state = {
      matchPage: 0
    };
  }
  public render = () => {
    const { matchPage } = this.state;
    return (
      <GetMatchesQuery query={GET_MATCHES} variables={{ matchPage }}>
        {({ data: matchData, loading: matchLoading }) => (
          <MatchPresenter matchData={matchData} matchLoading={matchLoading} />
        )}
      </GetMatchesQuery>
    );
  };
}

export default MatchContainer;
