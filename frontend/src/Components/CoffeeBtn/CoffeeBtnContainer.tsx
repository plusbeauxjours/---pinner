import React from "react";
import { Mutation } from "react-apollo";
import { Match, MatchVariables } from "../../types/api";
import { MATCH } from "./CoffeeBtnQueries";
import CoffeeBtnPresenter from "./CoffeeBtnPresenter";
import { toast } from "react-toastify";
import { GET_MATCHES } from "../../Routes/Match/MatchQueries";

class MatchMutation extends Mutation<Match, MatchVariables> {}

interface IProps {
  coffeeId: number;
}

interface IState {
  isMatching: boolean;
}

class CoffeeBtnContainer extends React.Component<IProps, IState> {
  public matchFn;
  constructor(props) {
    super(props);
    this.state = {
      isMatching: props.isMatching
    };
  }
  public render() {
    const { coffeeId } = this.props;

    return (
      <MatchMutation
        mutation={MATCH}
        variables={{ coffeeId }}
        onCompleted={this.handleCoffeeRequest}
        update={this.updateMatch}
      >
        {matchFn => {
          this.matchFn = matchFn;

          return <CoffeeBtnPresenter matchFn={matchFn} />;
        }}
      </MatchMutation>
    );
  }
  public updateMatch = async (cache, { data: { match } }) => {
    const data = cache.readQuery({
      query: GET_MATCHES,
      variables: { matchPage: 0 }
    });
    data.getMatches.matches.unshift(match.match);
    await cache.writeQuery({
      query: GET_MATCHES,
      variables: { matchPage: 0 },
      data
    });
  };
  public handleCoffeeRequest = data => {
    const { match } = data;
    if (match.ok) {
      toast.success("Match accepted, say hello");
    } else {
      toast.error("error");
    }
  };
}

export default CoffeeBtnContainer;
