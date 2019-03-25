import React from "react";
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
import { GetTrips, GetTripsVariables, AddTripVariables } from "../../types/api";
import { GET_TRIPS, ADD_TRIP } from "./UserProfileQueries";
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
class GetTiprsQuery extends Query<GetTrips, GetTripsVariables> {}
class EditProfileMutation extends Mutation<EditProfile, EditProfileVariables> {}
class DeleteProfileMutation extends Mutation<DeleteProfile> {}
class LogOutMutation extends Mutation {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  modalOpen: boolean;
  confirmModalOpen: boolean;
  editMode: boolean;
  id: string;
  userName: string;
  bio: string;
  gender: string;
  avatar: string;
  firstName: string;
  lastName: string;
  cityName: string;
  fromDate: string;
  toDate: string;
}

class UserProfileContainer extends React.Component<IProps, IState> {
  public logUserOutFn: MutationFn;
  public editProfileFn: MutationFn;
  public deleteProfileFn: MutationFn;
  public AddTripFn: MutationFn;

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      confirmModalOpen: false,
      editMode: false,
      id: props.id,
      userName: props.username,
      bio: props.bio,
      gender: props.gender,
      avatar: props.avatar,
      firstName: props.FirstName,
      lastName: props.lastName,
      cityName: "",
      fromDate: "",
      toDate: ""
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
      editMode,
      userName,
      bio,
      gender,
      avatar,
      firstName,
      lastName,
      cityName,
      fromDate,
      toDate
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
                                          {AddTripFn => {
                                            this.AddTripFn = AddTripFn;
                                            return (
                                              <UserProfilePresenter
                                                modalOpen={modalOpen}
                                                confirmModalOpen={
                                                  confirmModalOpen
                                                }
                                                editMode={editMode}
                                                logUserOutFn={logUserOutFn}
                                                confirmDeleteProfile={
                                                  this.confirmDeleteProfile
                                                }
                                                toggleModal={this.toggleModal}
                                                toggleConfirmModal={
                                                  this.toggleConfirmModal
                                                }
                                                openEditMode={this.openEditMode}
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
                                                getTripsData={getTripsData}
                                                getTipsLoading={getTipsLoading}
                                                onInputChange={
                                                  this.onInputChange
                                                }
                                                onKeyUp={this.onKeyUp}
                                                userName={userName}
                                                bio={bio}
                                                gender={gender}
                                                firstName={firstName}
                                                lastName={lastName}
                                              />
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
  public toggleModal = () => {
    this.setState(state => {
      return {
        modalOpen: !state.modalOpen
      };
    });
  };
  public toggleConfirmModal = () => {
    this.setState(state => {
      return {
        confirmModalOpen: !state.confirmModalOpen,
        modalOpen: !state.modalOpen
      };
    });
  };
  public confirmDeleteProfile = () => {
    this.deleteProfileFn();
    this.logUserOutFn();
  };
  public openEditMode = () => {
    this.setState(state => {
      return {
        modalOpen: !state.modalOpen,
        editMode: true
      };
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
