import React from "react";
import { Mutation, Query, MutationFn } from "react-apollo";
import FeedPresenter from "./FeedPresenter";
import {
  RecommandUsers,
  RequestCoffee,
  RequestCoffeeVariables,
  GetCoffeesVariables,
  GetCoffees,
  DeleteCoffee,
  DeleteCoffeeVariables,
  GetFeedCards,
  GetFeedCardsVariables
} from "../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import { REQUEST_COFFEE, GET_FEED_CARDS } from "./FeedQueries";
import { RECOMMAND_USERS } from "../PeoplePage/PeoplePageQueries";
import { GET_COFFEES } from "../Coffees/CoffeesQueries";
import { toast } from "react-toastify";
import { DELETE_COFFEE } from "../../Routes/UserProfile/UserProfileQueries";

class RequestCoffeeMutation extends Mutation<
  RequestCoffee,
  RequestCoffeeVariables
> {}
class DeleteCoffeeMutation extends Mutation<
  DeleteCoffee,
  DeleteCoffeeVariables
> {}

class RecommandUsersQuery extends Query<RecommandUsers> {}

class GetCardsQuery extends Query<GetFeedCards, GetFeedCardsVariables> {}
class GetCoffeesQuery extends Query<GetCoffees, GetCoffeesVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  currentLat: number;
  currentLng: number;
  currentCity: string;
  requestModalOpen: boolean;
  requestingCoffeeModalOpen: boolean;
  coffeeReportModalOpen: boolean;
  coffeeId: string;
}

class FeedContainer extends React.Component<IProps, IState> {
  public cardsFetchMore;
  public requestCoffeeFn: MutationFn;
  public ReportLocationFn: MutationFn;
  public deleteCoffeeFn: MutationFn;
  constructor(props) {
    super(props);
    const { location: { state = {} } = {} } = ({} = props);
    this.state = {
      currentLat: state.currentLat,
      currentLng: state.currentLng,
      currentCity: state.currentCity || localStorage.getItem("cityName"),
      requestModalOpen: false,
      requestingCoffeeModalOpen: false,
      coffeeReportModalOpen: false,
      coffeeId: null
    };
  }
  public render() {
    console.log(this.state);
    const {
      currentLat,
      currentLng,
      currentCity,
      requestModalOpen,
      requestingCoffeeModalOpen,
      coffeeReportModalOpen,
      coffeeId
    } = this.state;
    return (
      <GetCardsQuery
        query={GET_FEED_CARDS}
        variables={{
          cityName: currentCity
        }}
      >
        {({
          data: cardsData,
          loading: cardsLoading,
          fetchMore: cardsFetchMore
        }) => {
          this.cardsFetchMore = cardsFetchMore;
          return (
            <DeleteCoffeeMutation
              mutation={DELETE_COFFEE}
              variables={{
                coffeeId: parseInt(coffeeId, 10)
              }}
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
                                    <FeedPresenter
                                      coffeeData={coffeeData}
                                      coffeeLoading={coffeeLoading}
                                      currentCity={currentCity}
                                      toggleRequestingCoffeeModal={
                                        this.toggleRequestingCoffeeModal
                                      }
                                      toggleCoffeeReportModal={
                                        this.toggleCoffeeReportModal
                                      }
                                      recommandUsersData={recommandUsersData}
                                      recommandUsersLoading={
                                        recommandUsersLoading
                                      }
                                      requestModalOpen={requestModalOpen}
                                      requestingCoffeeModalOpen={
                                        requestingCoffeeModalOpen
                                      }
                                      coffeeReportModalOpen={
                                        coffeeReportModalOpen
                                      }
                                      toggleRequestModal={
                                        this.toggleRequestModal
                                      }
                                      submitCoffee={this.submitCoffee}
                                      currentLat={currentLat}
                                      currentLng={currentLng}
                                      deleteCoffee={this.deleteCoffee}
                                      loadMore={this.loadMore}
                                      cardsData={cardsData}
                                      cardsLoading={cardsLoading}
                                    />
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
        }}
      </GetCardsQuery>
    );
  }
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
  public deleteCoffee = () => {
    const { coffeeId } = this.state;
    this.deleteCoffeeFn({ variables: { coffeeId: parseInt(coffeeId, 10) } });
  };
  public loadMore = page => {
    const { currentCity } = this.state;
    this.cardsFetchMore({
      query: GET_FEED_CARDS,
      variables: {
        page,
        cityName: currentCity
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        const newData = {
          getFeedCards: {
            ...previousResult.getFeedCards,
            cards: [
              ...previousResult.getFeedCards.cards,
              ...fetchMoreResult.getFeedCards.cards
            ]
          }
        };
        return newData;
      }
    });
    console.log(this.state);
  };
}

export default withRouter(FeedContainer);
