import React from "react";
import { Mutation } from "react-apollo";
import {
  Match,
  MatchVariables,
  UnMatch,
  UnMatchVariables
} from "../../types/api";
import { MATCH, UNMATCH } from "./CoffeeBtnQueries";
import CoffeeBtnPresenter from "./CoffeeBtnPresenter";

class MatchMutation extends Mutation<Match, MatchVariables> {}
class UnMatchMutation extends Mutation<UnMatch, UnMatchVariables> {}

interface IState {
  isFollowing: boolean;
}

class CoffeeBtnContainer extends React.Component<any, IState> {
  public unMatchFn;
  public matchFn;
  constructor(props) {
    super(props);
    this.state = {
      isFollowing: props.isFollowing
    };
  }
  public render() {
    const { isFollowing } = this.state;
    const { coffeeId, matchId } = this.props;
    return (
      <MatchMutation mutation={MATCH} variables={{ coffeeId }}>
        {matchFn => {
          this.matchFn = matchFn;
          return (
            <UnMatchMutation mutation={UNMATCH} variables={{ matchId }}>
              {unMatchFn => {
                this.unMatchFn = unMatchFn;
                return (
                  <CoffeeBtnPresenter
                    isFollowing={isFollowing}
                    matchFn={matchFn}
                    unMatchFn={unMatchFn}
                  />
                );
              }}
            </UnMatchMutation>
          );
        }}
      </MatchMutation>
    );
  }
  public toggleBtn = () => {
    this.setState(state => {
      return {
        isFollowing: !state.isFollowing
      };
    });
  };
}

export default CoffeeBtnContainer;
