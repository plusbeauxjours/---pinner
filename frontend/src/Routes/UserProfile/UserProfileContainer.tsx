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
  UploadCardVariables
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
  GET_KNOWING_FOLLOWERS
} from "./UserProfileQueries";
import { withRouter, RouteComponentProps } from "react-router";
import { LOG_USER_OUT } from "src/sharedQueries.local";
import { toast } from "react-toastify";
import { UPLOAD_CARD } from "./UserProfileQueries";
import { GET_FEED } from "../Feed/FeedQueries";

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
  topCountriesModalOpen: boolean;
  frequentVisitsModalOpen: boolean;
  cityModalOpen: boolean;
  countryModalOpen: boolean;
  continentModalOpen: boolean;
  followersModalOpen: boolean;
  followingsModalOpen: boolean;
  knowingFollowersModalOpen: boolean;
  uploadModalOpen: boolean;
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
  tripPage: number;
  topCountryPage: number;
  frequentVisitPage: number;
  topCountriesList: any;
  frequentVisitsList: any;
  newCardCaption: string;
  selfCards: any;
  selfTrips: any;
}

class UserProfileContainer extends React.Component<IProps, IState> {
  public logUserOutFn: MutationFn;
  public editProfileFn: MutationFn;
  public deleteProfileFn: MutationFn;
  public addTripFn: MutationFn;
  public editTripFn: MutationFn;
  public deleteTripFn: MutationFn;
  public uploadCardFn: MutationFn;
  public fetchMore;
  public topCountryFetchMore;
  public frequentVisitFetchMore;
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      confirmModalOpen: false,
      tripModalOpen: false,
      tripConfirmModalOpen: false,
      tripAddModalOpen: false,
      tripEditModalOpen: false,
      topCountriesModalOpen: false,
      frequentVisitsModalOpen: false,
      cityModalOpen: false,
      countryModalOpen: false,
      continentModalOpen: false,
      followersModalOpen: false,
      followingsModalOpen: false,
      knowingFollowersModalOpen: false,
      uploadModalOpen: false,
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
      tripPage: 0,
      topCountryPage: 0,
      frequentVisitPage: 0,
      topCountriesList: null,
      frequentVisitsList: null,
      newCardCaption: "",
      selfCards: [],
      selfTrips: []
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
      topCountriesModalOpen,
      frequentVisitsModalOpen,
      cityModalOpen,
      countryModalOpen,
      continentModalOpen,
      followersModalOpen,
      followingsModalOpen,
      knowingFollowersModalOpen,
      uploadModalOpen,
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
      tripPage,
      topCountryPage,
      frequentVisitPage,
      topCountriesList,
      frequentVisitsList,
      newCardCaption,
      selfCards,
      selfTrips
    } = this.state;
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
                                { query: GET_USER, variables: { username } }
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
                                const { editProfile } = editData;
                                if (editProfile.ok) {
                                  toast.success("Profile updated!");
                                } else {
                                  toast.error("Profile Could not Updated!");
                                }
                              }}
                            >
                              {editProfileFn => {
                                this.editProfileFn = editProfileFn;
                                return (
                                  <DeleteProfileMutation
                                    mutation={DELETE_PROFILE}
                                    onCompleted={deleteResult => {
                                      const { deleteProfile } = deleteResult;
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
                                        <TopCountriesQuery
                                          query={TOP_COUNTRIES}
                                          variables={{
                                            username,
                                            topCountryPage
                                          }}
                                        >
                                          {({
                                            data: topCountriesData,
                                            loading: topCountriesLoading,
                                            fetchMore: topCountryFetchMore
                                          }) => {
                                            this.topCountryFetchMore = topCountryFetchMore;
                                            return (
                                              <FrequentVisitsQuery
                                                query={FREQUENT_VISITS}
                                                variables={{
                                                  username,
                                                  frequentVisitPage
                                                }}
                                              >
                                                {({
                                                  data: frequentVisitsData,
                                                  loading: frequentVisitsLoading,
                                                  fetchMore: frequentVisitFetchMore
                                                }) => {
                                                  this.frequentVisitFetchMore = frequentVisitFetchMore;
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
                                                        loading: getTipsLoading,
                                                        fetchMore
                                                      }) => {
                                                        this.fetchMore = fetchMore;
                                                        return (
                                                          <AddTripMutation
                                                            mutation={ADD_TRIP}
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
                                                                        onCompleted={() =>
                                                                          this.setState(
                                                                            {
                                                                              moveNotificationId:
                                                                                ""
                                                                            }
                                                                          )
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
                                                                              topCountriesModalOpen={
                                                                                topCountriesModalOpen
                                                                              }
                                                                              frequentVisitsModalOpen={
                                                                                frequentVisitsModalOpen
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
                                                                              toggleTopCountriesSeeAll={
                                                                                this
                                                                                  .toggleTopCountriesSeeAll
                                                                              }
                                                                              toggleFrequentVisitsSeeAll={
                                                                                this
                                                                                  .toggleFrequentVisitsSeeAll
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
                                                                              toggleTopCountriesModal={
                                                                                this
                                                                                  .toggleTopCountriesModal
                                                                              }
                                                                              toggleFrequentVisitsModal={
                                                                                this
                                                                                  .toggleFrequentVisitsModal
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
                                                                              topCountriesList={
                                                                                topCountriesList
                                                                              }
                                                                              frequentVisitsList={
                                                                                frequentVisitsList
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
                                                                              selfCards={
                                                                                selfCards
                                                                              }
                                                                              selfTrips={
                                                                                selfTrips
                                                                              }
                                                                              duration={
                                                                                this
                                                                                  .duration
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
          console.log(previousResult);
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
  };
  public toggleTopCountriesSeeAll = () => {
    const {
      match: {
        params: { username }
      }
    } = this.props;
    const { topCountriesModalOpen } = this.state;
    this.topCountryFetchMore({
      query: TOP_COUNTRIES,
      variables: {
        topCountryPage: 1,
        username
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        this.setState({
          topCountriesList: [
            ...previousResult.topCountries.footprints,
            ...fetchMoreResult.topCountries.footprints
          ],
          topCountriesModalOpen: !topCountriesModalOpen
        });
      }
    });
  };
  public toggleFrequentVisitsSeeAll = () => {
    const {
      match: {
        params: { username }
      }
    } = this.props;
    const { frequentVisitsModalOpen } = this.state;
    this.frequentVisitFetchMore({
      query: FREQUENT_VISITS,
      variables: {
        frequentVisitPage: 1,
        username
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        this.setState({
          frequentVisitsList: [
            ...previousResult.frequentVisits.footprints,
            ...fetchMoreResult.frequentVisits.footprints
          ],
          frequentVisitsModalOpen: !frequentVisitsModalOpen
        });
      }
    });
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
  public toggleTopCountriesModal = () => {
    const { topCountriesModalOpen } = this.state;
    this.setState({
      topCountriesModalOpen: !topCountriesModalOpen
    });
  };
  public toggleFrequentVisitsModal = () => {
    const { frequentVisitsModalOpen } = this.state;
    this.setState({
      frequentVisitsModalOpen: !frequentVisitsModalOpen
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
  public addSelfCard = data => {
    const { selfCards, newCardCaption } = this.state;
    console.log(data);
    const {
      uploadCard: { card }
    } = data;
    console.log(card);
    if (card) {
      this.setState({
        selfCards: [
          {
            id: card.id,
            file: card.file,
            caption: newCardCaption,
            likeCount: card.likeCount,
            commentCount: card.commentCount
          },
          ...selfCards
        ],
        newCardCaption: ""
      });
    }
  };
  public onCompletedUpload = data => {
    if (data.uploadCard.card) {
      toast.success("Card uploaded");
    } else {
      toast.error("error");
    }
  };
  public updateUpload = (cache, { data: { uploadCard } }) => {
    const cityName = localStorage.getItem("cityName");
    const {
      match: {
        params: { username }
      }
    } = this.props;
    console.log(cityName);
    const userData = cache.readQuery({
      query: GET_USER,
      variables: { username }
    });
    const feedData = cache.readQuery({
      query: GET_FEED,
      variables: { page: 0, cityName }
    });
    console.log(uploadCard.card);
    console.log(feedData);
    userData.userProfile.user.cards.unshift(uploadCard.card);
    feedData.feed.cards.unshift(uploadCard.card);
    cache.writeQuery({
      query: GET_USER,
      variables: { username },
      userData
    });
    cache.writeQuery({
      query: GET_FEED,
      variables: { page: 0, cityName },
      feedData
    });
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
  public updateEditTrip = async (cache, { data: { editTrip } }) => {
    const {
      match: {
        params: { username }
      }
    } = this.props;
    const { tripPage } = this.state;
    const data = cache.readQuery({
      query: GET_TRIPS,
      variables: { username, tripPage }
    });
    console.log(data.getTrips.footprints);
    console.log(editTrip);
    await cache.writeQuery({
      query: GET_USER,
      variables: { username },
      data
    });
  };
}

export default withRouter(UserProfileContainer);
