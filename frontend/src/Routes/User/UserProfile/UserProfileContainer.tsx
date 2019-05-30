import React from "react";
import moment from "moment";
import UserProfilePresenter from "./UserProfilePresenter";
import { Query, Mutation, MutationFn } from "react-apollo";
import {
  UserProfile,
  UserProfileVariables,
  EditProfile,
  EditProfileVariables,
  DeleteProfile,
  AddTrip,
  GetTrips,
  GetTripsVariables,
  AddTripVariables,
  EditTrip,
  EditTripVariables,
  DeleteTrip,
  DeleteTripVariables,
  GetKnowingFollowers,
  GetKnowingFollowersVariables,
  DeleteCoffee,
  DeleteCoffeeVariables,
  RequestCoffee,
  RequestCoffeeVariables,
  GetCoffeesVariables,
  GetCoffees,
  SearchTripCities,
  SearchTripCitiesVariables
} from "src/types/api";
import {
  GET_USER,
  EDIT_PROFILE,
  DELETE_PROFILE,
  GET_TRIPS,
  ADD_TRIP,
  EDIT_TRIP,
  DELETE_TRIP,
  GET_KNOWING_FOLLOWERS,
  DELETE_COFFEE,
  SEARCH_TRIP_CITIES
} from "./UserProfileQueries";
import { REQUEST_COFFEE } from "../../Feed/Feed/FeedQueries";
import { GET_COFFEES } from "../Coffees/CoffeesQueries";
import { withRouter, RouteComponentProps } from "react-router";
import { LOG_USER_OUT } from "src/sharedQueries.local";
import { toast } from "react-toastify";

class SearchCitiesQuery extends Query<
  SearchTripCities,
  SearchTripCitiesVariables
> {}
class UserProfileQuery extends Query<UserProfile, UserProfileVariables> {}
class GetTiprsQuery extends Query<GetTrips, GetTripsVariables> {}
class AddTripMutation extends Mutation<AddTrip, AddTripVariables> {}
class EditTripMutation extends Mutation<EditTrip, EditTripVariables> {}
class DeleteTripMutation extends Mutation<DeleteTrip, DeleteTripVariables> {}
class GetKnowingFollowersQuery extends Query<
  GetKnowingFollowers,
  GetKnowingFollowersVariables
> {}

class RequestCoffeeMutation extends Mutation<
  RequestCoffee,
  RequestCoffeeVariables
> {}
class GetCoffeesQuery extends Query<GetCoffees, GetCoffeesVariables> {}
class DeleteCoffeeMutation extends Mutation<
  DeleteCoffee,
  DeleteCoffeeVariables
> {}

class EditProfileMutation extends Mutation<EditProfile, EditProfileVariables> {}
class DeleteProfileMutation extends Mutation<DeleteProfile> {}
class LogOutMutation extends Mutation {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  modalOpen: boolean;
  confirmModalOpen: boolean;
  tripModalOpen: boolean;
  tripConfirmModalOpen: boolean;
  tripAddModalOpen: boolean;
  tripEditModalOpen: boolean;
  profilFormModalOpen: boolean;

  requestModalOpen: boolean;
  coffeeModalOpen: boolean;
  requestingCoffeeModalOpen: boolean;
  coffeeReportModalOpen: boolean;
  editMode: boolean;
  id: string;
  userName: string;
  bio: string;
  gender: string;
  nationality: string;
  email: string;
  avatar: string;
  firstName: string;
  lastName: string;
  cityName: string;
  cityPhoto: string;
  countryName: string;
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  tripStartDate: moment.Moment | null;
  tripEndDate: moment.Moment | null;
  focusedInput: "startDate" | "endDate" | null;
  moveNotificationId: string;
  coffeeId: string;
  tripPage: number;
  search: string;
  tripList: any;
  currentCity: string;
  lat: number;
  lng: number;
  tripActiveId: number;
  searchActiveId: number;
}

class UserProfileContainer extends React.Component<IProps, IState> {
  public logUserOutFn: MutationFn;
  public editProfileFn: MutationFn;
  public deleteProfileFn: MutationFn;
  public addTripFn: MutationFn;
  public editTripFn: MutationFn;
  public deleteTripFn: MutationFn;
  public deleteCoffeeFn: MutationFn;
  public requestCoffeeFn: MutationFn;

  public getTripsData;
  public searchTripCitiesData;
  public data;

  constructor(props) {
    super(props);
    const { location: { state = {} } = {} } = ({} = props);
    this.state = {
      modalOpen: false,
      confirmModalOpen: false,
      tripModalOpen: false,
      tripConfirmModalOpen: false,
      tripAddModalOpen: false,
      tripEditModalOpen: false,
      profilFormModalOpen: true,

      requestModalOpen: false,
      coffeeModalOpen: false,
      requestingCoffeeModalOpen: false,
      coffeeReportModalOpen: false,
      editMode: false,
      id: props.id,
      userName: props.username,
      bio: props.bio,
      gender: props.gender,
      avatar: props.avatar,
      nationality: state.currentCountryCode,
      email: props.email,
      firstName: props.FirstName,
      lastName: props.lastName,
      cityName: props.cityName,
      cityPhoto: props.cityPhoto,
      countryName: props.countryName,
      startDate: props.startDate,
      endDate: props.endDate,
      tripStartDate: props.tripStartDate,
      tripEndDate: props.tripEndDate,
      focusedInput: null,
      moveNotificationId: null,
      coffeeId: null,
      tripPage: 0,
      search: "",
      tripList: [],
      lat: state.currentLat,
      lng: state.currentLng,
      currentCity: state.currentCity || localStorage.getItem("cityName"),
      tripActiveId: null,
      searchActiveId: null
    };
  }
  public componentDidMount() {
    console.log(this.state);
    console.log(this.props);
  }
  public componentDidUpdate(prevProps, prevState) {
    const newProps = this.props;
    if (prevProps.match.params.username !== newProps.match.params.username) {
      this.setState({ search: "", tripList: [] });
      console.log("updated");
      console.log(prevState);
      console.log(this.state);
    }
  }
  public render() {
    const {
      match: {
        params: { username }
      }
    } = this.props;
    const { history } = this.props;
    const {
      modalOpen,
      confirmModalOpen,
      tripModalOpen,
      tripConfirmModalOpen,
      tripAddModalOpen,
      tripEditModalOpen,
      profilFormModalOpen,

      currentCity,
      requestModalOpen,
      coffeeModalOpen,
      requestingCoffeeModalOpen,
      coffeeReportModalOpen,
      editMode,
      userName,
      bio,
      gender,
      avatar,
      nationality,
      email,
      firstName,
      lastName,
      cityName,
      cityPhoto,
      countryName,
      startDate,
      endDate,
      tripStartDate,
      tripEndDate,
      focusedInput,
      moveNotificationId,
      coffeeId,
      tripPage,
      search,
      tripList,
      tripActiveId,
      searchActiveId
    } = this.state;
    return (
      <SearchCitiesQuery
        query={SEARCH_TRIP_CITIES}
        variables={{ search: cityName }}
        skip={!cityName}
      >
        {({ data: searchTripCitiesData, loading: searchTripCitiesLoading }) => {
          this.searchTripCitiesData = searchTripCitiesData;
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
                  <GetCoffeesQuery
                    query={GET_COFFEES}
                    variables={{
                      userName: username,
                      location: "profile"
                    }}
                  >
                    {({ data: coffeeData, loading: coffeeLoading }) => {
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
                              <GetKnowingFollowersQuery
                                query={GET_KNOWING_FOLLOWERS}
                                variables={{ username }}
                              >
                                {({
                                  data: knowingFollowersData,
                                  loading: knowingFollowersLoading
                                }) => {
                                  return (
                                    <LogOutMutation mutation={LOG_USER_OUT}>
                                      {logUserOutFn => {
                                        this.logUserOutFn = logUserOutFn;
                                        return (
                                          <UserProfileQuery
                                            query={GET_USER}
                                            variables={{ username }}
                                          >
                                            {({
                                              data: userProfileData,
                                              loading: userProfileLoading
                                            }) => (
                                              <EditProfileMutation
                                                mutation={EDIT_PROFILE}
                                                update={this.updatEditProfile}
                                                onCompleted={editData => {
                                                  const {
                                                    editProfile
                                                  } = editData;
                                                  if (editProfile.ok) {
                                                    toast.success(
                                                      "Profile updated!"
                                                    );
                                                  } else {
                                                    toast.error(
                                                      "Profile Could not Updated!"
                                                    );
                                                  }
                                                }}
                                              >
                                                {editProfileFn => {
                                                  this.editProfileFn = editProfileFn;
                                                  return (
                                                    <DeleteProfileMutation
                                                      mutation={DELETE_PROFILE}
                                                      onCompleted={deleteResult => {
                                                        const {
                                                          deleteProfile
                                                        } = deleteResult;
                                                        if (deleteProfile.ok) {
                                                          toast.success(
                                                            "Place added!"
                                                          );
                                                          setTimeout(() => {
                                                            history.push("/");
                                                          }, 2000);
                                                        } else {
                                                          toast.error("kokoko");
                                                        }
                                                      }}
                                                    >
                                                      {deleteProfileFn => {
                                                        this.deleteProfileFn = deleteProfileFn;
                                                        return (
                                                          <GetTiprsQuery
                                                            query={GET_TRIPS}
                                                            variables={{
                                                              username,
                                                              tripPage
                                                            }}
                                                          >
                                                            {({
                                                              data: getTripsData,
                                                              loading: getTipsLoading
                                                            }) => {
                                                              this.getTripsData = getTripsData;
                                                              return (
                                                                <AddTripMutation
                                                                  mutation={
                                                                    ADD_TRIP
                                                                  }
                                                                  variables={{
                                                                    cityName,
                                                                    startDate,
                                                                    endDate
                                                                  }}
                                                                  refetchQueries={[
                                                                    {
                                                                      query: GET_TRIPS,
                                                                      variables: {
                                                                        username,
                                                                        tripPage
                                                                      }
                                                                    }
                                                                  ]}
                                                                  onCompleted={
                                                                    this
                                                                      .onCompletedAddTrip
                                                                  }
                                                                >
                                                                  {addTripFn => {
                                                                    this.addTripFn = addTripFn;
                                                                    return (
                                                                      <EditTripMutation
                                                                        mutation={
                                                                          EDIT_TRIP
                                                                        }
                                                                        variables={{
                                                                          moveNotificationId: parseInt(
                                                                            moveNotificationId,
                                                                            10
                                                                          ),
                                                                          cityName,
                                                                          startDate,
                                                                          endDate
                                                                        }}
                                                                        refetchQueries={[
                                                                          {
                                                                            query: GET_TRIPS,
                                                                            variables: {
                                                                              username,
                                                                              tripPage
                                                                            }
                                                                          }
                                                                        ]}
                                                                        onCompleted={
                                                                          this
                                                                            .onCompletedEditTrip
                                                                        }
                                                                      >
                                                                        {editTripFn => {
                                                                          this.editTripFn = editTripFn;
                                                                          return (
                                                                            <DeleteTripMutation
                                                                              mutation={
                                                                                DELETE_TRIP
                                                                              }
                                                                              variables={{
                                                                                moveNotificationId: parseInt(
                                                                                  moveNotificationId,
                                                                                  10
                                                                                )
                                                                              }}
                                                                              onCompleted={
                                                                                this
                                                                                  .onCompletedDeleteTrip
                                                                              }
                                                                              update={
                                                                                this
                                                                                  .updateDeleteTrip
                                                                              }
                                                                            >
                                                                              {deleteTripFn => {
                                                                                this.deleteTripFn = deleteTripFn;
                                                                                return (
                                                                                  <UserProfilePresenter
                                                                                    searchTripCitiesData={
                                                                                      searchTripCitiesData
                                                                                    }
                                                                                    searchTripCitiesLoading={
                                                                                      searchTripCitiesLoading
                                                                                    }
                                                                                    modalOpen={
                                                                                      modalOpen
                                                                                    }
                                                                                    tripModalOpen={
                                                                                      tripModalOpen
                                                                                    }
                                                                                    confirmModalOpen={
                                                                                      confirmModalOpen
                                                                                    }
                                                                                    tripConfirmModalOpen={
                                                                                      tripConfirmModalOpen
                                                                                    }
                                                                                    tripAddModalOpen={
                                                                                      tripAddModalOpen
                                                                                    }
                                                                                    tripEditModalOpen={
                                                                                      tripEditModalOpen
                                                                                    }
                                                                                    coffeeModalOpen={
                                                                                      coffeeModalOpen
                                                                                    }
                                                                                    requestingCoffeeModalOpen={
                                                                                      requestingCoffeeModalOpen
                                                                                    }
                                                                                    coffeeReportModalOpen={
                                                                                      coffeeReportModalOpen
                                                                                    }
                                                                                    profilFormModalOpen={
                                                                                      profilFormModalOpen
                                                                                    }
                                                                                    editMode={
                                                                                      editMode
                                                                                    }
                                                                                    logUserOutFn={
                                                                                      logUserOutFn
                                                                                    }
                                                                                    confirmDeleteProfile={
                                                                                      this
                                                                                        .confirmDeleteProfile
                                                                                    }
                                                                                    toggleModal={
                                                                                      this
                                                                                        .toggleModal
                                                                                    }
                                                                                    toggleConfirmModal={
                                                                                      this
                                                                                        .toggleConfirmModal
                                                                                    }
                                                                                    toggleTripModal={
                                                                                      this
                                                                                        .toggleTripModal
                                                                                    }
                                                                                    toggleTripConfirmModal={
                                                                                      this
                                                                                        .toggleTripConfirmModal
                                                                                    }
                                                                                    toggleAddTripModal={
                                                                                      this
                                                                                        .toggleAddTripModal
                                                                                    }
                                                                                    toggleEditTripModal={
                                                                                      this
                                                                                        .toggleEditTripModal
                                                                                    }
                                                                                    toggleCoffeeModal={
                                                                                      this
                                                                                        .toggleCoffeeModal
                                                                                    }
                                                                                    toggleRequestingCoffeeModal={
                                                                                      this
                                                                                        .toggleRequestingCoffeeModal
                                                                                    }
                                                                                    toggleCoffeeReportModal={
                                                                                      this
                                                                                        .toggleCoffeeReportModal
                                                                                    }
                                                                                    toggleProfileFormModal={
                                                                                      this
                                                                                        .toggleProfileFormModal
                                                                                    }
                                                                                    openEditMode={
                                                                                      this
                                                                                        .openEditMode
                                                                                    }
                                                                                    userProfileData={
                                                                                      userProfileData
                                                                                    }
                                                                                    userProfileLoading={
                                                                                      userProfileLoading
                                                                                    }
                                                                                    getTripsData={
                                                                                      getTripsData
                                                                                    }
                                                                                    knowingFollowersData={
                                                                                      knowingFollowersData
                                                                                    }
                                                                                    knowingFollowersLoading={
                                                                                      knowingFollowersLoading
                                                                                    }
                                                                                    getTipsLoading={
                                                                                      getTipsLoading
                                                                                    }
                                                                                    onInputChange={
                                                                                      this
                                                                                        .onInputChange
                                                                                    }
                                                                                    onSelectChange={
                                                                                      this
                                                                                        .onSelectChange
                                                                                    }
                                                                                    onKeyDownSubmit={
                                                                                      this
                                                                                        .onKeyDownSubmit
                                                                                    }
                                                                                    userName={
                                                                                      userName
                                                                                    }
                                                                                    bio={
                                                                                      bio
                                                                                    }
                                                                                    gender={
                                                                                      gender
                                                                                    }
                                                                                    avatar={
                                                                                      avatar
                                                                                    }
                                                                                    nationality={
                                                                                      nationality
                                                                                    }
                                                                                    email={
                                                                                      email
                                                                                    }
                                                                                    firstName={
                                                                                      firstName
                                                                                    }
                                                                                    lastName={
                                                                                      lastName
                                                                                    }
                                                                                    cityName={
                                                                                      cityName
                                                                                    }
                                                                                    cityPhoto={
                                                                                      cityPhoto
                                                                                    }
                                                                                    countryName={
                                                                                      countryName
                                                                                    }
                                                                                    startDate={
                                                                                      startDate
                                                                                    }
                                                                                    tripStartDate={
                                                                                      tripStartDate
                                                                                    }
                                                                                    tripEndDate={
                                                                                      tripEndDate
                                                                                    }
                                                                                    endDate={
                                                                                      endDate
                                                                                    }
                                                                                    focusedInput={
                                                                                      focusedInput
                                                                                    }
                                                                                    onDatesChange={
                                                                                      this
                                                                                        .onDatesChange
                                                                                    }
                                                                                    onFocusChange={
                                                                                      this
                                                                                        .onFocusChange
                                                                                    }
                                                                                    addTrip={
                                                                                      this
                                                                                        .addTrip
                                                                                    }
                                                                                    editTrip={
                                                                                      this
                                                                                        .editTrip
                                                                                    }
                                                                                    deleteTrip={
                                                                                      this
                                                                                        .deleteTrip
                                                                                    }
                                                                                    gotoTrip={
                                                                                      this
                                                                                        .gotoTrip
                                                                                    }
                                                                                    coffeeData={
                                                                                      coffeeData
                                                                                    }
                                                                                    coffeeLoading={
                                                                                      coffeeLoading
                                                                                    }
                                                                                    toggleRequestModal={
                                                                                      this
                                                                                        .toggleRequestModal
                                                                                    }
                                                                                    requestModalOpen={
                                                                                      requestModalOpen
                                                                                    }
                                                                                    submitCoffee={
                                                                                      this
                                                                                        .submitCoffee
                                                                                    }
                                                                                    deleteCoffee={
                                                                                      this
                                                                                        .deleteCoffee
                                                                                    }
                                                                                    getCoffeeId={
                                                                                      this
                                                                                        .getCoffeeId
                                                                                    }
                                                                                    getRequestingCoffeeId={
                                                                                      this
                                                                                        .getRequestingCoffeeId
                                                                                    }
                                                                                    username={
                                                                                      username
                                                                                    }
                                                                                    search={
                                                                                      search
                                                                                    }
                                                                                    onChange={
                                                                                      this
                                                                                        .onChange
                                                                                    }
                                                                                    tripList={
                                                                                      tripList
                                                                                    }
                                                                                    isDayBlocked={
                                                                                      this
                                                                                        .isDayBlocked
                                                                                    }
                                                                                    tripActiveId={
                                                                                      tripActiveId
                                                                                    }
                                                                                    searchActiveId={
                                                                                      searchActiveId
                                                                                    }
                                                                                    onKeyDownSearch={
                                                                                      this
                                                                                        .onKeyDownSearch
                                                                                    }
                                                                                    onKeyDownTrip={
                                                                                      this
                                                                                        .onKeyDownTrip
                                                                                    }
                                                                                    onClick={
                                                                                      this
                                                                                        .onClick
                                                                                    }
                                                                                    onBlur={
                                                                                      this
                                                                                        .onBlur
                                                                                    }
                                                                                    onClickSearch={
                                                                                      this
                                                                                        .onClickSearch
                                                                                    }
                                                                                  />
                                                                                );
                                                                              }}
                                                                            </DeleteTripMutation>
                                                                          );
                                                                        }}
                                                                      </EditTripMutation>
                                                                    );
                                                                  }}
                                                                </AddTripMutation>
                                                              );
                                                            }}
                                                          </GetTiprsQuery>
                                                        );
                                                      }}
                                                    </DeleteProfileMutation>
                                                  );
                                                }}
                                              </EditProfileMutation>
                                            )}
                                          </UserProfileQuery>
                                        );
                                      }}
                                    </LogOutMutation>
                                  );
                                }}
                              </GetKnowingFollowersQuery>
                            );
                          }}
                        </DeleteCoffeeMutation>
                      );
                    }}
                  </GetCoffeesQuery>
                );
              }}
            </RequestCoffeeMutation>
          );
        }}
      </SearchCitiesQuery>
    );
  }
  public openEditMode = () => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen,
      editMode: true
    });
  };
  public closeEditMode = () => {
    this.setState({
      editMode: false
    });
  };

  public confirmDeleteProfile = () => {
    this.deleteProfileFn();
    this.logUserOutFn();
  };
  public onKeyDownSubmit = event => {
    const {
      userName,
      bio,
      gender,
      avatar,
      firstName,
      lastName,
      nationality,
      email
    } = this.state;
    const { keyCode } = event;
    if (keyCode === 13) {
      this.editProfileFn({
        variables: {
          username: userName,
          bio,
          gender,
          avatar,
          firstName,
          lastName,
          nationality,
          email
        }
      });
    } else {
      return null;
    }
  };
  public toggleTripModal = (
    moveNotificationId,
    cityName,
    cityPhoto,
    countryName,
    tripStartDate,
    tripEndDate
  ) => {
    const { tripModalOpen } = this.state;
    this.setState({
      tripModalOpen: !tripModalOpen,
      moveNotificationId,
      cityName,
      cityPhoto,
      countryName,
      tripStartDate,
      tripEndDate
    } as any);
  };
  public toggleModal = () => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen
    } as any);
  };
  public toggleConfirmModal = () => {
    const { confirmModalOpen, modalOpen } = this.state;
    this.setState({
      confirmModalOpen: !confirmModalOpen,
      modalOpen: !modalOpen
    } as any);
  };

  public toggleTripConfirmModal = () => {
    const { tripConfirmModalOpen, tripModalOpen } = this.state;
    this.setState({
      tripConfirmModalOpen: !tripConfirmModalOpen,
      tripModalOpen: !tripModalOpen
    } as any);
  };
  public toggleAddTripModal = () => {
    const { tripAddModalOpen } = this.state;
    this.setState({
      tripAddModalOpen: !tripAddModalOpen,
      tripModalOpen: false
    });
  };
  public toggleEditTripModal = () => {
    const { tripEditModalOpen } = this.state;
    this.setState({
      tripEditModalOpen: !tripEditModalOpen,
      tripModalOpen: false
    });
  };
  public toggleCoffeeReportModal = () => {
    const { coffeeReportModalOpen } = this.state;
    this.setState({
      coffeeReportModalOpen: !coffeeReportModalOpen
    } as any);
  };
  public toggleProfileFormModal = () => {
    this.setState({
      profilFormModalOpen: false
    } as any);
  };
  public addTrip = () => {
    const { cityName, startDate, endDate, tripAddModalOpen } = this.state;
    this.setState({
      tripModalOpen: false
    });
    this.addTripFn({
      variables: { cityName, startDate, endDate }
    });
    this.setState({
      tripAddModalOpen: !tripAddModalOpen,
      moveNotificationId: null,
      cityName: null,
      startDate: null,
      endDate: null
    });
  };
  public editTrip = () => {
    const { tripEditModalOpen } = this.state;
    this.setState({
      tripModalOpen: false
    });
    this.editTripFn();
    this.setState({
      tripEditModalOpen: !tripEditModalOpen,
      moveNotificationId: null,
      cityName: null,
      startDate: null,
      endDate: null
    });
  };
  public deleteTrip = () => {
    const { moveNotificationId, tripConfirmModalOpen } = this.state;
    this.setState({
      tripModalOpen: false
    });
    this.deleteTripFn({
      variables: { moveNotificationId }
    });
    this.setState({
      tripConfirmModalOpen: !tripConfirmModalOpen,
      moveNotificationId: null
    });
  };
  public onDatesChange = ({ startDate, endDate }) => {
    console.log(this.getTripsData);
    this.setState({ startDate, endDate });
  };
  public isDayBlocked = (day: moment.Moment) => {
    const {
      getTrips: { trip }
    } = this.getTripsData;
    console.log(trip);
    // const Moment = require("moment");
    // const MomentRange = require("moment-range");
    // const moments = MomentRange.extendMoment(Moment);
    // const a = moments.Moment;
    // console.log(a);

    // for (const i of trip) {
    //   console.log(i.startDate, i.endDate);
    // }
    // const start = trip[19].startDate;
    // const end = trip[19].endDate;
    // const range = moments.range(start, end);
    // console.log(range);
    // const arrayOfDates = Array.from(range.by("days"));
    // console.log(arrayOfDates);
    // return arrayOfDates;
  };

  public onFocusChange = focusedInput => {
    this.setState({ focusedInput });
  };

  public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event;
    this.setState({
      cityName: value,
      searchActiveId: 0
    } as any);
    console.log(this.state);
  };

  public onSelectChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };

  public gotoTrip = (
    cityName,
    cityPhoto,
    countryName,
    tripStartDate,
    tripEndDate
  ) => {
    if (tripStartDate === null || tripEndDate === null) {
      this.props.history.push({
        pathname: `/city/${cityName}`
      });
    } else {
      this.props.history.push({
        pathname: `/city/${cityName}/${tripStartDate}${"-"}${tripEndDate}`,
        state: {
          cityName,
          cityPhoto,
          countryName,
          tripStartDate,
          tripEndDate
        }
      });
    }
    this.setState({
      cityName: null,
      cityPhoto: null,
      countryName: null,
      tripStartDate: null,
      tripEndDate: null
    });
  };

  public onCompletedAddTrip = data => {
    if (data.addTrip.moveNotification) {
      toast.success("Trip added");
    } else {
      toast.error("error");
    }
  };
  public onCompletedEditTrip = data => {
    if (data.editTrip.moveNotification) {
      toast.success("Trip updated");
    } else {
      toast.error("error");
    }
  };
  public onCompletedDeleteTrip = data => {
    if (data.deleteTrip.ok) {
      toast.success("Trip deleted");
    } else {
      toast.error("error");
    }
  };
  public updateDeleteTrip = (cache, { data: { deleteTrip } }) => {
    const {
      match: {
        params: { username }
      }
    } = this.props;
    const { tripPage } = this.state;
    try {
      const data = cache.readQuery({
        query: GET_TRIPS,
        variables: { username, tripPage }
      });
      if (data) {
        data.getTrips.trip = data.getTrips.trip.filter(
          i => parseInt(i.id, 10) !== deleteTrip.tripId
        );
        cache.writeQuery({
          query: GET_TRIPS,
          variables: { username, tripPage },
          data
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  public onCompletedDeleteCoffee = data => {
    if (data.deleteCoffee.ok) {
      toast.success("Coffee deleted");
    } else {
      toast.error("error");
    }
    this.setState({
      coffeeModalOpen: false,
      requestingCoffeeModalOpen: false
    } as any);
  };
  public updatEditProfile = (cache, { data: { editProfile } }) => {
    const {
      match: {
        params: { username }
      }
    } = this.props;
    try {
      const data = cache.readQuery({
        query: GET_USER,
        variables: { username }
      });
      if (data) {
        data.user = editProfile.user;
        data.getCoffees.cache.writeQuery({
          query: GET_USER,
          variables: { username },
          data
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  public updateDeleteCoffee = (cache, { data: { deleteCoffee } }) => {
    const {
      match: {
        params: { username }
      }
    } = this.props;
    try {
      const data = cache.readQuery({
        query: GET_COFFEES,
        variables: { userName: username, location: "profile" }
      });
      if (data) {
        data.getCoffees.coffees = data.getCoffees.coffees.filter(
          i => parseInt(i.id, 10) !== deleteCoffee.coffeeId
        );
        data.getCoffees.cache.writeQuery({
          query: GET_COFFEES,
          variables: { userName: username, location: "profile" },
          data
        });
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const feedData = cache.readQuery({
        query: GET_COFFEES,
        variables: {
          cityName: localStorage.getItem("cityName"),
          location: "feed"
        }
      });
      if (feedData) {
        feedData.getCoffees.coffees = feedData.getCoffees.coffees.filter(
          i => parseInt(i.id, 10) !== deleteCoffee.coffeeId
        );
        cache.writeQuery({
          query: GET_COFFEES,
          variables: {
            cityName: localStorage.getItem("cityName"),
            location: "feed"
          },
          data: feedData
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  public getRequestingCoffeeId = coffeeId => {
    const { requestingCoffeeModalOpen } = this.state;
    this.setState({
      requestingCoffeeModalOpen: !requestingCoffeeModalOpen,
      coffeeId
    } as any);
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
  public toggleCoffeeModal = () => {
    const { coffeeModalOpen } = this.state;
    this.setState({
      coffeeModalOpen: !coffeeModalOpen
    } as any);
  };
  public toggleRequestingCoffeeModal = () => {
    const { requestingCoffeeModalOpen } = this.state;
    this.setState({
      requestingCoffeeModalOpen: !requestingCoffeeModalOpen
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
    const {
      coffee: {
        host: { username }
      }
    } = requestCoffee;
    try {
      const feedData = cache.readQuery({
        query: GET_COFFEES,
        variables: {
          cityName: localStorage.getItem("cityName"),
          location: "feed"
        }
      });
      if (feedData) {
        feedData.getCoffees.coffees.unshift(requestCoffee.coffee);
        cache.writeQuery({
          query: GET_COFFEES,
          variables: {
            cityName: localStorage.getItem("cityName"),
            location: "feed"
          },
          data: feedData
        });
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const profileData = cache.readQuery({
        query: GET_COFFEES,
        variables: {
          userName: username,
          location: "profile"
        }
      });
      if (profileData) {
        profileData.getCoffees.coffees.push(requestCoffee.coffee);
        cache.writeQuery({
          query: GET_COFFEES,
          variables: {
            userName: username,
            location: "profile"
          },
          data: profileData
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    const { getTrips: { trip = {} } = {} } = ({} = this.getTripsData);
    const nowSearch = (list, text) =>
      list.filter(
        i =>
          i.city.cityName.toLowerCase().includes(text.toLowerCase()) ||
          i.city.country.countryName.toLowerCase().includes(text.toLowerCase())
      );
    const tripList = nowSearch(trip, value);
    this.setState({
      search: value,
      tripList,
      tripActiveId: 0
    } as any);
  };
  public onKeyDownTrip = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { keyCode } = event;
    const { tripActiveId, tripList } = this.state;

    const {
      getTrips: { trip = null }
    } = this.getTripsData;

    if (keyCode === 13 && (tripList.length || trip)) {
      {
        tripList.length
          ? this.gotoTrip(
              tripList[tripActiveId].city.cityName,
              tripList[tripActiveId].city.cityPhoto,
              tripList[tripActiveId].city.country.countryName,
              tripList[tripActiveId].startDate,
              tripList[tripActiveId].endDate
            )
          : this.gotoTrip(
              trip[tripActiveId].city.cityName,
              trip[tripActiveId].city.cityPhoto,
              trip[tripActiveId].city.country.countryName,
              trip[tripActiveId].startDate,
              trip[tripActiveId].endDate
            );
      }
      this.setState({
        tripActiveId: 0
      });
    } else if (keyCode === 38) {
      if (tripActiveId === 0) {
        return;
      }
      this.setState({
        tripActiveId: tripActiveId - 1
      });
    } else if (keyCode === 40) {
      if (tripList.length) {
        if (tripActiveId === tripList.length - 1) {
          return;
        }
      } else {
        if (tripActiveId === trip.length - 1) {
          return;
        }
      }
      this.setState({
        tripActiveId: tripActiveId + 1
      });
    }
  };
  public onClickSearch: React.MouseEventHandler<HTMLDivElement> = () => {
    if (this.searchTripCitiesData) {
      const { searchActiveId } = this.state;
      const {
        searchTripCities: { cities = null }
      } = this.searchTripCitiesData;

      this.setState({
        searchActiveId: 0,
        cityName: cities[searchActiveId].cityName
      });
    }
  };
  public onKeyDownSearch = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { keyCode } = event;
    const { searchActiveId } = this.state;
    if (this.searchTripCitiesData) {
      const {
        searchTripCities: { cities = null }
      } = this.searchTripCitiesData;

      if (keyCode === 13 && cities) {
        this.setState({
          searchActiveId: 0,
          cityName: cities[searchActiveId].cityName
        });
        console.log(this.state);
      } else if (keyCode === 38) {
        if (searchActiveId === 0) {
          return;
        }
        this.setState({
          searchActiveId: searchActiveId - 1
        });
      } else if (keyCode === 40) {
        if (searchActiveId === cities.length - 1) {
          return;
        }
        this.setState({
          searchActiveId: searchActiveId + 1
        });
      }
    }
  };
  public onClick: React.MouseEventHandler<HTMLDivElement> = () => {
    this.setState({
      tripActiveId: 0
    });
  };
  public onBlur: React.MouseEventHandler<HTMLDivElement> = () => {
    this.setState({
      tripActiveId: null
    });
  };
}

export default withRouter(UserProfileContainer);
