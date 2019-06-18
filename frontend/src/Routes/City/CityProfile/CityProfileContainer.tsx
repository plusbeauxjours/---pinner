import React from "react";
import { Query, MutationFn, Mutation } from "react-apollo";
import CityProfilePresenter from "./CityProfilePresenter";
import {
  CityProfile,
  CityProfileVariables,
  NearCities,
  NearCitiesVariables,
  RequestCoffee,
  RequestCoffeeVariables,
  GetCoffees,
  GetCoffeesVariables,
  GetSamenameCities,
  GetSamenameCitiesVariables
} from "../../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import { CITY_PROFILE, GET_SAMENAME_CITIES } from "./CityProfileQueries";
import { NEAR_CITIES } from "../NearCities/NearCitiesQueries";
import { GET_COFFEES } from "../../User/Coffees/CoffeesQueries";
import { toast } from "react-toastify";
import { REQUEST_COFFEE } from "../../Match/MatchQueries";

class CityProfileQuery extends Query<CityProfile, CityProfileVariables> {}
class GetSamenameCitiesQuery extends Query<
  GetSamenameCities,
  GetSamenameCitiesVariables
> {}
class GetCoffeesQuery extends Query<GetCoffees, GetCoffeesVariables> {}
class NearCitiesQuery extends Query<NearCities, NearCitiesVariables> {}
class RequestCoffeeMutation extends Mutation<
  RequestCoffee,
  RequestCoffeeVariables
> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  search: string;
  usersNowList: any;
  currentCityId: string;
  coffeeReportModalOpen: boolean;
  coffeeRequestModalOpen: boolean;
  usersNowActiveId: number;
}

class CityProfileContainer extends React.Component<IProps, IState> {
  public data;
  public coffeeFetchMore;
  public requestCoffeeFn: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      usersNowList: [],
      currentCityId: localStorage.getItem("cityId"),
      coffeeReportModalOpen: false,
      coffeeRequestModalOpen: false,
      usersNowActiveId: null
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match.params.cityId !== newProps.match.params.cityId) {
      this.setState({ search: "", usersNowList: [] });
    }
  }
  public render() {
    console.log(this.props);
    const {
      match: {
        params: { cityId }
      }
    } = this.props;
    const isStaying = this.state.currentCityId === cityId;
    console.log("isStaying::::", isStaying);
    const {
      search,
      usersNowList,
      coffeeReportModalOpen,
      coffeeRequestModalOpen,
      usersNowActiveId
    } = this.state;
    return (
      <GetSamenameCitiesQuery
        query={GET_SAMENAME_CITIES}
        variables={{ cityId }}
      >
        {({ data: samenameCitiesData, loading: samenameCitiesLoading }) => {
          return (
            <GetCoffeesQuery
              query={GET_COFFEES}
              variables={{
                cityId,
                location: "city"
              }}
            >
              {({ data: coffeeData, loading: coffeeLoading }) => {
                return (
                  <RequestCoffeeMutation
                    mutation={REQUEST_COFFEE}
                    variables={{
                      currentCityId: cityId
                    }}
                    onCompleted={this.onCompletedRequestCoffee}
                    update={this.updateRequestCoffee}
                  >
                    {requestCoffeeFn => {
                      this.requestCoffeeFn = requestCoffeeFn;
                      return (
                        <NearCitiesQuery
                          query={NEAR_CITIES}
                          variables={{ cityId }}
                        >
                          {({
                            data: nearCitiesData,
                            loading: nearCitiesLoading
                          }) => {
                            return (
                              <CityProfileQuery
                                query={CITY_PROFILE}
                                variables={{ cityId }}
                              >
                                {({ data: cityData, loading: cityLoading }) => {
                                  this.data = cityData;
                                  return (
                                    <CityProfilePresenter
                                      samenameCitiesData={samenameCitiesData}
                                      samenameCitiesLoading={
                                        samenameCitiesLoading
                                      }
                                      coffeeData={coffeeData}
                                      coffeeLoading={coffeeLoading}
                                      cityData={cityData}
                                      cityLoading={cityLoading}
                                      nearCitiesData={nearCitiesData}
                                      nearCitiesLoading={nearCitiesLoading}
                                      coffeeReportModalOpen={
                                        coffeeReportModalOpen
                                      }
                                      coffeeRequestModalOpen={
                                        coffeeRequestModalOpen
                                      }
                                      toggleCoffeeReportModal={
                                        this.toggleCoffeeReportModal
                                      }
                                      toggleCoffeeRequestModal={
                                        this.toggleCoffeeRequestModal
                                      }
                                      cityId={cityId}
                                      isStaying={isStaying}
                                      onChange={this.onChange}
                                      search={search}
                                      usersNowList={usersNowList}
                                      usersNowActiveId={usersNowActiveId}
                                      onKeyDown={this.onKeyDown}
                                      onClick={this.onClick}
                                      onBlur={this.onBlur}
                                      submitCoffee={this.submitCoffee}
                                    />
                                  );
                                }}
                              </CityProfileQuery>
                            );
                          }}
                        </NearCitiesQuery>
                      );
                    }}
                  </RequestCoffeeMutation>
                );
              }}
            </GetCoffeesQuery>
          );
        }}
      </GetSamenameCitiesQuery>
    );
  }
  public toggleCoffeeRequestModal = () => {
    const { coffeeRequestModalOpen } = this.state;
    this.setState({
      coffeeRequestModalOpen: !coffeeRequestModalOpen
    } as any);
  };
  public toggleCoffeeReportModal = () => {
    const { coffeeReportModalOpen } = this.state;
    this.setState({
      coffeeReportModalOpen: !coffeeReportModalOpen
    } as any);
  };
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    const {
      cityProfile: { usersNow = null }
    } = this.data;
    const nowSearch = (list, text) =>
      list.filter(i =>
        i.profile.username.toLowerCase().includes(text.toLowerCase())
      );
    const usersNowList = nowSearch(usersNow, value);
    this.setState({
      search: value,
      usersNowList,
      activeId: 0
    } as any);
  };
  public onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { keyCode } = event;
    const { usersNowActiveId, usersNowList } = this.state;
    const { history } = this.props;

    const { cityProfile: { usersNow = null } = {} } = this.data;

    if (keyCode === 13 && (usersNowList.length || usersNow)) {
      {
        usersNowList.length
          ? history.push({
              pathname: `/${usersNowList[usersNowActiveId].profile.username}`
            })
          : history.push({
              pathname: `/${usersNow[usersNowActiveId].profile.username}`
            });
      }
      this.setState({
        usersNowActiveId: 0
      });
    } else if (keyCode === 38) {
      if (usersNowActiveId === 0) {
        return;
      }
      this.setState({
        usersNowActiveId: usersNowActiveId - 1
      });
    } else if (keyCode === 40) {
      if (usersNowList.length) {
        if (usersNowActiveId === usersNowList.length - 1) {
          return;
        }
      } else {
        if (usersNowActiveId === usersNow.length - 1) {
          return;
        }
      }
      this.setState({
        usersNowActiveId: usersNowActiveId + 1
      });
    }
  };
  public onClick: React.MouseEventHandler<HTMLDivElement> = () => {
    this.setState({
      usersNowActiveId: 0
    });
  };
  public onBlur: React.MouseEventHandler<HTMLDivElement> = () => {
    this.setState({
      usersNowActiveId: null
    });
  };
  public submitCoffee = target => {
    const { coffeeRequestModalOpen } = this.state;
    this.requestCoffeeFn({ variables: { target } });
    this.setState({
      coffeeRequestModalOpen: !coffeeRequestModalOpen
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
}

export default withRouter(CityProfileContainer);
