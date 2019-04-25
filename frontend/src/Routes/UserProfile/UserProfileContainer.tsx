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
  TopCountries,
  TopCountriesVariables,
  FrequentVisits,
  FrequentVisitsVariables,
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
  UploadCard,
  UploadCardVariables,
  DeleteCoffee,
  DeleteCoffeeVariables,
  RequestCoffee,
  RequestCoffeeVariables,
  GetMyCoffee,
  GetMyCoffeeVariables
} from "src/types/api";
import {
  GET_USER,
  EDIT_PROFILE,
  DELETE_PROFILE,
  TOP_COUNTRIES,
  FREQUENT_VISITS,
  GET_TRIPS,
  ADD_TRIP,
  EDIT_TRIP,
  DELETE_TRIP,
  GET_KNOWING_FOLLOWERS,
  DELETE_COFFEE,
  GET_MY_COFFEE,
  UPLOAD_CARD
} from "./UserProfileQueries";
import {
  REQUEST_COFFEE,
  GET_COFFEES,
  GET_FEED
} from "../../../../frontend/src/Routes/Feed/FeedQueries";
import { withRouter, RouteComponentProps } from "react-router";
import { LOG_USER_OUT } from "src/sharedQueries.local";
import { toast } from "react-toastify";

class UserProfileQuery extends Query<UserProfile, UserProfileVariables> {}
class TopCountriesQuery extends Query<TopCountries, TopCountriesVariables> {}
class FrequentVisitsQuery extends Query<
  FrequentVisits,
  FrequentVisitsVariables
> {}
class GetTiprsQuery extends Query<GetTrips, GetTripsVariables> {}
class AddTripMutation extends Mutation<AddTrip, AddTripVariables> {}
class EditTripMutation extends Mutation<EditTrip, EditTripVariables> {}
class DeleteTripMutation extends Mutation<DeleteTrip, DeleteTripVariables> {}
class GetKnowingFollowersQuery extends Query<
  GetKnowingFollowers,
  GetKnowingFollowersVariables
> {}
class UploadMutation extends Mutation<UploadCard, UploadCardVariables> {}

class RequestCoffeeMutation extends Mutation<
  RequestCoffee,
  RequestCoffeeVariables
> {}
class GetMyCoffeeQuery extends Query<GetMyCoffee, GetMyCoffeeVariables> {}
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
  cityModalOpen: boolean;
  countryModalOpen: boolean;
  continentModalOpen: boolean;
  followersModalOpen: boolean;
  followingsModalOpen: boolean;
  knowingFollowersModalOpen: boolean;
  requestModalOpen: boolean;
  uploadModalOpen: boolean;
  coffeeModalOpen: boolean;
  editMode: boolean;
  id: string;
  userName: string;
  bio: string;
  gender: string;
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
  newCardCaption: string;
}

class UserProfileContainer extends React.Component<IProps, IState> {
  public logUserOutFn: MutationFn;
  public editProfileFn: MutationFn;
  public deleteProfileFn: MutationFn;
  public addTripFn: MutationFn;
  public editTripFn: MutationFn;
  public deleteTripFn: MutationFn;
  public deleteCoffeeFn: MutationFn;
  public uploadCardFn: MutationFn;
  public requestCoffeeFn: MutationFn;

  public fetchMore;

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      confirmModalOpen: false,
      tripModalOpen: false,
      tripConfirmModalOpen: false,
      tripAddModalOpen: false,
      tripEditModalOpen: false,
      cityModalOpen: false,
      countryModalOpen: false,
      continentModalOpen: false,
      followersModalOpen: false,
      followingsModalOpen: false,
      knowingFollowersModalOpen: false,
      requestModalOpen: false,
      uploadModalOpen: false,
      coffeeModalOpen: false,
      editMode: false,
      id: props.id,
      userName: props.username,
      bio: props.bio,
      gender: props.gender,
      avatar: props.avatar,
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
      newCardCaption: ""
    };
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
      cityModalOpen,
      countryModalOpen,
      continentModalOpen,
      followersModalOpen,
      followingsModalOpen,
      knowingFollowersModalOpen,
      requestModalOpen,
      uploadModalOpen,
      coffeeModalOpen,
      editMode,
      userName,
      bio,
      gender,
      avatar,
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
      newCardCaption
    } = this.state;
    return (
      <RequestCoffeeMutation
        mutation={REQUEST_COFFEE}
        variables={{
          currentCity: localStorage.getItem("cityName")
        }}
        onCompleted={this.onCompletedRequestCoffee}
        update={this.updateRequestCoffee}
      >
        {requestCoffeeFn => {
          this.requestCoffeeFn = requestCoffeeFn;
          return (
            <GetMyCoffeeQuery
              query={GET_MY_COFFEE}
              variables={{
                username
              }}
            >
              {({ data: myCoffeeData, loading: myCoffeeLoading }) => {
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
                        <UploadMutation
                          mutation={UPLOAD_CARD}
                          variables={{
                            caption: newCardCaption
                          }}
                          onCompleted={this.onCompletedUpload}
                          update={this.updateUpload}
                        >
                          {uploadCardFn => {
                            this.uploadCardFn = uploadCardFn;
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
                                                refetchQueries={[
                                                  {
                                                    query: GET_USER,
                                                    variables: { username }
                                                  }
                                                ]}
                                                variables={{
                                                  userName,
                                                  bio,
                                                  gender,
                                                  avatar,
                                                  firstName,
                                                  lastName
                                                }}
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
                                                          <TopCountriesQuery
                                                            query={
                                                              TOP_COUNTRIES
                                                            }
                                                            variables={{
                                                              username
                                                            }}
                                                          >
                                                            {({
                                                              data: topCountriesData,
                                                              loading: topCountriesLoading
                                                            }) => {
                                                              return (
                                                                <FrequentVisitsQuery
                                                                  query={
                                                                    FREQUENT_VISITS
                                                                  }
                                                                  variables={{
                                                                    username
                                                                  }}
                                                                >
                                                                  {({
                                                                    data: frequentVisitsData,
                                                                    loading: frequentVisitsLoading
                                                                  }) => {
                                                                    return (
                                                                      <GetTiprsQuery
                                                                        query={
                                                                          GET_TRIPS
                                                                        }
                                                                        variables={{
                                                                          username,
                                                                          tripPage
                                                                        }}
                                                                      >
                                                                        {({
                                                                          data: getTripsData,
                                                                          loading: getTipsLoading,
                                                                          fetchMore
                                                                        }) => {
                                                                          this.fetchMore = fetchMore;
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
                                                                                                cityModalOpen={
                                                                                                  cityModalOpen
                                                                                                }
                                                                                                countryModalOpen={
                                                                                                  countryModalOpen
                                                                                                }
                                                                                                continentModalOpen={
                                                                                                  continentModalOpen
                                                                                                }
                                                                                                followersModalOpen={
                                                                                                  followersModalOpen
                                                                                                }
                                                                                                followingsModalOpen={
                                                                                                  followingsModalOpen
                                                                                                }
                                                                                                uploadModalOpen={
                                                                                                  uploadModalOpen
                                                                                                }
                                                                                                coffeeModalOpen={
                                                                                                  coffeeModalOpen
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
                                                                                                toggleTripSeeAll={
                                                                                                  this
                                                                                                    .toggleTripSeeAll
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
                                                                                                toggleCityModal={
                                                                                                  this
                                                                                                    .toggleCityModal
                                                                                                }
                                                                                                toggleCountryModal={
                                                                                                  this
                                                                                                    .toggleCountryModal
                                                                                                }
                                                                                                toggleContinentModal={
                                                                                                  this
                                                                                                    .toggleContinentModal
                                                                                                }
                                                                                                toggleFollowersModal={
                                                                                                  this
                                                                                                    .toggleFollowersModal
                                                                                                }
                                                                                                toggleFollowingsModal={
                                                                                                  this
                                                                                                    .toggleFollowingsModal
                                                                                                }
                                                                                                toggleUploadModal={
                                                                                                  this
                                                                                                    .toggleUploadModal
                                                                                                }
                                                                                                toggleCoffeeModal={
                                                                                                  this
                                                                                                    .toggleCoffeeModal
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
                                                                                                topCountriesData={
                                                                                                  topCountriesData
                                                                                                }
                                                                                                topCountriesLoading={
                                                                                                  topCountriesLoading
                                                                                                }
                                                                                                frequentVisitsData={
                                                                                                  frequentVisitsData
                                                                                                }
                                                                                                frequentVisitsLoading={
                                                                                                  frequentVisitsLoading
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
                                                                                                onKeyUp={
                                                                                                  this
                                                                                                    .onKeyUp
                                                                                                }
                                                                                                onKeyUpCard={
                                                                                                  this
                                                                                                    .onKeyUpCard
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
                                                                                                knowingFollowersModalOpen={
                                                                                                  knowingFollowersModalOpen
                                                                                                }
                                                                                                toggleKnowingFollowersModal={
                                                                                                  this
                                                                                                    .toggleKnowingFollowersModal
                                                                                                }
                                                                                                uploadNewCard={
                                                                                                  this
                                                                                                    .uploadNewCard
                                                                                                }
                                                                                                newCardCaption={
                                                                                                  newCardCaption
                                                                                                }
                                                                                                duration={
                                                                                                  this
                                                                                                    .duration
                                                                                                }
                                                                                                myCoffeeData={
                                                                                                  myCoffeeData
                                                                                                }
                                                                                                myCoffeeLoading={
                                                                                                  myCoffeeLoading
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
                                                                </FrequentVisitsQuery>
                                                              );
                                                            }}
                                                          </TopCountriesQuery>
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
                        </UploadMutation>
                      );
                    }}
                  </DeleteCoffeeMutation>
                );
              }}
            </GetMyCoffeeQuery>
          );
        }}
      </RequestCoffeeMutation>
    );
  }

  //
  // PROFILE
  //

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
  public onKeyUp = event => {
    const { userName, bio, gender, avatar, firstName, lastName } = this.state;
    const { keyCode } = event;
    if (keyCode === 13) {
      this.editProfileFn({
        variables: {
          username: userName,
          bio,
          gender,
          avatar,
          firstName,
          lastName
        }
      });
    } else {
      return null;
    }
    this.setState({
      editMode: false
    });
  };

  public onKeyUpCard = event => {
    const { keyCode } = event;
    if (keyCode === 13) {
      this.uploadCardFn();
    } else {
      return null;
    }
  };

  //
  // TRIP
  //

  public toggleTripSeeAll = () => {
    const {
      match: {
        params: { username }
      }
    } = this.props;
    this.fetchMore({
      query: GET_TRIPS,
      variables: {
        tripPage: 1,
        username
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        } else {
          return {
            getTrips: {
              ...previousResult.getTrips,
              footprints: [
                ...previousResult.getTrips.footprints,
                ...fetchMoreResult.getTrips.footprints
              ]
            }
          };
        }
      }
    });
    console.log(this.state);
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
    console.log(this.state);
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
  public toggleUploadModal = () => {
    const { uploadModalOpen } = this.state;
    this.setState({
      uploadModalOpen: !uploadModalOpen
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
    const { tripModalOpen, tripAddModalOpen } = this.state;
    this.setState({
      tripAddModalOpen: !tripAddModalOpen,
      tripModalOpen: !tripModalOpen
    });
  };
  public toggleEditTripModal = () => {
    const { tripModalOpen, tripEditModalOpen } = this.state;
    this.setState({
      tripEditModalOpen: !tripEditModalOpen,
      tripModalOpen: !tripModalOpen
    });
  };
  public toggleCityModal = () => {
    const { cityModalOpen } = this.state;
    this.setState({
      cityModalOpen: !cityModalOpen
    });
  };
  public toggleCountryModal = () => {
    const { countryModalOpen } = this.state;
    this.setState({
      countryModalOpen: !countryModalOpen
    });
  };
  public toggleContinentModal = () => {
    const { continentModalOpen } = this.state;
    this.setState({
      continentModalOpen: !continentModalOpen
    });
  };
  public toggleFollowersModal = () => {
    const { followersModalOpen } = this.state;
    this.setState({ followersModalOpen: !followersModalOpen });
  };
  public toggleFollowingsModal = () => {
    const { followingsModalOpen } = this.state;
    this.setState({ followingsModalOpen: !followingsModalOpen });
  };
  public toggleKnowingFollowersModal = () => {
    const { knowingFollowersModalOpen } = this.state;
    this.setState({ knowingFollowersModalOpen: !knowingFollowersModalOpen });
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
    const {
      moveNotificationId,
      cityName,
      startDate,
      endDate,
      tripEditModalOpen
    } = this.state;
    this.setState({
      tripModalOpen: false
    });
    this.editTripFn({
      variables: { moveNotificationId, cityName, startDate, endDate }
    });
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
    this.setState({ startDate, endDate });
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
  };
  public gotoTrip = (
    cityName,
    cityPhoto,
    countryName,
    tripStartDate,
    tripEndDate
  ) => {
    this.props.history.push({
      pathname: `/city/${cityName}/${tripStartDate}${" "}${tripEndDate}`,
      state: {
        cityName,
        cityPhoto,
        countryName,
        tripStartDate,
        tripEndDate
      }
    });
    this.setState({
      cityName: null,
      cityPhoto: null,
      countryName: null,
      tripStartDate: null,
      tripEndDate: null
    });
  };
  public uploadNewCard = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event;
    this.setState({
      newCardCaption: value
    } as any);
  };
  public onCompletedUpload = data => {
    if (data.uploadCard.card) {
      toast.success("Card uploaded");
    } else {
      toast.error("error");
    }
    this.setState({
      newCardCaption: ""
    });
  };
  public updateUpload = (cache, { data: { uploadCard } }) => {
    const cityName = localStorage.getItem("cityName");
    const {
      match: {
        params: { username }
      }
    } = this.props;

    try {
      const profileData = cache.readQuery({
        query: GET_USER,
        variables: { username }
      });
      if (profileData) {
        profileData.userProfile.user.cards.unshift(uploadCard.card);
        cache.writeQuery({
          query: GET_USER,
          variables: { username },
          data: profileData
        });
      }
    } catch (e) {
      console.log(e);
    }

    try {
      const feedData = cache.readQuery({
        query: GET_FEED,
        variables: { page: 0, cityName }
      });
      if (feedData) {
        feedData.feed.cards.unshift(uploadCard.card);
        cache.writeQuery({
          query: GET_FEED,
          variables: { page: 0, cityName },
          data: feedData
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  public duration = (startDate, endDate) => {
    const startDateMoment = moment(startDate);
    const endDateMoment = moment(endDate);
    return endDateMoment.diff(startDateMoment, "days");
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
        data.getTrips.footprints = data.getTrips.footprints.filter(
          i => parseInt(i.id, 10) !== deleteTrip.tripId
        );
        console.log(data.getTrips.footprints);
        console.log(deleteTrip);
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
    if (data.deleteTrip.ok) {
      toast.success("Coffee deleted");
    } else {
      toast.error("error");
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
        query: GET_MY_COFFEE,
        variables: { username }
      });
      if (data) {
        data.getMyCoffee.coffees = data.getMyCoffee.coffees.filter(
          i => parseInt(i.id, 10) !== deleteCoffee.coffeeId
        );
        cache.writeQuery({
          query: GET_MY_COFFEE,
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
  public toggleCoffeeModal = () => {
    const { coffeeModalOpen } = this.state;
    this.setState({
      coffeeModalOpen: !coffeeModalOpen
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
          coffeePage: 0,
          cityName: localStorage.getItem("cityName")
        }
      });
      if (feedData) {
        feedData.getCoffees.coffees.unshift(requestCoffee.coffee);
        cache.writeQuery({
          query: GET_COFFEES,
          variables: {
            coffeePage: 0,
            cityName: localStorage.getItem("cityName")
          },
          data: feedData
        });
      }
    } catch (e) {
      console.log(e);
    }

    try {
      const profileData = cache.readQuery({
        query: GET_MY_COFFEE,
        variables: {
          username
        }
      });
      if (profileData) {
        profileData.getMyCoffee.requestingCoffees.push(requestCoffee.coffee);
        cache.writeQuery({
          query: GET_MY_COFFEE,
          variables: {
            username
          },
          data: profileData
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export default withRouter(UserProfileContainer);
