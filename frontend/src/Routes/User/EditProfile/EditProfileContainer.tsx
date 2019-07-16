import React from "react";
import EditProfilePresenter from "./EditProfilePresenter";
import { Mutation, MutationFn } from "react-apollo";
import {
  EditProfile,
  EditProfileVariables,
  DeleteProfile
} from "src/types/api";
import { EDIT_PROFILE, DELETE_PROFILE } from "./EditProfileQueries";

import { withRouter, RouteComponentProps } from "react-router";
import { LOG_USER_OUT } from "src/sharedQueries.local";
import { toast } from "react-toastify";
import { GET_USER } from "../UserProfile/UserProfileQueries";

class EditProfileMutation extends Mutation<EditProfile, EditProfileVariables> {}
class DeleteProfileMutation extends Mutation<DeleteProfile> {}
class LogOutMutation extends Mutation {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  deleteConfirmModalOpen: boolean;
  logoutConfirmModalOpen: boolean;
  profilFormModalOpen: boolean;

  username: string;
  isSelf: boolean;
  isDarkMode: boolean;
  isHideTrips: boolean;
  isHideCoffees: boolean;
  isHideCities: boolean;
  isHideCountries: boolean;
  isHideContinents: boolean;
  isAutoLocationReport: boolean;

  bio: string;
  gender: string;
  firstName: string;
  lastName: string;
  nationality: string;
  residence: string;
  avatar: any;
  email: string;
  confirmUsername: string;
}

class EditProfileContainer extends React.Component<IProps, IState> {
  public logUserOutFn: MutationFn;
  public editProfileFn: MutationFn;
  public deleteProfileFn: MutationFn;

  constructor(props) {
    super(props);
    const { location: { state = {} } = {} } = ({} = props);

    if (props.history.action === "POP" || !props.location.state) {
      props.history.push("/");
    }
    console.log(state);
    console.log(this.props);
    this.state = {
      deleteConfirmModalOpen: false,
      logoutConfirmModalOpen: false,
      profilFormModalOpen: true,

      isSelf: state.isSelf,
      isDarkMode: state.isDarkMode,
      isHideTrips: state.isHideTrips,
      isHideCoffees: state.isHideCoffees,
      isHideCities: state.isHideCities,
      isHideCountries: state.isHideCountries,
      isHideContinents: state.isHideContinents,
      isAutoLocationReport: state.isAutoLocationReport,

      username: state.username,
      bio: state.bio,
      gender: state.gender,
      firstName: state.firstName,
      lastName: state.lastName,
      nationality: state.nationality
        ? state.nationality.countryCode
        : localStorage.getItem("countryCode"),
      residence: state.residence
        ? state.residence.countryCode
        : localStorage.getItem("countryCode"),
      avatar: state.avatar,
      email: state.email,
      confirmUsername: props.confirmUsername || ""
    };
  }
  public render() {
    const { history } = this.props;
    const {
      deleteConfirmModalOpen,
      logoutConfirmModalOpen,
      profilFormModalOpen,

      isSelf,
      isDarkMode,
      isHideTrips,
      isHideCoffees,
      isHideCities,
      isHideCountries,
      isHideContinents,
      isAutoLocationReport,

      username,
      bio,
      gender,
      firstName,
      lastName,
      nationality,
      residence,
      avatar,
      email,
      confirmUsername
    } = this.state;
    return (
      <LogOutMutation mutation={LOG_USER_OUT}>
        {logUserOutFn => {
          this.logUserOutFn = logUserOutFn;
          return (
            <EditProfileMutation
              mutation={EDIT_PROFILE}
              update={this.updatEditProfile}
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
                        toast.success("profile deleted!");
                        setTimeout(() => {
                          history.push("/");
                        }, 2000);
                      } else {
                        toast.error("cann't delete profile");
                      }
                    }}
                  >
                    {deleteProfileFn => {
                      this.deleteProfileFn = deleteProfileFn;
                      return (
                        <EditProfilePresenter
                          deleteConfirmModalOpen={deleteConfirmModalOpen}
                          logoutConfirmModalOpen={logoutConfirmModalOpen}
                          toggleDeleteConfirmModal={
                            this.toggleDeleteConfirmModal
                          }
                          toggleLogoutConfirmModal={
                            this.toggleLogoutConfirmModal
                          }
                          profilFormModalOpen={profilFormModalOpen}
                          toggleProfileFormModal={this.toggleProfileFormModal}
                          deleteProfile={this.deleteProfile}
                          onInputChange={this.onInputChange}
                          onSelectChange={this.onSelectChange}
                          logUserOutFn={this.logUserOutFn}
                          back={this.back}
                          onSubmit={this.onSubmit}
                          // settings
                          isSelf={isSelf}
                          isDarkMode={isDarkMode}
                          isHideTrips={isHideTrips}
                          isHideCoffees={isHideCoffees}
                          isHideCities={isHideCities}
                          isHideCountries={isHideCountries}
                          isHideContinents={isHideContinents}
                          isAutoLocationReport={isAutoLocationReport}
                          // new
                          username={username}
                          bio={bio}
                          gender={gender}
                          firstName={firstName}
                          lastName={lastName}
                          nationality={nationality}
                          residence={residence}
                          avatar={avatar}
                          email={email}
                          confirmUsername={confirmUsername}
                        />
                      );
                    }}
                  </DeleteProfileMutation>
                );
              }}
            </EditProfileMutation>
          );
        }}
      </LogOutMutation>
    );
  }
  public deleteProfile = () => {
    this.deleteProfileFn();
    this.logUserOutFn();
  };
  public onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    const {
      username,
      bio,
      gender,
      firstName,
      lastName,
      nationality,
      residence,
      email
    } = this.state;

    this.editProfileFn({
      variables: {
        username,
        bio,
        gender,
        firstName,
        lastName,
        nationality,
        residence,
        email
      }
    });
  };
  public toggleDeleteConfirmModal = () => {
    const { deleteConfirmModalOpen } = this.state;
    this.setState({
      deleteConfirmModalOpen: !deleteConfirmModalOpen
    } as any);
  };
  public toggleLogoutConfirmModal = () => {
    const { logoutConfirmModalOpen } = this.state;
    this.setState({
      logoutConfirmModalOpen: !logoutConfirmModalOpen
    } as any);
  };
  public toggleProfileFormModal = () => {
    this.setState({
      profilFormModalOpen: false
    } as any);
  };
  public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
    console.log(name, value);
    console.log(this.state);
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
  public onSelectChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
    console.log(this.state);
  };
  public back = async event => {
    const { history } = this.props;
    const { username } = this.state;
    event.stopPropagation();
    history.push(`/${username}`);
  };
}

export default withRouter(EditProfileContainer);
