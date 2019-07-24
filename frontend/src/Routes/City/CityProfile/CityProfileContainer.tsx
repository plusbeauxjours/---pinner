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
  GetSamenameCitiesVariables,
  SlackReportLocations,
  SlackReportLocationsVariables
} from "../../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import { CITY_PROFILE, GET_SAMENAME_CITIES } from "./CityProfileQueries";
import { NEAR_CITIES } from "../NearCities/NearCitiesQueries";
import { GET_COFFEES } from "../../User/Coffees/CoffeesQueries";
import { toast } from "react-toastify";
import { REQUEST_COFFEE } from "../../Match/MatchQueries";
import { SLACK_REPORT_LOCATIONS } from "../../../sharedQueries";

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
class SlackReportLocationsMutation extends Mutation<
  SlackReportLocations,
  SlackReportLocationsVariables
> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  reportModalOpen: boolean;
  search: string;
  usersNowList: any;
  currentCityId: string;
  coffeeReportModalOpen: boolean;
  coffeeRequestModalOpen: boolean;
}

class CityProfileContainer extends React.Component<IProps, IState> {
  public data;
  public coffeeFetchMore;
  public requestCoffeeFn: MutationFn;
  public slackReportLocationsFn: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      reportModalOpen: false,
      search: "",
      usersNowList: [],
      currentCityId: localStorage.getItem("cityId"),
      coffeeReportModalOpen: false,
      coffeeRequestModalOpen: false
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    console.log("updating");
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
    const {
      reportModalOpen,
      search,
      usersNowList,
      coffeeReportModalOpen,
      coffeeRequestModalOpen
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
                  <SlackReportLocationsMutation
                    mutation={SLACK_REPORT_LOCATIONS}
                    onCompleted={this.onCompltedSlackReportLocations}
                  >
                    {slackReportLocationsFn => {
                      this.slackReportLocationsFn = slackReportLocationsFn;
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
                                      {({
                                        data: cityData,
                                        loading: cityLoading
                                      }) => {
                                        this.data = cityData;
                                        return (
                                          <CityProfilePresenter
                                            reportModalOpen={reportModalOpen}
                                            toggleReportModal={
                                              this.toggleReportModal
                                            }
                                            slackReportLocations={
                                              this.slackReportLocations
                                            }
                                            samenameCitiesData={
                                              samenameCitiesData
                                            }
                                            samenameCitiesLoading={
                                              samenameCitiesLoading
                                            }
                                            coffeeData={coffeeData}
                                            coffeeLoading={coffeeLoading}
                                            cityData={cityData}
                                            cityLoading={cityLoading}
                                            nearCitiesData={nearCitiesData}
                                            nearCitiesLoading={
                                              nearCitiesLoading
                                            }
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
                  </SlackReportLocationsMutation>
                );
              }}
            </GetCoffeesQuery>
          );
        }}
      </GetSamenameCitiesQuery>
    );
  }
  public toggleReportModal = () => {
    const { reportModalOpen } = this.state;
    this.setState({ reportModalOpen: !reportModalOpen });
  };
  public onCompltedSlackReportLocations = data => {
    this.setState({ reportModalOpen: false });
    if (data.slackReportLocations.ok) {
      toast.success("Report Sent");
    } else {
      toast.error("error");
    }
  };
  public slackReportLocations = (targetLocationId, payload) => {
    this.slackReportLocationsFn({
      variables: {
        targetLocationId,
        targetLocationType: "city",
        payload
      }
    });
  };
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
      usersNowList
    } as any);
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
