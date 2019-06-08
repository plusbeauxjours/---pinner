import React from "react";
import MatchPresenter from "./MatchPresenter";
import { Query, Mutation, MutationFn } from "react-apollo";
import {
  RecommandUsers,
  RequestCoffee,
  RequestCoffeeVariables,
  GetMatches,
  GetMatchesVariables,
  DeleteCoffee,
  DeleteCoffeeVariables,
  GetCoffees,
  GetCoffeesVariables
} from "src/types/api";
import { toast } from "react-toastify";
import { RouteComponentProps, withRouter } from "react-router";
import { GET_MATCHES, REQUEST_COFFEE } from "./MatchQueries";
import { DELETE_COFFEE } from "../Detail/CoffeeDetail/CoffeeDetailQueries";
import { GET_COFFEES } from "../User/Coffees/CoffeesQueries";
import { RECOMMAND_USERS } from "../Feed/PeoplePage/PeoplePageQueries";

class GetMatchesQuery extends Query<GetMatches, GetMatchesVariables> {}
class GetCoffeesQuery extends Query<GetCoffees, GetCoffeesVariables> {}
class RecommandUsersQuery extends Query<RecommandUsers> {}
class RequestCoffeeMutation extends Mutation<
  RequestCoffee,
  RequestCoffeeVariables
> {}

class DeleteCoffeeMutation extends Mutation<
  DeleteCoffee,
  DeleteCoffeeVariables
> {}

interface IProps extends RouteComponentProps<any> {}
interface IState {
  search: string;
  matchList: any;
  currentLat: number;
  currentLng: number;
  currentCity: string;
  requestModalOpen: boolean;
  requestingCoffeeModalOpen: boolean;
  coffeeReportModalOpen: boolean;
}

class MatchContainer extends React.Component<IProps, IState> {
  public deleteCoffeeFn: MutationFn;
  public requestCoffeeFn: MutationFn;
  public matchData;
  constructor(props) {
    super(props);
    const { location: { state = {} } = {} } = ({} = props);
    this.state = {
      search: "",
      matchList: [],
      currentLat: state.currentLat,
      currentLng: state.currentLng,
      currentCity: state.currentCity || localStorage.getItem("cityName"),
      requestModalOpen: false,
      requestingCoffeeModalOpen: false,
      coffeeReportModalOpen: false
    };
  }
  public render = () => {
    const {
      search,
      matchList,
      currentCity,
      currentLat,
      requestModalOpen,
      requestingCoffeeModalOpen,
      coffeeReportModalOpen,
      currentLng
    } = this.state;
    return (
      <DeleteCoffeeMutation
        mutation={DELETE_COFFEE}
        onCompleted={this.onCompletedDeleteCoffee}
        update={this.updateDeleteCoffee}
      >
        {deleteCoffeeFn => {
          this.deleteCoffeeFn = deleteCoffeeFn;
          return (
            <RecommandUsersQuery query={RECOMMAND_USERS}>
              {({
                data: recommandUsersData,
                loading: recommandUsersLoading
              }) => {
                return (
                  <GetCoffeesQuery
                    query={GET_COFFEES}
                    variables={{
                      cityName: currentCity,
                      location: "feed"
                    }}
                  >
                    {({ data: coffeeData, loading: coffeeLoading }) => {
                      return (
                        <RequestCoffeeMutation
                          mutation={REQUEST_COFFEE}
                          variables={{
                            currentCity
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
                                      recommandUsersData={recommandUsersData}
                                      recommandUsersLoading={
                                        recommandUsersLoading
                                      }
                                      coffeeData={coffeeData}
                                      coffeeLoading={coffeeLoading}
                                      search={search}
                                      matchList={matchList}
                                      currentLat={currentLat}
                                      currentLng={currentLng}
                                      currentCity={currentCity}
                                      onChange={this.onChange}
                                      requestModalOpen={requestModalOpen}
                                      requestingCoffeeModalOpen={
                                        requestingCoffeeModalOpen
                                      }
                                      coffeeReportModalOpen={
                                        coffeeReportModalOpen
                                      }
                                      toggleRequestingCoffeeModal={
                                        this.toggleRequestingCoffeeModal
                                      }
                                      toggleCoffeeReportModal={
                                        this.toggleCoffeeReportModal
                                      }
                                      toggleRequestModal={
                                        this.toggleRequestModal
                                      }
                                      submitCoffee={this.submitCoffee}
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
            </RecommandUsersQuery>
          );
        }}
      </DeleteCoffeeMutation>
    );
  };
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    console.log(this.matchData);
    const {
      getMatches: { matches = null }
    } = this.matchData;
    const nowSearch = (list, text) =>
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
    const matchList = nowSearch(matches, value);
    this.setState({
      search: value,
      matchList
    } as any);
  };
  public toggleRequestingCoffeeModal = () => {
    const { requestingCoffeeModalOpen } = this.state;
    this.setState({
      requestingCoffeeModalOpen: !requestingCoffeeModalOpen
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
    const { currentCity } = this.state;
    try {
      const feedData = cache.readQuery({
        query: GET_COFFEES,
        variables: { cityName: currentCity, location: "feed" }
      });
      if (feedData) {
        feedData.getCoffees.coffees.unshift(requestCoffee.coffee);
        cache.writeQuery({
          query: GET_COFFEES,
          variables: { cityName: currentCity, location: "feed" },
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
  public onCompletedDeleteCoffee = data => {
    const { requestingCoffeeModalOpen } = this.state;
    if (data.deleteCoffee.ok) {
      toast.success("Coffee deleted");
    } else {
      toast.error("error");
    }
    this.setState({
      requestingCoffeeModalOpen: !requestingCoffeeModalOpen
    } as any);
  };
  public updateDeleteCoffee = (cache, { data: { deleteCoffee } }) => {
    const { username } = deleteCoffee;
    const { currentCity } = this.state;
    console.log(deleteCoffee);

    try {
      const profileData = cache.readQuery({
        query: GET_COFFEES,
        variables: { username, location: "profile" }
      });
      if (profileData) {
        profileData.getCoffees.coffees = profileData.getCoffees.coffees.filter(
          i => parseInt(i.id, 10) !== deleteCoffee.coffeeId
        );
        profileData.getCoffees.coffees = profileData.getCoffees.coffees.filter(
          i => parseInt(i.id, 10) !== deleteCoffee.coffeeId
        );
        cache.writeQuery({
          query: GET_COFFEES,
          variables: { username, location: "profile" },
          data: profileData
        });
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const feedData = cache.readQuery({
        query: GET_COFFEES,
        variables: { cityName: currentCity, location: "feed" }
      });
      if (feedData) {
        feedData.getCoffees.coffees = feedData.getCoffees.coffees.filter(
          i => parseInt(i.id, 10) !== deleteCoffee.coffeeId
        );
        cache.writeQuery({
          query: GET_COFFEES,
          variables: {
            cityName: currentCity,
            location: "feed"
          },
          data: feedData
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export default withRouter(MatchContainer);
