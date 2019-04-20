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
import { toast } from "react-toastify";
import { GET_MATCHES } from "../../Routes/Match/MatchQueries";

class MatchMutation extends Mutation<Match, MatchVariables> {}

class UnMatchMutation extends Mutation<UnMatch, UnMatchVariables> {}

interface IProps {
  coffeeId?: string;
  matchId?: string;
  isMatching: boolean;
}

interface IState {
  isMatching: boolean;
}

class CoffeeBtnContainer extends React.Component<IProps, IState> {
  public matchFn;
  public unMatchFn;
  constructor(props) {
    super(props);
    this.state = {
      isMatching: props.isMatching
    };
  }
  public render() {
    const { coffeeId, matchId } = this.props;
    const { isMatching } = this.state;
    return (
      <UnMatchMutation
        mutation={UNMATCH}
        variables={{ matchId: parseInt(matchId, 10) }}
        onCompleted={this.onCompletedUnMatch}
        update={this.updateUnMatch}
      >
        {unMatchFn => {
          this.unMatchFn = unMatchFn;
          return (
            <MatchMutation
              mutation={MATCH}
              variables={{ coffeeId: parseInt(coffeeId, 10) }}
              onCompleted={this.onCompletedMatch}
              update={this.updateMatch}
            >
              {matchFn => {
                this.matchFn = matchFn;
                return (
                  <CoffeeBtnPresenter
                    isMatching={isMatching}
                    unMatchFn={unMatchFn}
                    matchFn={matchFn}
                  />
                );
              }}
            </MatchMutation>
          );
        }}
      </UnMatchMutation>
    );
  }
  public onCompletedMatch = data => {
    const { match } = data;
    if (match.ok) {
      toast.success("Match accepted, say hello");
    } else {
      toast.error("error");
    }
  };
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

  public onCompletedUnMatch = data => {
    const { unMatch } = data;
    if (unMatch.ok) {
      toast.success("UnMatch accepted, say bye");
    } else {
      toast.error("error");
    }
  };
  public updateUnMatch = async (cache, { data: { unMatch } }) => {
    const data = cache.readQuery({
      query: GET_MATCHES,
      variables: { matchPage: 0 }
    });
    const newCard = data.getMatches.matches.filter(
      i => parseInt(i.id, 10) !== unMatch.matchId
    );
    console.log(newCard);
    cache.writeQuery({
      query: GET_MATCHES,
      variables: { matchPage: 0 },
      data: {
        getMatches: {
          matches: newCard,
          __typename: "GetMatchesResponse"
        }
      }
    });
  };
}

export default CoffeeBtnContainer;
