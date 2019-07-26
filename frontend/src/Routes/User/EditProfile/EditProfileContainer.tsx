import React from "react";
import EditProfilePresenter from "./EditProfilePresenter";
import { Mutation, MutationFn, Query } from "react-apollo";
import {
  EditProfile,
  EditProfileVariables,
  DeleteProfile,
  GetAvatars,
  GetAvatarsVariables,
  UploadAvatar,
  UploadAvatarVariables,
  DeleteAvatar,
  DeleteAvatarVariables,
  MarkAsMain,
  MarkAsMainVariables
} from "src/types/api";
import { EDIT_PROFILE, DELETE_PROFILE } from "./EditProfileQueries";

import { withRouter, RouteComponentProps } from "react-router";
import { LOG_USER_OUT } from "src/sharedQueries.local";
import { toast } from "react-toastify";
import { ME } from "../../../sharedQueries";
import {
  GET_USER,
  MARK_AS_MAIN,
  DELETE_AVATAR,
  UPLOAD_AVATAR,
  GET_AVATARS
} from "../UserProfile/UserProfileQueries";

class EditProfileMutation extends Mutation<EditProfile, EditProfileVariables> {}
class DeleteProfileMutation extends Mutation<DeleteProfile> {}
class LogOutMutation extends Mutation {}

class GetAvatarsQuery extends Query<GetAvatars, GetAvatarsVariables> {}
class UploadAvatarMutation extends Mutation<
  UploadAvatar,
  UploadAvatarVariables
> {}
class DeleteAvatarMutation extends Mutation<
  DeleteAvatar,
  DeleteAvatarVariables
> {}
class MarkAsMainMutation extends Mutation<MarkAsMain, MarkAsMainVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  deleteConfirmModalOpen: boolean;
  logoutConfirmModalOpen: boolean;
  profilFormModalOpen: boolean;
  modalOpen: boolean;

  file: any;
  imagePreviewUrl: any;

  avatarPreviewModalOpen: boolean;
  avatarModalOpen: boolean;

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
  avatarUrl: string;
  phoneNumber: string;
  countryPhoneNumber: string;
  countryPhoneCode: string;
  email: string;
  verifiedPhoneNumber: boolean;
  verifiedEmail: boolean;
  confirmUsername: string;
}

class EditProfileContainer extends React.Component<IProps, IState> {
  public logUserOutFn: MutationFn;
  public editProfileFn: MutationFn;
  public deleteProfileFn: MutationFn;

  public uploadAvatarFn: MutationFn;
  public deleteAvatarFn: MutationFn;
  public markAsMainFn: MutationFn;

  constructor(props) {
    super(props);
    const { location: { state = {} } = {} } = ({} = props);
    if (props.history.action === "POP" || !props.location.state) {
      props.history.goBack();
    }
    this.state = {
      deleteConfirmModalOpen: false,
      logoutConfirmModalOpen: false,
      profilFormModalOpen: true,
      modalOpen: false,

      imagePreviewUrl: "",
      file: "",
      avatarPreviewModalOpen: false,
      avatarModalOpen: false,

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
      avatarUrl: state.avatarUrl,
      phoneNumber: state.phoneNumber || "",
      countryPhoneNumber: state.countryPhoneNumber || "",
      countryPhoneCode: state.countryPhoneCode || "",
      email: state.email || "",
      verifiedPhoneNumber: state.verifiedPhoneNumber,
      verifiedEmail: state.verifiedEmail,
      confirmUsername: props.confirmUsername || ""
    };
  }
  public render() {
    const { history } = this.props;
    const {
      deleteConfirmModalOpen,
      logoutConfirmModalOpen,
      profilFormModalOpen,
      modalOpen,

      imagePreviewUrl,

      avatarPreviewModalOpen,
      avatarModalOpen,

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
      avatarUrl,
      phoneNumber,
      countryPhoneNumber,
      countryPhoneCode,
      email,
      verifiedPhoneNumber,
      verifiedEmail,
      confirmUsername
    } = this.state;
    return (
      <MarkAsMainMutation
        mutation={MARK_AS_MAIN}
        update={this.updateMarkAsMain}
        onCompleted={this.onCompletedMarkAsMain}
      >
        {markAsMainFn => {
          this.markAsMainFn = markAsMainFn;
          return (
            <DeleteAvatarMutation
              mutation={DELETE_AVATAR}
              update={this.updateDeleteAvatar}
              onCompleted={this.onCompletedDeleteAvatar}
            >
              {deleteAvatarFn => {
                this.deleteAvatarFn = deleteAvatarFn;
                return (
                  <UploadAvatarMutation
                    mutation={UPLOAD_AVATAR}
                    update={this.updatUploadAvatar}
                    onCompleted={this.onCompletedUploadAvatar}
                  >
                    {(uploadAvatarFn, { loading: uploadAvatarLoading }) => {
                      this.uploadAvatarFn = uploadAvatarFn;
                      return (
                        <GetAvatarsQuery
                          query={GET_AVATARS}
                          variables={{ userName: username }}
                        >
                          {({ data: avatarsData, loading: avatarsLoading }) => (
                            <LogOutMutation mutation={LOG_USER_OUT}>
                              {logUserOutFn => {
                                this.logUserOutFn = logUserOutFn;
                                return (
                                  <EditProfileMutation
                                    mutation={EDIT_PROFILE}
                                    update={this.updatEditProfile}
                                    refetchQueries={[
                                      {
                                        query: GET_USER,
                                        variables: {
                                          username
                                        }
                                      }
                                    ]}
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
                                              toast.success("profile deleted!");
                                              setTimeout(() => {
                                                history.push("/");
                                              }, 2000);
                                            } else {
                                              toast.error(
                                                "cann't delete profile"
                                              );
                                            }
                                          }}
                                        >
                                          {deleteProfileFn => {
                                            this.deleteProfileFn = deleteProfileFn;
                                            return (
                                              <EditProfilePresenter
                                                deleteConfirmModalOpen={
                                                  deleteConfirmModalOpen
                                                }
                                                logoutConfirmModalOpen={
                                                  logoutConfirmModalOpen
                                                }
                                                toggleDeleteConfirmModal={
                                                  this.toggleDeleteConfirmModal
                                                }
                                                toggleLogoutConfirmModal={
                                                  this.toggleLogoutConfirmModal
                                                }
                                                profilFormModalOpen={
                                                  profilFormModalOpen
                                                }
                                                toggleProfileFormModal={
                                                  this.toggleProfileFormModal
                                                }
                                                modalOpen={modalOpen}
                                                toggleModal={this.toggleModal}
                                                deleteProfile={
                                                  this.deleteProfile
                                                }
                                                onInputChange={
                                                  this.onInputChange
                                                }
                                                onSelectChange={
                                                  this.onSelectChange
                                                }
                                                logUserOutFn={this.logUserOutFn}
                                                back={this.back}
                                                onSubmit={this.onSubmit}
                                                // avatars
                                                deleteAvatarFn={deleteAvatarFn}
                                                markAsMainFn={markAsMainFn}
                                                avatarsData={avatarsData}
                                                avatarsLoading={avatarsLoading}
                                                imagePreviewUrl={
                                                  imagePreviewUrl
                                                }
                                                avatarPreviewModalOpen={
                                                  avatarPreviewModalOpen
                                                }
                                                avatarModalOpen={
                                                  avatarModalOpen
                                                }
                                                toggleAvatarModalOpen={
                                                  this.toggleAvatarModalOpen
                                                }
                                                togglePreviewAvatarModalOpen={
                                                  this
                                                    .togglePreviewAvatarModalOpen
                                                }
                                                onChangeImage={
                                                  this.onChangeImage
                                                }
                                                onSubmitImage={
                                                  this.onSubmitImage
                                                }
                                                removeImagePreviewUrl={
                                                  this.removeImagePreviewUrl
                                                }
                                                // settings
                                                isSelf={isSelf}
                                                isDarkMode={isDarkMode}
                                                isHideTrips={isHideTrips}
                                                isHideCoffees={isHideCoffees}
                                                isHideCities={isHideCities}
                                                isHideCountries={
                                                  isHideCountries
                                                }
                                                isHideContinents={
                                                  isHideContinents
                                                }
                                                isAutoLocationReport={
                                                  isAutoLocationReport
                                                }
                                                // new
                                                username={username}
                                                bio={bio}
                                                gender={gender}
                                                firstName={firstName}
                                                lastName={lastName}
                                                nationality={nationality}
                                                residence={residence}
                                                avatarUrl={avatarUrl}
                                                phoneNumber={phoneNumber}
                                                countryPhoneNumber={
                                                  countryPhoneNumber
                                                }
                                                countryPhoneCode={
                                                  countryPhoneCode
                                                }
                                                email={email}
                                                verifiedPhoneNumber={
                                                  verifiedPhoneNumber
                                                }
                                                verifiedEmail={verifiedEmail}
                                                confirmUsername={
                                                  confirmUsername
                                                }
                                                onSelectCountry={
                                                  this.onSelectCountry
                                                }
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
                          )}
                        </GetAvatarsQuery>
                      );
                    }}
                  </UploadAvatarMutation>
                );
              }}
            </DeleteAvatarMutation>
          );
        }}
      </MarkAsMainMutation>
    );
  }
  public onSelectCountry = (
    countryPhoneNumber: string,
    countryPhoneCode: string
  ) => {
    this.setState({
      countryPhoneNumber,
      countryPhoneCode,
      modalOpen: false
    });
  };
  public toggleModal = () => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen
    });
  };
  public removeImagePreviewUrl = () => {
    this.setState({ file: null, imagePreviewUrl: "" });
  };
  public onChangeImage = event => {
    event.preventDefault();
    const {
      target: {
        validity,
        files: [file]
      }
    } = event;
    if (!validity.valid || !file) {
      return;
    }
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  };
  public onSubmitImage = event => {
    event.preventDefault();
    const { file, imagePreviewUrl } = this.state;
    if (
      (file && file.length !== 0) ||
      (imagePreviewUrl && imagePreviewUrl.length !== 0)
    ) {
      this.uploadAvatarFn({ variables: { file } });
      this.setState({
        file: null,
        imagePreviewUrl: "",
        avatarModalOpen: false
      });
    } else {
      this.setState({ avatarModalOpen: false });
    }
  };
  public toggleAvatarModalOpen = () => {
    const { avatarModalOpen } = this.state;
    this.setState({
      avatarModalOpen: !avatarModalOpen
    });
  };
  public togglePreviewAvatarModalOpen = () => {
    const { avatarPreviewModalOpen } = this.state;
    this.setState({
      avatarPreviewModalOpen: !avatarPreviewModalOpen
    });
  };
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
      residence
    } = this.state;

    this.editProfileFn({
      variables: {
        username,
        bio,
        gender,
        firstName,
        lastName,
        nationality,
        residence
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
  };

  public updatEditProfile = (cache, { data: { editProfile } }) => {
    const { username } = this.state;
    try {
      const data = cache.readQuery({
        query: GET_USER,
        variables: { username }
      });
      if (data) {
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
  };
  public back = async event => {
    const { history } = this.props;
    const { username } = this.state;
    await event.stopPropagation();
    history.push(`/${username}`);
  };
  public updateMarkAsMain = (cache, { data: { markAsMain } }) => {
    const { username } = this.state;
    try {
      const data = cache.readQuery({
        query: GET_USER,
        variables: { username }
      });
      if (data) {
        data.userProfile.user.profile.avatarUrl = markAsMain.avatar.thumbnail;
        cache.writeQuery({
          query: GET_USER,
          variables: { username },
          data
        });
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const data = cache.readQuery({
        query: ME
      });
      if (data) {
        data.me.user.profile.avatarUrl = markAsMain.avatar.thumbnail;
        cache.writeQuery({
          query: ME,
          data
        });
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const data = cache.readQuery({
        query: GET_AVATARS,
        variables: { userName: username }
      });
      if (data) {
        data.getAvatars.avatars.find(i => i.isMain === true).isMain = false;
        data.getAvatars.avatars.find(
          i => i.uuid === markAsMain.uuid
        ).isMain = true;
        cache.writeQuery({
          query: GET_AVATARS,
          variables: { userName: username },
          data
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  public onCompletedMarkAsMain = data => {
    if (data.markAsMain.ok) {
      toast.success("Mark As Main updated");
    } else {
      toast.error("error Marking As Main");
    }
  };
  public updateDeleteAvatar = (cache, { data: { deleteAvatar } }) => {
    const { username } = this.state;
    try {
      const data = cache.readQuery({
        query: GET_AVATARS,
        variables: { userName: username }
      });
      if (data) {
        data.getAvatars.avatars = data.getAvatars.avatars.filter(
          i => i.uuid !== deleteAvatar.uuid
        );
        cache.writeQuery({
          query: GET_AVATARS,
          variables: { userName: username },
          data
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  public onCompletedDeleteAvatar = data => {
    if (data.deleteAvatar.ok) {
      toast.success("Avatar deleted");
    } else {
      toast.error("error");
    }
  };
  public updatUploadAvatar = (cache, { data: { uploadAvatar } }) => {
    const { username } = this.state;
    try {
      const data = cache.readQuery({
        query: GET_AVATARS,
        variables: { userName: username }
      });
      if (data) {
        data.getAvatars.avatars.unshift(uploadAvatar.avatar);
        cache.writeQuery({
          query: GET_AVATARS,
          variables: { userName: username },
          data
        });
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const data = cache.readQuery({
        query: GET_USER,
        variables: { username }
      });
      if (data) {
        data.userProfile.user.profile.avatarUrl = uploadAvatar.avatar.thumbnail;
        cache.writeQuery({
          query: GET_USER,
          variables: { username },
          data
        });
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const data = cache.readQuery({
        query: ME
      });
      if (data) {
        data.me.user.profile.avatarUrl = uploadAvatar.avatar.thumbnail;
        cache.writeQuery({
          query: ME,
          data
        });
      }
    } catch (e) {
      console.log(e);
    }
    this.setState({ avatarUrl: uploadAvatar.avatar.thumbnail });
  };
  public onCompletedUploadAvatar = data => {
    if (data.uploadAvatar.ok) {
      toast.success("Avatar updated");
    } else {
      toast.error("error uploading avatarUrl");
    }
  };
}

export default withRouter(EditProfileContainer);
