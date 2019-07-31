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
  searchSet: () => void;
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
    const { searchSet } = this.props;
    const { match } = data;
    if (match.ok) {
      toast.success("Match accepted, say hello");
      {
        // tslint:disable-next-line:no-unused-expression
        searchSet && searchSet();
      }
    } else {
      toast.error("error");
    }
  };
  public updateMatch = (cache, { data: { match } }) => {
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
        console.log(matchData.getMatches.matches, match.match);
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const cityData = cache.readQuery({
        query: GET_COFFEES,
        variables: {
          cityId: match.cityId,
          location: "city"
        }
      });
      console.log(cityData.getCoffees.coffees, match.coffeeId);
      if (cityData) {
        cityData.getCoffees.coffees = cityData.getCoffees.coffees.filter(
          i => i.uuid !== match.coffeeId
        );
        cache.writeQuery({
          query: GET_COFFEES,
          variables: {
            cityId: match.cityId,
            location: "city"
          },
          data: cityData
        });
        console.log(cityData.getCoffees.coffees, match.coffeeId);
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const countryData = cache.readQuery({
        query: GET_COFFEES,
        variables: {
          countryCode: match.countryCode,
          location: "country"
        }
      });
      console.log(countryData.getCoffees.coffees, match.coffeeId);
      if (countryData) {
        countryData.getCoffees.coffees = countryData.getCoffees.coffees.filter(
          i => i.uuid !== match.coffeeId
        );
        cache.writeQuery({
          query: GET_COFFEES,
          variables: {
            countryCode: match.countryCode,
            location: "country"
          },
          data: countryData
        });
        console.log(countryData.getCoffees.coffees, match.coffeeId);
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const continentData = cache.readQuery({
        query: GET_COFFEES,
        variables: {
          continentCode: match.continentCode,
          location: "continent"
        }
      });
      console.log(continentData.getCoffees.coffees, match.coffeeId);
      if (continentData) {
        continentData.getCoffees.coffees = continentData.getCoffees.coffees.filter(
          i => i.uuid !== match.coffeeId
        );
        cache.writeQuery({
          query: GET_COFFEES,
          variables: {
            continentCode: match.continentCode,
            location: "continent"
          },
          data: continentData
        });
        console.log(continentData.getCoffees.coffees, match.coffeeId);
      }
    } catch (e) {
      console.log(e);
    }
  };

  public onCompletedUnMatch = data => {
    const { searchSet } = this.props;
    const { unMatch } = data;
    if (unMatch.ok) {
      toast.success("UnMatch accepted, say bye");
      {
        // tslint:disable-next-line:no-unused-expression
        searchSet && searchSet();
      }
    } else {
      toast.error("error");
    }
  };
  public updateUnMatch = (cache, { data: { unMatch } }) => {
    console.log(unMatch);
    try {
      const matchData = cache.readQuery({
        query: GET_MATCHES
      });
      console.log(matchData.getMatches.matches, unMatch.matchId);
      if (matchData) {
        matchData.getMatches.matches = matchData.getMatches.matches.filter(
          i => parseInt(i.id, 10) !== unMatch.matchId
        );
        cache.writeQuery({
          query: GET_MATCHES,
          data: matchData
        });
        console.log(matchData.getMatches.matches, unMatch.matchId);
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const cityData = cache.readQuery({
        query: GET_COFFEES,
        variables: { cityId: unMatch.cityId, location: "city" }
      });
      console.log(cityData.getCoffees.coffees, unMatch.coffee);
      if (unMatch.coffee.status !== "expired") {
        if (cityData) {
          cityData.getCoffees.coffees.push(unMatch.coffee);
          cache.writeQuery({
            query: GET_COFFEES,
            variables: { cityId: unMatch.cityId, location: "city" },
            data: cityData
          });
          console.log(cityData.getCoffees.coffees, unMatch.coffee);
        }
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const countryData = cache.readQuery({
        query: GET_COFFEES,
        variables: {
          countryCode: unMatch.countryCode,
          location: "country"
        }
      });
      console.log(countryData.getCoffees.coffees, unMatch.coffee);
      if (unMatch.coffee.status !== "expired") {
        if (countryData) {
          countryData.getCoffees.coffees.push(unMatch.coffee);
          cache.writeQuery({
            query: GET_COFFEES,
            variables: {
              countryCode: unMatch.countryCode,
              location: "country"
            },
            data: countryData
          });
          console.log(countryData.getCoffees.coffees, unMatch.coffee);
        }
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const continentData = cache.readQuery({
        query: GET_COFFEES,
        variables: {
          continentCode: unMatch.continentCode,
          location: "continent"
        }
      });
      console.log(continentData.getCoffees.coffees, unMatch.coffee);
      if (unMatch.coffee.status !== "expired") {
        if (continentData) {
          continentData.getCoffees.coffees.push(unMatch.coffee);
          cache.writeQuery({
            query: GET_COFFEES,
            variables: {
              continentCode: unMatch.continentCode,
              location: "continent"
            },
            data: continentData
          });
          console.log(continentData.getCoffees.coffees, unMatch.coffee);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export default withRouter(CoffeeBtnContainer);
