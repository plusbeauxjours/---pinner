import React from "react";
import { Mutation, Query } from "react-apollo";
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
  GetCoffees
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

class RequestCoffeeMutation extends Mutation<
  RequestCoffee,
  RequestCoffeeVariables
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
  coffeeList: any;
  coffeePage: number;
}

class FeedContainer extends React.Component<IProps, IState> {
  public coffeeFetchMore;
  public recommandUsersFetchMore;
  public requestCoffeeFn;
  public ReportLocationFn;
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
      coffeeList: null,
      coffeePage: 0
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
      coffeeList,
      coffeePage
    } = this.state;
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
                                  <FeedPresenter
                                    feedData={feedData}
                                    feedLoading={feedLoading}
                                    coffeeData={coffeeData}
                                    coffeeLoading={coffeeLoading}
                                    currentCity={currentCity}
                                    nowModalOpen={nowModalOpen}
                                    beforeModalOpen={beforeModalOpen}
                                    toggleNowModal={this.toggleNowModal}
                                    toggleBeforeModal={this.toggleBeforeModal}
                                    recommandUsersData={recommandUsersData}
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
                                    coffeeList={coffeeList}
                                    toggleCoffeeModal={this.toggleCoffeeModal}
                                    toggleCoffeeSeeAll={this.toggleCoffeeSeeAll}
                                    toggleRequestModal={this.toggleRequestModal}
                                    submitCoffee={this.submitCoffee}
                                    currentLat={currentLat}
                                    currentLng={currentLng}
                                    page={page}
                                  />
                                );
                              }}
                            </RecommandUsersQuery>
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
  public toggleRequestModal = () => {
    const { requestModalOpen } = this.state;
    this.setState({
      requestModalOpen: !requestModalOpen
    } as any);
  };
  public toggleCoffeeSeeAll = () => {
    const { coffeeModalOpen, currentCity } = this.state;
    this.coffeeFetchMore({
      query: GET_COFFEES,
      variables: { coffeePage: 1, cityName: currentCity },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        this.setState({
          coffeeList: [
            ...previousResult.getCoffees.coffees,
            ...fetchMoreResult.getCoffees.coffees
          ],
          coffeeModalOpen: !coffeeModalOpen
        } as any);
      }
    });
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
  public updateRequestCoffee = async (cache, { data: { requestCoffee } }) => {
    const { coffeePage, currentCity } = this.state;
    const data = cache.readQuery({
      query: GET_COFFEES,
      variables: { coffeePage, cityName: currentCity }
    });
    data.getCoffees.coffees.unshift(requestCoffee.coffee);
    await cache.writeQuery({
      query: GET_COFFEES,
      variables: { coffeePage, cityName: currentCity },
      data
    });
  };
}

export default FeedContainer;
