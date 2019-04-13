import React from "react";
import { Mutation } from "react-apollo";
import { Match, MatchVariables } from "../../types/api";
import { MATCH } from "./CoffeeBtnQueries";
import CoffeeBtnPresenter from "./CoffeeBtnPresenter";
import { toast } from "react-toastify";

class MatchMutation extends Mutation<Match, MatchVariables> {}

interface IProps {
  coffeeId: number;
}

class CoffeeBtnContainer extends React.Component<IProps> {
  public matchFn;
  constructor(props) {
    super(props);
  }
  public render() {
    const { coffeeId } = this.props;
    return (
      <MatchMutation
        mutation={MATCH}
        variables={{ coffeeId }}
        onCompleted={this.handleCoffeeRequest}
      >
        {matchFn => {
          this.matchFn = matchFn;

          return <CoffeeBtnPresenter matchFn={matchFn} />;
        }}
      </MatchMutation>
    );
  }
  public handleCoffeeRequest = data => {
    // const { history } = this.props;
    const { match } = data;
    if (match.ok) {
      toast.success("Match accepted, say hello");
      // history.push(`/coffee/${requestCoffee.coffee.id}`);
    } else {
      toast.error("error");
    }
  };
}

export default CoffeeBtnContainer;
