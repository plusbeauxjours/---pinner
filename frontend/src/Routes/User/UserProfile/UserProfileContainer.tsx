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
  RequestCoffee,
  RequestCoffeeVariables,
  GetCoffeesVariables,
  GetCoffees,
  CreateCity,
  CreateCityVariables
} from "src/types/api";
import {
  GET_USER,
  EDIT_PROFILE,
  DELETE_PROFILE,
  GET_TRIPS,
  ADD_TRIP,
  EDIT_TRIP,
  DELETE_TRIP
} from "./UserProfileQueries";

import { GET_COFFEES } from "../Coffees/CoffeesQueries";
import { withRouter, RouteComponentProps } from "react-router";
import { LOG_USER_OUT } from "src/sharedQueries.local";
import { toast } from "react-toastify";
import { REQUEST_COFFEE } from "../../Match/MatchQueries";
import { reversePlaceId } from "../../../mapHelpers";
import { CREATE_CITY } from "../../../Components/Search/SearchQueries";

class CreateCityQuery extends Mutation<CreateCity, CreateCityVariables> {}

class UserProfileQuery extends Query<UserProfile, UserProfileVariables> {}
class GetTiprsQuery extends Query<GetTrips, GetTripsVariables> {}
class AddTripMutation extends Mutation<AddTrip, AddTripVariables> {}
class EditTripMutation extends Mutation<EditTrip, EditTripVariables> {}
class DeleteTripMutation extends Mutation<DeleteTrip, DeleteTripVariables> {}

class RequestCoffeeMutation extends Mutation<
  RequestCoffee,
  RequestCoffeeVariables
> {}
class GetCoffeesQuery extends Query<GetCoffees, GetCoffeesVariables> {}

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
  editMode: boolean;
  id: string;
  userName: string;
  bio: string;
  gender: string;
  nationality: string;
  residence: string;
  email: string;
  avatar: string;
  firstName: string;
  lastName: string;
  tripCitySearch: string;
  cityName: string;
  cityId: string;
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
  currentCityId: string;
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
  public createCityFn: MutationFn;

  public getTripsData;
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
      editMode: false,
      id: props.id,
      userName: props.username,
      bio: props.bio,
      gender: props.gender,
      avatar: props.avatar,
      nationality: state.currentCountryCode,
      residence: state.currentCountryCode,
      email: props.email,
      firstName: props.FirstName,
      lastName: props.lastName,
      tripCitySearch: "",
      cityName: props.cityName,
      cityId: props.cityId,
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
      currentCityId: state.currentCityId || localStorage.getItem("cityId"),
      tripActiveId: null,
      searchActiveId: null
    };
  }

  public componentDidUpdate(prevProps, prevState) {
    const newProps = this.props;
    if (prevProps.match.params.username !== newProps.match.params.username) {
      this.setState({ search: "", tripList: [] });
      console.log("updated");
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
      currentCityId,
      requestModalOpen,
      editMode,
      userName,
      bio,
      gender,
      avatar,
      nationality,
      residence,
      email,
      firstName,
      lastName,
      tripCitySearch,
      cityName,
      cityId,
      cityPhoto,
      countryName,
      startDate,
      endDate,
      tripStartDate,
      tripEndDate,
      focusedInput,
      moveNotificationId,
      tripPage,
      search,
      tripList,
      tripActiveId,
      searchActiveId
    } = this.state;
    return (
      <CreateCityQuery mutation={CREATE_CITY}>
        {(createCityFn, { loading: createCityLoading }) => {
          this.createCityFn = createCityFn;
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
                  <GetCoffeesQuery
                    query={GET_COFFEES}
                    variables={{
                      userName: username,
                      location: "profile"
                    }}
                  >
                    {({ data: coffeeData, loading: coffeeLoading }) => {
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
                                      const { editProfile } = editData;
                                      if (editProfile.ok) {
                                        toast.success("Profile updated!");
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
                                              toast.success("Place added!");
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
                                                      mutation={ADD_TRIP}
                                                      variables={{
                                                        cityId,
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
                                                        this.onCompletedAddTrip
                                                      }
                                                    >
                                                      {addTripFn => {
                                                        this.addTripFn = addTripFn;
                                                        return (
                                                          <EditTripMutation
                                                            mutation={EDIT_TRIP}
                                                            variables={{
                                                              moveNotificationId: parseInt(
                                                                moveNotificationId,
                                                                10
                                                              ),
                                                              cityId,
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
                                                                        getTipsLoading={
                                                                          getTipsLoading
                                                                        }
                                                                        onInputChange={
                                                                          this
                                                                            .onInputChange
                                                                        }
                                                                        onSearchInputChange={
                                                                          this
                                                                            .onSearchInputChange
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
                                                                        residence={
                                                                          residence
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
                                                                        tripCitySearch={
                                                                          tripCitySearch
                                                                        }
                                                                        cityName={
                                                                          cityName
                                                                        }
                                                                        cityId={
                                                                          cityId
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
                                                                        createCityLoading={
                                                                          createCityLoading
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
                  </GetCoffeesQuery>
                );
              }}
            </RequestCoffeeMutation>
          );
        }}
      </CreateCityQuery>
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
      residence,
      email
    } = this.state;
    console.log(email);
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
          residence,
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
    cityId,
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
      cityId,
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

  public toggleProfileFormModal = () => {
    this.setState({
      profilFormModalOpen: false
    } as any);
  };
  public addTrip = async () => {
    const { tripAddModalOpen, cityId } = this.state;
    await this.setState({
      tripAddModalOpen: !tripAddModalOpen,
      tripModalOpen: false
    });
    const city = await reversePlaceId(cityId);
    await this.createCityFn({
      variables: {
        cityId,
        cityName: city.storableLocation.cityName,
        cityLatitude: city.storableLocation.latitude,
        cityLongitude: city.storableLocation.longitude,
        countryCode: city.storableLocation.countryCode
      }
    });
    await this.addTripFn();
    this.setState({
      moveNotificationId: "",
      cityName: "",
      startDate: null,
      endDate: null
    });
  };
  public editTrip = async () => {
    const { tripEditModalOpen, cityId } = this.state;
    await this.setState({
      tripEditModalOpen: !tripEditModalOpen,
      tripModalOpen: false
    });
    const city = await reversePlaceId(cityId);
    await this.createCityFn({
      variables: {
        cityId,
        cityName: city.storableLocation.cityName,
        cityLatitude: city.storableLocation.latitude,
        cityLongitude: city.storableLocation.longitude,
        countryCode: city.storableLocation.countryCode
      }
    });
    await this.editTripFn();
    this.setState({
      moveNotificationId: "",
      cityName: "",
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
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
    console.log(this.state);
  };

  public onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event;
    this.setState({
      tripCitySearch: value,
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
    cityId,
    cityPhoto,
    countryName,
    tripStartDate,
    tripEndDate
  ) => {
    if (tripStartDate === null || tripEndDate === null) {
      this.props.history.push({
        pathname: `/city/${cityId}`
      });
    } else {
      this.props.history.push({
        pathname: `/city/${cityId}/${tripStartDate}${"-"}${tripEndDate}`,
        state: {
          cityName,
          cityId,
          cityPhoto,
          countryName,
          tripStartDate,
          tripEndDate
        }
      });
    }
    this.setState({
      cityName: "",
      cityId: "",
      cityPhoto: "",
      countryName: "",
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
        console.log(data);
        data.userProfile.user = editProfile.user;
        cache.writeQuery({
          query: GET_USER,
          variables: { username },
          data
        });
      }
    } catch (e) {
      console.log(e);
    }
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

    const { getTrips: { trip = null } = {} } = this.getTripsData;

    if (keyCode === 13 && (tripList.length || trip)) {
      {
        tripList.length
          ? this.gotoTrip(
              tripList[tripActiveId].city.cityName,
              tripList[tripActiveId].city.cityId,
              tripList[tripActiveId].city.cityPhoto,
              tripList[tripActiveId].city.country.countryName,
              tripList[tripActiveId].startDate,
              tripList[tripActiveId].endDate
            )
          : this.gotoTrip(
              trip[tripActiveId].city.cityName,
              trip[tripActiveId].city.cityId,
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
  public onClickSearch = async (cityId: string, cityName: string) => {
    this.setState({
      searchActiveId: 0,
      tripCitySearch: cityName,
      cityName,
      cityId
    });
  };
  public onKeyDownSearch = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // const { keyCode } = event;
    // const { searchActiveId } = this.state;
    //   if (keyCode === 13 && cities) {
    //     this.setState({
    //       searchActiveId: 0,
    //       cityId: cities[searchActiveId].cityId
    //     });
    //     console.log(this.state);
    //   } else if (keyCode === 38) {
    //     if (searchActiveId === 0) {
    //       return;
    //     }
    //     this.setState({
    //       searchActiveId: searchActiveId - 1
    //     });
    //   } else if (keyCode === 40) {
    //     if (searchActiveId === cities.length - 1) {
    //       return;
    //     }
    //     this.setState({
    //       searchActiveId: searchActiveId + 1
    //     });
    //   }
    // }
  };
}

export default withRouter(UserProfileContainer);
