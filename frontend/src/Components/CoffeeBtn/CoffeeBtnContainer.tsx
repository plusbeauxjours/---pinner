import React from "react";
import { Mutation } from "react-apollo";
import {
  Match,
  MatchVariables,
  UnMatch,
  UnMatchVariables
} from "../../types/api";
import { MATCH, UNMATCH } from "./CoffeeBtnQueries";
import { GET_MATCHES } from "../../Routes/Match/MatchQueries";
import { GET_COFFEES } from "../../Routes/User/Coffees/CoffeesQueries";
import CoffeeBtnPresenter from "./CoffeeBtnPresenter";
import { toast } from "react-toastify";
import { RouteComponentProps, withRouter } from "react-router";

class MatchMutation extends Mutation<Match, MatchVariables> {}

class UnMatchMutation extends Mutation<UnMatch, UnMatchVariables> {}

interface IProps extends RouteComponentProps {
  coffeeId?: string;
  matchId?: string;
  isSelf: boolean;
  isMatching: boolean;
}

interface IState {
  cityId: string;
  isMatching: boolean;
}

class CoffeeBtnContainer extends React.Component<IProps, IState> {
  public matchFn;
  public unMatchFn;
  constructor(props) {
    super(props);
    this.state = {
      cityId: props.cityId,
      isMatching: props.isMatching
    };
  }
  public render() {
    const { coffeeId, matchId, isSelf } = this.props;
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
              variables={{ coffeeId }}
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
                    isSelf={isSelf}
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
  public updateMatch = (cache, { data: { match } }) => {
    const { cityId } = this.state;
    try {
      const matchData = cache.readQuery({
        query: GET_MATCHES
      });
      console.log(matchData.getMatches.matches, match.match);
      if (matchData) {
        matchData.getMatches.matches.push(match.match);
        cache.writeQuery({
          query: GET_MATCHES,
          data: matchData
        });
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const feedData = cache.readQuery({
        query: GET_COFFEES,
        variables: {
          cityId: cityId || localStorage.getItem("cityId"),
          location: "city"
        }
      });
      if (feedData) {
        feedData.getCoffees.coffees = feedData.getCoffees.coffees.filter(
          i => i.uuid !== match.coffeeId
        );
        cache.writeQuery({
          query: GET_COFFEES,
          variables: {
            cityId: cityId || localStorage.getItem("cityId"),
            location: "city"
          },
          data: feedData
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  public onCompletedUnMatch = data => {
    const { unMatch } = data;
    if (unMatch.ok) {
      toast.success("UnMatch accepted, say bye");
    } else {
      toast.error("error");
    }
  };
  public updateUnMatch = (cache, { data: { unMatch } }) => {
    const { cityId } = this.state;
    try {
      const matchData = cache.readQuery({
        query: GET_MATCHES
      });
      if (matchData) {
        matchData.getMatches.matches = matchData.getMatches.matches.filter(
          i => parseInt(i.id, 10) !== unMatch.matchId
        );
        cache.writeQuery({
          query: GET_MATCHES,
          data: matchData
        });
      }
    } catch (e) {
      console.log(e);
    }
    if (unMatch.coffee.status !== "expired") {
      try {
        const feedData = cache.readQuery({
          query: GET_COFFEES,
          variables: {
            cityId: cityId || localStorage.getItem("cityId"),
            location: "city"
          }
        });
        if (feedData) {
          feedData.getCoffees.coffees.push(unMatch.coffee);
          cache.writeQuery({
            query: GET_COFFEES,
            variables: {
              cityId: cityId || localStorage.getItem("cityId"),
              location: "city"
            },
            data: feedData
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
}

export default withRouter(CoffeeBtnContainer);
