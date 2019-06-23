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
  modalOpen: boolean;
  confirmModalOpen: boolean;
  profilFormModalOpen: boolean;
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
  cityName: string;
  cityId: string;
  cityPhoto: string;
  countryName: string;
  lat: number;
  lng: number;
  isSelf: boolean;
}

class EditProfileContainer extends React.Component<IProps, IState> {
  public logUserOutFn: MutationFn;
  public editProfileFn: MutationFn;
  public deleteProfileFn: MutationFn;

  constructor(props) {
    super(props);
    const { location: { state = {} } = {} } = ({} = props);
    this.state = {
      modalOpen: false,
      confirmModalOpen: false,
      profilFormModalOpen: true,
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

      cityName: props.cityName,
      cityId: props.cityId,
      cityPhoto: props.cityPhoto,
      countryName: props.countryName,

      lat: state.currentLat,
      lng: state.currentLng,
      isSelf: state.isSelf
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
      profilFormModalOpen,
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
      cityName,
      cityId,
      cityPhoto,
      countryName,
      isSelf
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
                        <EditProfilePresenter
                          modalOpen={modalOpen}
                          confirmModalOpen={confirmModalOpen}
                          profilFormModalOpen={profilFormModalOpen}
                          editMode={editMode}
                          logUserOutFn={logUserOutFn}
                          confirmDeleteProfile={this.confirmDeleteProfile}
                          toggleModal={this.toggleModal}
                          toggleConfirmModal={this.toggleConfirmModal}
                          toggleProfileFormModal={this.toggleProfileFormModal}
                          openEditMode={this.openEditMode}
                          onInputChange={this.onInputChange}
                          onKeyDownSubmit={this.onKeyDownSubmit}
                          userName={userName}
                          bio={bio}
                          gender={gender}
                          avatar={avatar}
                          nationality={nationality}
                          residence={residence}
                          email={email}
                          firstName={firstName}
                          lastName={lastName}
                          cityName={cityName}
                          cityId={cityId}
                          cityPhoto={cityPhoto}
                          countryName={countryName}
                          username={username}
                          isSelf={isSelf}
                          onSelectChange={this.onSelectChange}
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
}

export default withRouter(EditProfileContainer);
