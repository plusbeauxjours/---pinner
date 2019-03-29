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
  tripAddModalOpen: boolean;
  tripEditModalOpen: boolean;
  editMode: boolean;
  id: string;
  userName: string;
  bio: string;
  gender: string;
  avatar: string;
  firstName: string;
  lastName: string;
  cityName: string;
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  focusedInput: "startDate" | "endDate" | null;
  moveNotificationId: string;
  tripPage: number;
  cityPage: number;
  countryPage: number;
  tripList: {};
}

class UserProfileContainer extends React.Component<IProps, IState> {
  public logUserOutFn: MutationFn;
  public editProfileFn: MutationFn;
  public deleteProfileFn: MutationFn;
  public addTripFn: MutationFn;
  public editTripFn: MutationFn;
  public deleteTripFn: MutationFn;
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
      editMode: false,
      id: props.id,
      userName: props.username,
      bio: props.bio,
      gender: props.gender,
      avatar: props.avatar,
      firstName: props.FirstName,
      lastName: props.lastName,
      cityName: props.cityName,
      startDate: props.cityName,
      endDate: props.cityName,
      focusedInput: null,
      moveNotificationId: null,
      tripPage: 0,
      cityPage: 0,
      countryPage: 0,
      tripList: {}
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
      editMode,
      userName,
      bio,
      gender,
      avatar,
      firstName,
      lastName,
      cityName,
      startDate,
      endDate,
      focusedInput,
      moveNotificationId,
      tripPage,
      cityPage,
      countryPage
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
                              variables={{ username, countryPage }}
                            >
                              {({
                                data: topCountriesData,
                                loading: topCountriesLoading
                              }) => (
                                <FrequentVisitsQuery
                                  query={FREQUENT_VISITS}
                                  variables={{ username, cityPage }}
                                >
                                  {({
                                    data: frequentVisitsData,
                                    loading: frequentVisitsLoading
                                  }) => (
                                    <GetTiprsQuery
                                      query={GET_TRIPS}
                                      variables={{ username, tripPage }}
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
                                                    startDate,
                                                    endDate
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
                                                            moveNotificationId:
                                                              ""
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
                                                              tripAddModalOpen={
                                                                tripAddModalOpen
                                                              }
                                                              tripEditModalOpen={
                                                                tripEditModalOpen
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
                                                              toggleEditTripModal={
                                                                this
                                                                  .toggleEditTripModal
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
                                                              getTipsLoading={
                                                                getTipsLoading
                                                              }
                                                              onInputChange={
                                                                this
                                                                  .onInputChange
                                                              }
                                                              onKeyUp={
                                                                this.onKeyUp
                                                              }
                                                              onKeyUpTrip={
                                                                this.onKeyUpTrip
                                                              }
                                                              userName={
                                                                userName
                                                              }
                                                              bio={bio}
                                                              gender={gender}
                                                              firstName={
                                                                firstName
                                                              }
                                                              lastName={
                                                                lastName
                                                              }
                                                              cityName={
                                                                cityName
                                                              }
                                                              startDate={
                                                                startDate
                                                              }
                                                              endDate={endDate}
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
                                                                this.addTrip
                                                              }
                                                              editTrip={
                                                                this.editTrip
                                                              }
                                                              deleteTrip={
                                                                this.deleteTrip
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
  // PROFILE
  //

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
  public onKeyUpTrip = event => {
    const { startDate, endDate, cityName } = this.state;
    const { keyCode } = event;
    if (keyCode === 13) {
      this.setState({
        startDate,
        endDate,
        cityName
      } as any);
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
        }
        const koko = Object.assign({}, previousResult.getTrips, {
          footprints: [
            ...previousResult.getTrips.footprints,
            ...fetchMoreResult.getTrips.footprints
          ]
        });
        this.setState({ tripList: koko });

        console.log(koko);
      }
    });
    console.log(this.state);
  };

  public toggleTripModal = (moveNotificationId, cityName) => {
    const { tripModalOpen } = this.state;
    this.setState({
      tripModalOpen: !tripModalOpen,
      moveNotificationId,
      cityName
    } as any);
    console.log(this.state);
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
    console.log(this.state);
  };
}

export default withRouter(UserProfileContainer);
