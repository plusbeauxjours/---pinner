import React from "react";
import moment from "moment";
import UserProfilePresenter from "./UserProfilePresenter";
import { Query, Mutation, MutationFn } from "react-apollo";
import { UserProfile, UserProfileVariables, AddTrip } from "src/types/api";
import {
  GET_USER,
  EDIT_PROFILE,
  DELETE_PROFILE,
  TOP_COUNTRIES,
  FREQUENT_VISITS
} from "./UserProfileQueries";
import { withRouter, RouteComponentProps } from "react-router";
import { LOG_USER_OUT } from "src/sharedQueries.local";
import {
  EditProfile,
  EditProfileVariables,
  DeleteProfile,
  TopCountries,
  FrequentVisits
} from "../../types/api";
import { toast } from "react-toastify";
import {
  GetTrips,
  GetTripsVariables,
  AddTripVariables,
  EditTrip,
  EditTripVariables
} from "../../types/api";
import {
  GET_TRIPS,
  ADD_TRIP,
  EDIT_TRIP,
  DELETE_TRIP
} from "./UserProfileQueries";
import { DeleteTrip, DeleteTripVariables } from "../../types/api";
import {
  TopCountriesVariables,
  FrequentVisitsVariables
} from "../../types/api";

class UserProfileQuery extends Query<UserProfile, UserProfileVariables> {}
class TopCountriesQuery extends Query<TopCountries, TopCountriesVariables> {}
class FrequentVisitsQuery extends Query<
  FrequentVisits,
  FrequentVisitsVariables
> {}
class AddTripMutation extends Mutation<AddTrip, AddTripVariables> {}
class EditTripMutation extends Mutation<EditTrip, EditTripVariables> {}
class DeleteTripMutation extends Mutation<DeleteTrip, DeleteTripVariables> {}
class GetTiprsQuery extends Query<GetTrips, GetTripsVariables> {}
class EditProfileMutation extends Mutation<EditProfile, EditProfileVariables> {}
class DeleteProfileMutation extends Mutation<DeleteProfile> {}
class LogOutMutation extends Mutation {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  modalOpen: boolean;
  confirmModalOpen: boolean;
  tripModalOpen: boolean;
  tripConfirmModalOpen: boolean;
  tripFromModalOpen: boolean;
  editMode: boolean;
  id: string;
  userName: string;
  bio: string;
  gender: string;
  avatar: string;
  firstName: string;
  lastName: string;
  cityName: string;
  fromDate: moment.Moment | null;
  toDate: moment.Moment | null;
  focusedInput: any;
  moveNotificationId: string;
}

class UserProfileContainer extends React.Component<IProps, IState> {
  public logUserOutFn: MutationFn;
  public editProfileFn: MutationFn;
  public deleteProfileFn: MutationFn;
  public addTripFn: MutationFn;
  public editTripFn: MutationFn;
  public deleteTripFn: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      confirmModalOpen: false,
      tripModalOpen: false,
      tripConfirmModalOpen: false,
      tripFromModalOpen: false,
      editMode: false,
      id: props.id,
      userName: props.username,
      bio: props.bio,
      gender: props.gender,
      avatar: props.avatar,
      firstName: props.FirstName,
      lastName: props.lastName,
      cityName: "",
      fromDate: null,
      toDate: null,
      focusedInput: null,
      moveNotificationId: ""
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
      tripFromModalOpen,
      editMode,
      userName,
      bio,
      gender,
      avatar,
      firstName,
      lastName,
      cityName,
      fromDate,
      toDate,
      focusedInput,
      moveNotificationId
    } = this.state;
    return (
      <LogOutMutation mutation={LOG_USER_OUT}>
        {logUserOutFn => {
          this.logUserOutFn = logUserOutFn;
          return (
            <UserProfileQuery query={GET_USER} variables={{ username }}>
              {({ data: userProfileData, loading: userProfileLoading }) => (
                <EditProfileMutation
                  mutation={EDIT_PROFILE}
                  refetchQueries={[{ query: GET_USER, variables: username }]}
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
                              variables={{ username }}
                            >
                              {({
                                data: topCountriesData,
                                loading: topCountriesLoading
                              }) => (
                                <FrequentVisitsQuery
                                  query={FREQUENT_VISITS}
                                  variables={{ username }}
                                >
                                  {({
                                    data: frequentVisitsData,
                                    loading: frequentVisitsLoading
                                  }) => (
                                    <GetTiprsQuery
                                      query={GET_TRIPS}
                                      variables={{ username }}
                                    >
                                      {({
                                        data: getTripsData,
                                        loading: getTipsLoading
                                      }) => (
                                        <AddTripMutation
                                          mutation={ADD_TRIP}
                                          variables={{
                                            cityName,
                                            fromDate,
                                            toDate
                                          }}
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
                                                  cityName,
                                                  fromDate,
                                                  toDate
                                                }}
                                              >
                                                {editTripFn => {
                                                  this.editTripFn = editTripFn;
                                                  return (
                                                    <DeleteTripMutation
                                                      mutation={DELETE_TRIP}
                                                      variables={{
                                                        moveNotificationId: parseInt(
                                                          moveNotificationId,
                                                          10
                                                        )
                                                      }}
                                                      onCompleted={() =>
                                                        this.setState({
                                                          moveNotificationId: ""
                                                        })
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
                                                            tripFromModalOpen={
                                                              tripFromModalOpen
                                                            }
                                                            editMode={editMode}
                                                            logUserOutFn={
                                                              logUserOutFn
                                                            }
                                                            confirmDeleteProfile={
                                                              this
                                                                .confirmDeleteProfile
                                                            }
                                                            confirmDeleteTrip={
                                                              this
                                                                .confirmDeleteTrip
                                                            }
                                                            toggleModal={
                                                              this.toggleModal
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
                                                            openEditMode={
                                                              this.openEditMode
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
                                                            getTipsLoading={
                                                              getTipsLoading
                                                            }
                                                            onInputChange={
                                                              this.onInputChange
                                                            }
                                                            onKeyUp={
                                                              this.onKeyUp
                                                            }
                                                            userName={userName}
                                                            bio={bio}
                                                            gender={gender}
                                                            firstName={
                                                              firstName
                                                            }
                                                            lastName={lastName}
                                                            cityName={cityName}
                                                            fromDate={fromDate}
                                                            toDate={toDate}
                                                            focusedInput={
                                                              focusedInput
                                                            }
                                                            onDatesChange={
                                                              this.onDatesChange
                                                            }
                                                            onFocusChange={
                                                              this.onFocusChange
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
                                      )}
                                    </GetTiprsQuery>
                                  )}
                                </FrequentVisitsQuery>
                              )}
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
  }

  //
  // MODAL
  //

  public toggleModal = () => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen
    } as any);
  };
  public toggleTripModal = moveNotificationId => {
    const { tripModalOpen } = this.state;
    this.setState({
      tripModalOpen: !tripModalOpen,
      moveNotificationId
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
    const { tripModalOpen, tripFromModalOpen } = this.state;
    this.setState({
      tripFromModalOpen: !tripFromModalOpen,
      tripModalOpen: !tripModalOpen
    });
  };

  //
  // DELETE
  //

  public confirmDeleteProfile = () => {
    this.deleteProfileFn();
    this.logUserOutFn();
  };
  public confirmDeleteTrip = () => {
    const { moveNotificationId, tripConfirmModalOpen } = this.state;
    this.setState({
      tripModalOpen: false
    });
    this.deleteTripFn({
      variables: { moveNotificationId }
    });
    console.log(this.state);
    this.setState({
      tripConfirmModalOpen: !tripConfirmModalOpen,
      moveNotificationId: ""
    });
  };

  //
  // CREATE
  //

  public addMoveNotification = () => {
    const { cityName, fromDate, toDate, tripConfirmModalOpen } = this.state;
    this.setState({
      tripModalOpen: false
    });
    this.addTripFn({
      variables: { cityName, fromDate, toDate }
    });
    this.setState({
      tripConfirmModalOpen: !tripConfirmModalOpen,
      moveNotificationId: "",
      cityName: "",
      fromDate: null,
      toDate: null
    });
  };
  public onDatesChange = ({ fromDate, toDate }) => {
    this.setState({ fromDate, toDate });
  };
  public onFocusChange = focusedInput => {
    console.log("on focus change", focusedInput);
    this.setState({ focusedInput });
  };

  //
  // EDIT
  //

  public editMoveNotification = () => {
    const {
      moveNotificationId,
      cityName,
      fromDate,
      toDate,
      tripConfirmModalOpen
    } = this.state;
    this.setState({
      tripModalOpen: false
    });
    this.editTripFn({
      variables: { moveNotificationId, cityName, fromDate, toDate }
    });
    this.setState({
      tripConfirmModalOpen: !tripConfirmModalOpen,
      moveNotificationId: "",
      cityName: "",
      fromDate: null,
      toDate: null
    });
  };

  public openEditMode = () => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen,
      editMode: true
    });
    console.log(this.state);
  };
  public closeEditMode = () => {
    this.setState({
      editMode: false
    });
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
}

export default withRouter(UserProfileContainer);
