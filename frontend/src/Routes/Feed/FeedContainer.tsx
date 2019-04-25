import React from "react";
import { Mutation, Query, MutationFn } from "react-apollo";
import FeedPresenter from "./FeedPresenter";
import {
  ReportLocation,
  ReportLocationVariables,
  Feed,
  FeedVariables,
  RecommandUsers,
  RequestCoffee,
  RequestCoffeeVariables,
  GetCoffeesVariables,
  GetCoffees,
  DeleteCoffee,
  DeleteCoffeeVariables
} from "../../types/api";
import { RouteComponentProps } from "react-router";
import { REPORT_LOCATION } from "../Home/HomeQueries";
import { reverseGeoCode } from "../../mapHelpers";
import {
  RECOMMAND_USERS,
  GET_FEED,
  REQUEST_COFFEE,
  GET_COFFEES
} from "./FeedQueries";
import {
  cityThumbnail,
  countryThumbnail,
  continentThumbnail
} from "../../locationThumbnail";
import continents from "../../continents";
import { toast } from "react-toastify";
import {
  GET_MY_COFFEE,
  DELETE_COFFEE
} from "../../Routes/UserProfile/UserProfileQueries";

class RequestCoffeeMutation extends Mutation<
  RequestCoffee,
  RequestCoffeeVariables
> {}
class DeleteCoffeeMutation extends Mutation<
  DeleteCoffee,
  DeleteCoffeeVariables
> {}

class RecommandUsersQuery extends Query<RecommandUsers> {}
class ReportLocationMutation extends Mutation<
  ReportLocation,
  ReportLocationVariables
> {}
class FeedQuery extends Query<Feed, FeedVariables> {}

class GetCoffeesQuery extends Query<GetCoffees, GetCoffeesVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  recommandUserPage: number;
  recommandUserList: any;
  recommandUserModalOpen: boolean;
  page: number;
  nowModalOpen: boolean;
  beforeModalOpen: boolean;
  currentLat: number;
  currentLng: number;
  currentCity: string;
  currentCountry: string;
  currentCountryCode: string;
  currentContinent: string;
  cityPhotoURL: string;
  countryPhotoURL: string;
  continentPhotoURL: string;
  requestModalOpen: boolean;
  coffeeModalOpen: boolean;
  coffeeReportModalOpen: boolean;
  coffeePage: number;
  coffeeId: string;
}

class FeedContainer extends React.Component<IProps, IState> {
  public coffeeFetchMore;
  public recommandUsersFetchMore;
  public requestCoffeeFn: MutationFn;
  public ReportLocationFn: MutationFn;
  public deleteCoffeeFn: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      recommandUserPage: 0,
      recommandUserList: null,
      recommandUserModalOpen: false,
      page: 0,
      nowModalOpen: false,
      beforeModalOpen: false,
      currentLat: 0,
      currentLng: 0,
      currentCity: null,
      currentCountry: null,
      currentCountryCode: null,
      currentContinent: null,
      cityPhotoURL: null,
      countryPhotoURL: null,
      continentPhotoURL: null,
      requestModalOpen: false,
      coffeeModalOpen: false,
      coffeeReportModalOpen: false,
      coffeePage: 0,
      coffeeId: null
    };
  }
  public componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
    console.log("goodmorning");
  }

  public render() {
    const {
      recommandUserPage,
      recommandUserList,
      recommandUserModalOpen,
      page,
      nowModalOpen,
      beforeModalOpen,
      currentLat,
      currentLng,
      currentCity,
      currentCountry,
      currentCountryCode,
      currentContinent,
      cityPhotoURL,
      countryPhotoURL,
      continentPhotoURL,
      requestModalOpen,
      coffeeModalOpen,
      coffeeReportModalOpen,
      coffeePage,
      coffeeId
    } = this.state;
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
            <RecommandUsersQuery
              query={RECOMMAND_USERS}
              variables={{ recommandUserPage }}
            >
              {({
                data: recommandUsersData,
                loading: recommandUsersLoading,
                fetchMore: recommandUsersFetchMore
              }) => {
                this.recommandUsersFetchMore = recommandUsersFetchMore;
                return (
                  <GetCoffeesQuery
                    query={GET_COFFEES}
                    variables={{ cityName: currentCity, coffeePage }}
                  >
                    {({
                      data: coffeeData,
                      loading: coffeeLoading,
                      fetchMore: coffeeFetchMore
                    }) => {
                      this.coffeeFetchMore = coffeeFetchMore;
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
                              <FeedQuery
                                query={GET_FEED}
                                variables={{
                                  page,
                                  cityName: currentCity
                                }}
                              >
                                {({ data: feedData, loading: feedLoading }) => (
                                  <ReportLocationMutation
                                    mutation={REPORT_LOCATION}
                                    variables={{
                                      currentLat,
                                      currentLng,
                                      currentCity,
                                      currentCountry,
                                      currentCountryCode,
                                      currentContinent,
                                      cityPhotoURL,
                                      countryPhotoURL,
                                      continentPhotoURL
                                    }}
                                  >
                                    {ReportLocationFn => {
                                      this.ReportLocationFn = ReportLocationFn;
                                      return (
                                        <FeedPresenter
                                          feedData={feedData}
                                          feedLoading={feedLoading}
                                          coffeeData={coffeeData}
                                          coffeeLoading={coffeeLoading}
                                          currentCity={currentCity}
                                          nowModalOpen={nowModalOpen}
                                          beforeModalOpen={beforeModalOpen}
                                          toggleNowModal={this.toggleNowModal}
                                          toggleBeforeModal={
                                            this.toggleBeforeModal
                                          }
                                          toggleCoffeeModal={
                                            this.toggleCoffeeModal
                                          }
                                          toggleCoffeeReportModal={
                                            this.toggleCoffeeReportModal
                                          }
                                          recommandUsersData={
                                            recommandUsersData
                                          }
                                          recommandUsersLoading={
                                            recommandUsersLoading
                                          }
                                          recommandUserList={recommandUserList}
                                          recommandUserModalOpen={
                                            recommandUserModalOpen
                                          }
                                          toggleRecommandUserModal={
                                            this.toggleRecommandUserModal
                                          }
                                          toggleRecommandUserSeeAll={
                                            this.toggleRecommandUserSeeAll
                                          }
                                          requestModalOpen={requestModalOpen}
                                          coffeeModalOpen={coffeeModalOpen}
                                          coffeeReportModalOpen={
                                            coffeeReportModalOpen
                                          }
                                          toggleRequestModal={
                                            this.toggleRequestModal
                                          }
                                          submitCoffee={this.submitCoffee}
                                          currentLat={currentLat}
                                          currentLng={currentLng}
                                          page={page}
                                          getCoffeeId={this.getCoffeeId}
                                          deleteCoffee={this.deleteCoffee}
                                        />
                                      );
                                    }}
                                  </ReportLocationMutation>
                                )}
                              </FeedQuery>
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
  }
  public handleGeoSuccess = (position: Position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    this.setState({
      currentLat: latitude,
      currentLng: longitude
    });
    this.getAddress(latitude, longitude);
  };
  public getAddress = async (lat: number, lng: number) => {
    const address = await reverseGeoCode(lat, lng);
    if (address) {
      this.setState({
        currentCity: address.storableLocation.city,
        currentCountry: address.storableLocation.country,
        currentCountryCode: address.storableLocation.countryCode
      });
      this.reportLocation(
        lat,
        lng,
        address.storableLocation.city,
        address.storableLocation.country,
        address.storableLocation.countryCode
      );
    }
  };
  public reportLocation = async (
    lat: number,
    lng: number,
    currentCity: string,
    currentCountry: string,
    currentCountryCode: string
  ) => {
    const cityPhotoURL = await cityThumbnail(currentCity);
    const countryPhotoURL = await countryThumbnail(currentCountry);
    const currentContinent = await continents[currentCountryCode];
    const continentPhotoURL = await continentThumbnail(currentContinent);
    this.setState({
      cityPhotoURL,
      countryPhotoURL,
      currentContinent,
      continentPhotoURL
    });
    localStorage.setItem("cityName", currentCity);
    this.ReportLocationFn({
      variables: {
        currentLat: lat,
        currentLng: lng,
        currentCity,
        currentCountry,
        currentCountryCode,
        currentContinent,
        cityPhotoURL,
        countryPhotoURL,
        continentPhotoURL
      }
    });
  };
  public handleGeoError = () => {
    console.log("No location");
  };
  public toggleNowModal = () => {
    const { nowModalOpen } = this.state;
    this.setState({
      nowModalOpen: !nowModalOpen
    } as any);
  };
  public toggleBeforeModal = () => {
    const { beforeModalOpen } = this.state;
    this.setState({
      beforeModalOpen: !beforeModalOpen
    } as any);
  };
  public toggleRecommandUserModal = () => {
    const { recommandUserModalOpen } = this.state;
    this.setState({
      recommandUserModalOpen: !recommandUserModalOpen
    } as any);
  };
  public toggleRecommandUserSeeAll = () => {
    const { recommandUserModalOpen } = this.state;
    this.recommandUsersFetchMore({
      query: RECOMMAND_USERS,
      variables: { recommandUserPage: 1 },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        this.setState({
          recommandUserList: [
            ...previousResult.recommandUsers.users,
            ...fetchMoreResult.recommandUsers.users
          ],
          recommandUserModalOpen: !recommandUserModalOpen
        } as any);
      }
    });
  };
  public toggleCoffeeModal = () => {
    const { coffeeModalOpen } = this.state;
    this.setState({
      coffeeModalOpen: !coffeeModalOpen
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
    const { coffeePage, currentCity } = this.state;
    try {
      const feedData = cache.readQuery({
        query: GET_COFFEES,
        variables: { coffeePage, cityName: currentCity }
      });
      if (feedData) {
        feedData.getCoffees.coffees.unshift(requestCoffee.coffee);
        cache.writeQuery({
          query: GET_COFFEES,
          variables: { coffeePage, cityName: currentCity },
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
        query: GET_MY_COFFEE,
        variables: { username }
      });
      console.log(username);
      if (profileData) {
        profileData.getMyCoffee.requestingCoffees.push(requestCoffee.coffee);
        cache.writeQuery({
          query: GET_MY_COFFEE,
          variables: { username },
          data: profileData
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  public onCompletedDeleteCoffee = data => {
    const { coffeeModalOpen } = this.state;
    if (data.deleteCoffee.ok) {
      toast.success("Coffee deleted");
    } else {
      toast.error("error");
    }
    this.setState({
      coffeeModalOpen: !coffeeModalOpen
    } as any);
  };
  public updateDeleteCoffee = (cache, { data: { deleteCoffee } }) => {
    const { username } = deleteCoffee;
    const { currentCity, coffeePage } = this.state;
    console.log(deleteCoffee);

    try {
      const data = cache.readQuery({
        query: GET_MY_COFFEE,
        variables: { username }
      });
      console.log(data);
      if (data) {
        data.getMyCoffee.coffees = data.getMyCoffee.coffees.filter(
          i => parseInt(i.id, 10) !== deleteCoffee.coffeeId
        );
        data.getMyCoffee.requestingCoffees = data.getMyCoffee.requestingCoffees.filter(
          i => parseInt(i.id, 10) !== deleteCoffee.coffeeId
        );
        console.log(data.getMyCoffee);
        data.getMyCoffee.cache.writeQuery({
          query: GET_MY_COFFEE,
          variables: { username },
          data
        });
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const feedData = cache.readQuery({
        query: GET_COFFEES,
        variables: { coffeePage, cityName: currentCity }
      });
      if (feedData) {
        feedData.getCoffees.coffees = feedData.getCoffees.coffees.filter(
          i => parseInt(i.id, 10) !== deleteCoffee.coffeeId
        );
        cache.writeQuery({
          query: GET_COFFEES,
          variables: {
            coffeePage,
            cityName: currentCity
          },
          data: feedData
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  public getCoffeeId = coffeeId => {
    const { coffeeModalOpen } = this.state;
    this.setState({
      coffeeModalOpen: !coffeeModalOpen,
      coffeeId
    } as any);
  };
  public deleteCoffee = () => {
    const { coffeeId } = this.state;
    this.deleteCoffeeFn({ variables: { coffeeId: parseInt(coffeeId, 10) } });
  };
}

export default FeedContainer;
