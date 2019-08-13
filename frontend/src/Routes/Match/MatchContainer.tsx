import React from "react";
import MatchPresenter from "./MatchPresenter";
import { Query, Mutation, MutationFn } from "react-apollo";
import {
  RecommendUsers,
  RequestCoffee,
  RequestCoffeeVariables,
  GetMatches,
  GetMatchesVariables,
  GetCoffees,
  GetCoffeesVariables,
  MarkAsReadMatch,
  MarkAsReadMatchVariables
} from "src/types/api";
import { toast } from "react-toastify";
import {
  GET_MATCHES,
  REQUEST_COFFEE,
  MARK_AS_READ_MATCH
} from "./MatchQueries";
import { GET_COFFEES } from "../User/Coffees/CoffeesQueries";
import { RECOMMAND_USERS } from "../Feed/PeoplePage/PeoplePageQueries";
import { RouteComponentProps, withRouter } from "react-router";

class GetMatchesQuery extends Query<GetMatches, GetMatchesVariables> {}
class GetCoffeesQuery extends Query<GetCoffees, GetCoffeesVariables> {}
class RecommendUsersQuery extends Query<RecommendUsers> {}
class RequestCoffeeMutation extends Mutation<
  RequestCoffee,
  RequestCoffeeVariables
> {}
class MarkAsReadMatchMutation extends Mutation<
  MarkAsReadMatch,
  MarkAsReadMatchVariables
> {}

interface IProps extends RouteComponentProps<any> {}
interface IState {
  search: string;
  matchList: any;
  currentLat: number;
  currentLng: number;
  currentCityId: string;
  requestModalOpen: boolean;
  coffeeReportModalOpen: boolean;
}

class MatchContainer extends React.Component<IProps, IState> {
  public requestCoffeeFn: MutationFn;
  public markAsReadMatchFn: MutationFn;
  public matchData;
  constructor(props) {
    super(props);
    const { location: { state = {} } = {} } = ({} = props);
    this.state = {
      search: "",
      matchList: [],
      currentLat: state.currentLat,
      currentLng: state.currentLng,
      currentCityId: state.currentCityId || localStorage.getItem("cityId"),
      requestModalOpen: false,
      coffeeReportModalOpen: false
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match.params !== newProps.match.params) {
      this.setState({ search: "" });
    }
  }
  public render = () => {
    const {
      search,
      matchList,
      currentCityId,
      currentLat,
      requestModalOpen,
      coffeeReportModalOpen,
      currentLng
    } = this.state;
    const isStaying = this.state.currentCityId === currentCityId;
    return (
      <MarkAsReadMatchMutation
        mutation={MARK_AS_READ_MATCH}
        update={this.updateMarkAsReadMatch}
      >
        {markAsReadMatchFn => {
          this.markAsReadMatchFn = markAsReadMatchFn;
          return (
            <RecommendUsersQuery query={RECOMMAND_USERS}>
              {({
                data: recommendUsersData,
                loading: recommendUsersLoading
              }) => {
                return (
                  <GetCoffeesQuery
                    query={GET_COFFEES}
                    variables={{
                      cityId: currentCityId,
                      location: "city"
                    }}
                  >
                    {({ data: coffeeData, loading: coffeeLoading }) => {
                      return (
                        <RequestCoffeeMutation
                          mutation={REQUEST_COFFEE}
                          variables={{
                            currentCityId
                          }}
                          onCompleted={this.onCompletedRequestCoffee}
                          update={this.updateRequestCoffee}
                        >
                          {requestCoffeeFn => {
                            this.requestCoffeeFn = requestCoffeeFn;
                            return (
                              <GetMatchesQuery query={GET_MATCHES}>
                                {({
                                  data: matchData,
                                  loading: matchLoading
                                }) => {
                                  this.matchData = matchData;
                                  return (
                                    <MatchPresenter
                                      matchData={matchData}
                                      matchLoading={matchLoading}
                                      recommendUsersData={recommendUsersData}
                                      recommendUsersLoading={
                                        recommendUsersLoading
                                      }
                                      coffeeData={coffeeData}
                                      coffeeLoading={coffeeLoading}
                                      search={search}
                                      matchList={matchList}
                                      currentLat={currentLat}
                                      currentLng={currentLng}
                                      currentCityId={currentCityId}
                                      onChange={this.onChange}
                                      requestModalOpen={requestModalOpen}
                                      coffeeReportModalOpen={
                                        coffeeReportModalOpen
                                      }
                                      toggleCoffeeReportModal={
                                        this.toggleCoffeeReportModal
                                      }
                                      toggleRequestModal={
                                        this.toggleRequestModal
                                      }
                                      submitCoffee={this.submitCoffee}
                                      isStaying={isStaying}
                                      searchSet={this.searchSet}
                                      markAsReadMatchFn={this.markAsReadMatchFn}
                                    />
                                  );
                                }}
                              </GetMatchesQuery>
                            );
                          }}
                        </RequestCoffeeMutation>
                      );
                    }}
                  </GetCoffeesQuery>
                );
              }}
            </RecommendUsersQuery>
          );
        }}
      </MarkAsReadMatchMutation>
    );
  };
  public searchSet = () => {
    this.setState({ search: "", matchList: [] });
  };
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    const {
      getMatches: { matches = null }
    } = this.matchData;
    const matchSearch = (list, text) =>
      list.filter(
        i =>
          i.host.profile.username.toLowerCase().includes(text.toLowerCase()) ||
          i.host.profile.currentCity.cityName
            .toLowerCase()
            .includes(text.toLowerCase()) ||
          i.host.profile.currentCity.country.countryName
            .toLowerCase()
            .includes(text.toLowerCase()) ||
          i.guest.profile.username.toLowerCase().includes(text.toLowerCase()) ||
          i.guest.profile.currentCity.cityName
            .toLowerCase()
            .includes(text.toLowerCase()) ||
          i.guest.profile.currentCity.country.countryName
            .toLowerCase()
            .includes(text.toLowerCase()) ||
          i.city.cityName.toLowerCase().includes(text.toLowerCase()) ||
          i.city.country.countryName.toLowerCase().includes(text.toLowerCase())
      );
    const matchList = matchSearch(matches, value);
    this.setState({
      search: value,
      matchList
    } as any);
  };
  public toggleCoffeeReportModal = () => {
    const { coffeeReportModalOpen } = this.state;
    this.setState({
      coffeeReportModalOpen: !coffeeReportModalOpen
    } as any);
  };
  public toggleRequestModal = () => {
    const { requestModalOpen } = this.state;
    this.setState({
      requestModalOpen: !requestModalOpen
    } as any);
  };
  public submitCoffee = target => {
    const { requestModalOpen } = this.state;
    this.requestCoffeeFn({ variables: { target } });
    this.setState({
      requestModalOpen: !requestModalOpen
    } as any);
  };
  public onCompletedRequestCoffee = data => {
    if (data.requestCoffee.coffee) {
      toast.success("Coffee requested, finding a guest");
    } else {
      toast.error("error");
    }
  };
  public updateRequestCoffee = (cache, { data: { requestCoffee } }) => {
    const { currentCityId } = this.state;
    try {
      const feedData = cache.readQuery({
        query: GET_COFFEES,
        variables: { cityId: currentCityId, location: "city" }
      });
      if (feedData) {
        feedData.getCoffees.coffees.unshift(requestCoffee.coffee);
        cache.writeQuery({
          query: GET_COFFEES,
          variables: { cityId: currentCityId, location: "city" },
          data: feedData
        });
      }
    } catch (e) {
      console.log(e);
    }
    const {
      coffee: {
        host: { username }
      }
    } = requestCoffee;
    try {
      const profileData = cache.readQuery({
        query: GET_COFFEES,
        variables: { userName: username, location: "profile" }
      });
      if (profileData) {
        profileData.getCoffees.coffees.push(requestCoffee.coffee);
        cache.writeQuery({
          query: GET_COFFEES,
          variables: { userName: username, location: "profile" },
          data: profileData
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  public updateMarkAsReadMatch = (cache, { data: { markAsReadMatch } }) => {
    try {
      const matchData = cache.readQuery({
        query: GET_MATCHES
      });
      console.log(markAsReadMatch);
      if (matchData) {
        matchData.getMatches.matches.find(
          i => i.id === markAsReadMatch.matchId
        ).isReadByHost = markAsReadMatch.isReadByHost;
        matchData.getMatches.matches.find(
          i => i.id === markAsReadMatch.matchId
        ).isReadByGuest = markAsReadMatch.isReadByGuest;
        cache.writeQuery({
          query: GET_MATCHES,
          data: matchData
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export default withRouter(MatchContainer);
