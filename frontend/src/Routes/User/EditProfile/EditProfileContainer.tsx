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
  MarkAsMainVariables,
  CompleteEditPhoneVerification,
  CompleteEditPhoneVerificationVariables,
  StartEditPhoneVerification,
  StartEditPhoneVerificationVariables
} from "src/types/api";
import {
  EDIT_PROFILE,
  DELETE_PROFILE,
  COMPLETE_EDIT_PHONE_VERIFICATION
} from "./EditProfileQueries";
import { countries } from "../../../countryData";

import { withRouter, RouteComponentProps } from "react-router";
import { LOG_USER_OUT } from "src/sharedQueries.local";
import { toast } from "react-toastify";
import { ME } from "../../../sharedQueries";
import { LOG_USER_IN } from "../../../sharedQueries.local";
import { START_EDIT_PHONE_VERIFICATION } from "./EditProfileQueries";
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
class StartEditPhoneVerificationMutation extends Mutation<
  StartEditPhoneVerification,
  StartEditPhoneVerificationVariables
> {}
class CompleteEditPhoneVerificationMutation extends Mutation<
  CompleteEditPhoneVerification,
  CompleteEditPhoneVerificationVariables
> {}
class LogUserInMutation extends Mutation {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  deleteConfirmModalOpen: boolean;
  logoutConfirmModalOpen: boolean;
  profilFormModalOpen: boolean;
  countryModalOpen: boolean;
  editPhoneNumberModalOpen: boolean;
  editEmailAddressModalOpen: boolean;
  verifyPhoneNumberModalOpen: boolean;
  isPhoneSubmitted: boolean;
  isProfileSubmitted: boolean;

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
  nationalityCode: string;
  residenceCode: string;
  avatarUrl: string;
  phoneNumber: string;
  countryPhoneNumber: string;
  countryPhoneCode: string;
  emailAddress: string;
  isVerifiedPhoneNumber: boolean;
  isVerifiedEmailAddress: boolean;
  confirmUsername: string;

  newUsername: string;
  newPhoneNumber: string;
  newCountryPhoneCode: string;
  newCountryPhoneNumber: string;
  newEmailAddress: string;

  verificationKey: string;
}

class EditProfileContainer extends React.Component<IProps, IState> {
  public logUserOutFn: MutationFn;
  public editProfileFn: MutationFn;
  public deleteProfileFn: MutationFn;

  public uploadAvatarFn: MutationFn;
  public deleteAvatarFn: MutationFn;
  public markAsMainFn: MutationFn;

  public phoneVerificationFn: MutationFn;
  public completeEditPhoneVerificationFn: MutationFn;
  public logUserInFn: MutationFn;
  constructor(props) {
    super(props);
    const { location: { state = {} } = {} } = ({} = props);
    if (props.history.action === "POP" || !props.location.state) {
      props.history.push(`/${state.username}`);
    }
    this.state = {
      deleteConfirmModalOpen: false,
      logoutConfirmModalOpen: false,
      profilFormModalOpen: true,
      countryModalOpen: false,
      editPhoneNumberModalOpen: false,
      editEmailAddressModalOpen: false,
      verifyPhoneNumberModalOpen: false,
      isPhoneSubmitted: false,
      isProfileSubmitted: false,

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
      nationalityCode:
        (state.nationalityCode && state.nationalityCode) ||
        (state.nationality && state.nationality.countryCode) ||
        localStorage.getItem("countryCode"),
      residenceCode:
        (state.residenceCode && state.residenceCode) ||
        (state.residence && state.residence.countryCode) ||
        localStorage.getItem("countryCode"),
      avatarUrl: state.avatarUrl,
      phoneNumber: state.phoneNumber || "",
      countryPhoneNumber: state.countryPhoneNumber || "",
      countryPhoneCode: state.countryPhoneCode || "",
      emailAddress: state.emailAddress || "",
      isVerifiedPhoneNumber: state.isVerifiedPhoneNumber,
      isVerifiedEmailAddress: state.isVerifiedEmailAddress,
      confirmUsername: props.confirmUsername || "",
      newUsername: state.username || "",
      newPhoneNumber: props.newPhoneNumber || "",
      newCountryPhoneCode:
        props.newCountryPhoneCode || localStorage.getItem("countryCode"),
      newCountryPhoneNumber: countries.find(
        i => i.code === localStorage.getItem("countryCode")
      ).phone,
      newEmailAddress: props.newEmailAddress || "",
      verificationKey: ""
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match.params !== newProps.match.params) {
      this.setState({
        imagePreviewUrl: "",
        file: ""
      });
    }
  }
  public render() {
    const { history } = this.props;
    const {
      deleteConfirmModalOpen,
      logoutConfirmModalOpen,
      profilFormModalOpen,
      countryModalOpen,
      editPhoneNumberModalOpen,
      editEmailAddressModalOpen,
      verifyPhoneNumberModalOpen,

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
      nationalityCode,
      residenceCode,
      avatarUrl,
      phoneNumber,
      countryPhoneNumber,
      countryPhoneCode,
      emailAddress,
      isVerifiedPhoneNumber,
      isVerifiedEmailAddress,
      confirmUsername,
      newUsername,
      newPhoneNumber,
      newCountryPhoneCode,
      newCountryPhoneNumber,
      newEmailAddress,
      verificationKey
    } = this.state;
    return (
      <LogUserInMutation mutation={LOG_USER_IN}>
        {logUserInFn => {
          this.logUserInFn = logUserInFn;
          return (
            <CompleteEditPhoneVerificationMutation
              mutation={COMPLETE_EDIT_PHONE_VERIFICATION}
              variables={{
                key: verificationKey,
                countryPhoneNumber: newCountryPhoneNumber,
                countryPhoneCode: newCountryPhoneCode,
                phoneNumber: newPhoneNumber.startsWith("0")
                  ? newPhoneNumber.substring(1)
                  : newPhoneNumber
              }}
              update={this.updateEditPhoneVerification}
              onCompleted={this.onCompletedCompleteEditPhoneVerification}
            >
              {completeEditPhoneVerificationFn => {
                this.completeEditPhoneVerificationFn = completeEditPhoneVerificationFn;
                return (
                  <StartEditPhoneVerificationMutation
                    mutation={START_EDIT_PHONE_VERIFICATION}
                    variables={{
                      countryPhoneNumber: newCountryPhoneNumber,
                      phoneNumber: newPhoneNumber.startsWith("0")
                        ? newPhoneNumber.substring(1)
                        : newPhoneNumber
                    }}
                    onCompleted={this.onCompletedStartEditPhoneVerification}
                  >
                    {(phoneVerificationFn, { loading: phoneLoading }) => {
                      this.phoneVerificationFn = phoneVerificationFn;
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
                                      {(
                                        uploadAvatarFn,
                                        { loading: uploadAvatarLoading }
                                      ) => {
                                        this.uploadAvatarFn = uploadAvatarFn;
                                        return (
                                          <GetAvatarsQuery
                                            query={GET_AVATARS}
                                            variables={{ userName: username }}
                                          >
                                            {({
                                              data: avatarsData,
                                              loading: avatarsLoading
                                            }) => (
                                              <LogOutMutation
                                                mutation={LOG_USER_OUT}
                                              >
                                                {logUserOutFn => {
                                                  this.logUserOutFn = logUserOutFn;
                                                  return (
                                                    <EditProfileMutation
                                                      mutation={EDIT_PROFILE}
                                                      update={
                                                        this.updateEditProfile
                                                      }
                                                      onCompleted={
                                                        this
                                                          .onCompletedEditProfile
                                                      }
                                                    >
                                                      {editProfileFn => {
                                                        this.editProfileFn = editProfileFn;
                                                        return (
                                                          <DeleteProfileMutation
                                                            mutation={
                                                              DELETE_PROFILE
                                                            }
                                                            onCompleted={deleteResult => {
                                                              const {
                                                                deleteProfile
                                                              } = deleteResult;
                                                              if (
                                                                deleteProfile.ok
                                                              ) {
                                                                toast.success(
                                                                  "profile deleted!"
                                                                );
                                                                setTimeout(
                                                                  () => {
                                                                    history.push(
                                                                      "/match"
                                                                    );
                                                                  },
                                                                  2000
                                                                );
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
                                                                  phoneLoading={
                                                                    phoneLoading
                                                                  }
                                                                  uploadAvatarLoading={
                                                                    uploadAvatarLoading
                                                                  }
                                                                  deleteConfirmModalOpen={
                                                                    deleteConfirmModalOpen
                                                                  }
                                                                  logoutConfirmModalOpen={
                                                                    logoutConfirmModalOpen
                                                                  }
                                                                  toggleDeleteConfirmModal={
                                                                    this
                                                                      .toggleDeleteConfirmModal
                                                                  }
                                                                  toggleLogoutConfirmModal={
                                                                    this
                                                                      .toggleLogoutConfirmModal
                                                                  }
                                                                  profilFormModalOpen={
                                                                    profilFormModalOpen
                                                                  }
                                                                  editPhoneNumberModalOpen={
                                                                    editPhoneNumberModalOpen
                                                                  }
                                                                  editEmailAddressModalOpen={
                                                                    editEmailAddressModalOpen
                                                                  }
                                                                  verifyPhoneNumberModalOpen={
                                                                    verifyPhoneNumberModalOpen
                                                                  }
                                                                  toggleProfileFormModal={
                                                                    this
                                                                      .toggleProfileFormModal
                                                                  }
                                                                  countryModalOpen={
                                                                    countryModalOpen
                                                                  }
                                                                  toggleCountryModal={
                                                                    this
                                                                      .toggleCountryModal
                                                                  }
                                                                  deleteProfile={
                                                                    this
                                                                      .deleteProfile
                                                                  }
                                                                  onInputChange={
                                                                    this
                                                                      .onInputChange
                                                                  }
                                                                  onInputUsernameChange={
                                                                    this
                                                                      .onInputUsernameChange
                                                                  }
                                                                  onSelectChange={
                                                                    this
                                                                      .onSelectChange
                                                                  }
                                                                  logUserOutFn={
                                                                    this
                                                                      .logUserOutFn
                                                                  }
                                                                  back={
                                                                    this.back
                                                                  }
                                                                  onSubmit={
                                                                    this
                                                                      .onSubmit
                                                                  }
                                                                  // avatars
                                                                  deleteAvatarFn={
                                                                    deleteAvatarFn
                                                                  }
                                                                  markAsMainFn={
                                                                    markAsMainFn
                                                                  }
                                                                  avatarsData={
                                                                    avatarsData
                                                                  }
                                                                  avatarsLoading={
                                                                    avatarsLoading
                                                                  }
                                                                  imagePreviewUrl={
                                                                    imagePreviewUrl
                                                                  }
                                                                  avatarPreviewModalOpen={
                                                                    avatarPreviewModalOpen
                                                                  }
                                                                  avatarModalOpen={
                                                                    avatarModalOpen
                                                                  }
                                                                  toggleAvatarModal={
                                                                    this
                                                                      .toggleAvatarModal
                                                                  }
                                                                  togglePreviewAvatarModal={
                                                                    this
                                                                      .togglePreviewAvatarModal
                                                                  }
                                                                  onChangeImage={
                                                                    this
                                                                      .onChangeImage
                                                                  }
                                                                  onSubmitImage={
                                                                    this
                                                                      .onSubmitImage
                                                                  }
                                                                  removeImagePreviewUrl={
                                                                    this
                                                                      .removeImagePreviewUrl
                                                                  }
                                                                  // settings
                                                                  isSelf={
                                                                    isSelf
                                                                  }
                                                                  isDarkMode={
                                                                    isDarkMode
                                                                  }
                                                                  isHideTrips={
                                                                    isHideTrips
                                                                  }
                                                                  isHideCoffees={
                                                                    isHideCoffees
                                                                  }
                                                                  isHideCities={
                                                                    isHideCities
                                                                  }
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
                                                                  username={
                                                                    username
                                                                  }
                                                                  bio={bio}
                                                                  gender={
                                                                    gender
                                                                  }
                                                                  firstName={
                                                                    firstName
                                                                  }
                                                                  lastName={
                                                                    lastName
                                                                  }
                                                                  nationalityCode={
                                                                    nationalityCode
                                                                  }
                                                                  residenceCode={
                                                                    residenceCode
                                                                  }
                                                                  avatarUrl={
                                                                    avatarUrl
                                                                  }
                                                                  phoneNumber={
                                                                    phoneNumber
                                                                  }
                                                                  countryPhoneNumber={
                                                                    countryPhoneNumber
                                                                  }
                                                                  countryPhoneCode={
                                                                    countryPhoneCode
                                                                  }
                                                                  emailAddress={
                                                                    emailAddress
                                                                  }
                                                                  isVerifiedPhoneNumber={
                                                                    isVerifiedPhoneNumber
                                                                  }
                                                                  isVerifiedEmailAddress={
                                                                    isVerifiedEmailAddress
                                                                  }
                                                                  confirmUsername={
                                                                    confirmUsername
                                                                  }
                                                                  onSelectCountry={
                                                                    this
                                                                      .onSelectCountry
                                                                  }
                                                                  newUsername={
                                                                    newUsername
                                                                  }
                                                                  newPhoneNumber={
                                                                    newPhoneNumber
                                                                  }
                                                                  newCountryPhoneCode={
                                                                    newCountryPhoneCode
                                                                  }
                                                                  newCountryPhoneNumber={
                                                                    newCountryPhoneNumber
                                                                  }
                                                                  newEmailAddress={
                                                                    newEmailAddress
                                                                  }
                                                                  toggleEditPhoneNumberModal={
                                                                    this
                                                                      .toggleEditPhoneNumberModal
                                                                  }
                                                                  toggleEditEmailAddressModal={
                                                                    this
                                                                      .toggleEditEmailAddressModal
                                                                  }
                                                                  toggleVerifyPhoneNumberModal={
                                                                    this
                                                                      .toggleVerifyPhoneNumberModal
                                                                  }
                                                                  onSubmitPhoneNumber={
                                                                    this
                                                                      .onSubmitPhoneNumber
                                                                  }
                                                                  verificationKey={
                                                                    verificationKey
                                                                  }
                                                                  onChangeVerifyPhone={
                                                                    this
                                                                      .onChangeVerifyPhone
                                                                  }
                                                                  onSubmitVerifyPhone={
                                                                    this
                                                                      .onSubmitVerifyPhone
                                                                  }
                                                                  closeVerifyPhoneNumberModal={
                                                                    this
                                                                      .closeVerifyPhoneNumberModal
                                                                  }
                                                                  markAsMain={
                                                                    this
                                                                      .markAsMain
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
                    }}
                  </StartEditPhoneVerificationMutation>
                );
              }}
            </CompleteEditPhoneVerificationMutation>
          );
        }}
      </LogUserInMutation>
    );
  }
  public markAsMain = (uuid, avatarUrl) => {
    this.markAsMainFn({ variables: { uuid } });
    this.setState({ avatarUrl });
  };
  public onCompletedEditProfile = data => {
    const { editProfile } = data;
    if (editProfile) {
      this.logUserInFn({
        variables: {
          token: editProfile.token
        }
      });
    } else {
      toast.error("Could not log you in 😔");
    }
    if (editProfile.ok) {
      toast.success("Profile updated!");
    } else {
      toast.error("Profile Could not Updated!");
    }
    const { newUsername } = this.state;
    this.setState({ username: newUsername, isProfileSubmitted: false });
  };
  public onCompletedCompleteEditPhoneVerification = data => {
    const { completeEditPhoneVerification } = data;
    const {
      newPhoneNumber,
      newCountryPhoneCode,
      newCountryPhoneNumber
    } = this.state;
    if (completeEditPhoneVerification.ok) {
      toast.success("Your phone number is verified");
      this.setState({
        verifyPhoneNumberModalOpen: false,
        editPhoneNumberModalOpen: false,
        phoneNumber: newPhoneNumber.startsWith("0")
          ? newPhoneNumber.substring(1)
          : newPhoneNumber,
        countryPhoneNumber: newCountryPhoneNumber,
        countryPhoneCode: newCountryPhoneCode,
        isPhoneSubmitted: false,
        isVerifiedPhoneNumber: true,
        verificationKey: "",
        newPhoneNumber: "",
        newCountryPhoneCode: localStorage.getItem("countryCode"),
        newCountryPhoneNumber: countries.find(
          i => i.code === localStorage.getItem("countryCode")
        ).phone
      });
    } else {
      toast.error("Could not be Verified your phone number");
    }
  };
  public onCompletedStartEditPhoneVerification = data => {
    const { startEditPhoneVerification } = data;
    this.setState({ isPhoneSubmitted: false });
    if (startEditPhoneVerification.ok) {
      this.setState({
        verifyPhoneNumberModalOpen: true
      });
      toast.success("SMS Sent! Redirectiong you...");
    } else {
      toast.error("Could not send you a Key");
    }
  };
  public closeVerifyPhoneNumberModal = () => {
    this.setState({
      isPhoneSubmitted: false,
      verifyPhoneNumberModalOpen: false
    });
  };
  public updateEditPhoneVerification = (
    cache,
    { data: { completeEditPhoneVerification } }
  ) => {
    const { username } = this.state;
    try {
      const data = cache.readQuery({
        query: GET_USER,
        variables: { username }
      });
      console.log(completeEditPhoneVerification);
      console.log(data.userProfile.user.profile);
      if (data) {
        data.userProfile.user.profile.phoneNumber =
          completeEditPhoneVerification.phoneNumber;
        data.userProfile.user.profile.countryPhoneNumber =
          completeEditPhoneVerification.countryPhoneNumber;
        data.userProfile.user.profile.countryPhoneCode =
          completeEditPhoneVerification.countryPhoneCode;
        data.userProfile.user.profile.isVerifiedPhoneNumber = 
          completeEditPhoneVerification.isVerifiedPhoneNumber;
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

  public onChangeVerifyPhone = value => {
    console.log(value);
    this.setState({
      verificationKey: value
    } as any);
  };
  public toggleVerifyPhoneNumberModal = () => {
    const { verifyPhoneNumberModalOpen } = this.state;
    this.setState({ verifyPhoneNumberModalOpen: !verifyPhoneNumberModalOpen });
  };
  public toggleEditPhoneNumberModal = () => {
    const { editPhoneNumberModalOpen } = this.state;
    this.setState({
      editPhoneNumberModalOpen: !editPhoneNumberModalOpen,
      isPhoneSubmitted: false
    });
  };
  public toggleEditEmailAddressModal = () => {
    const { editEmailAddressModalOpen } = this.state;
    this.setState({ editEmailAddressModalOpen: !editEmailAddressModalOpen });
  };
  public onSelectCountry = (
    newCountryPhoneNumber: string,
    newCountryPhoneCode: string
  ) => {
    this.setState({
      newCountryPhoneNumber,
      newCountryPhoneCode,
      countryModalOpen: false
    });
  };
  public toggleCountryModal = () => {
    const { countryModalOpen } = this.state;
    this.setState({
      countryModalOpen: !countryModalOpen
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
  public toggleAvatarModal = () => {
    const { avatarModalOpen } = this.state;
    this.setState({
      avatarModalOpen: !avatarModalOpen
    });
  };
  public togglePreviewAvatarModal = () => {
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
      newUsername,
      bio,
      gender,
      firstName,
      lastName,
      nationalityCode,
      residenceCode
    } = this.state;
    const { isProfileSubmitted } = this.state;
    if (!isProfileSubmitted) {
      if (!newUsername || newUsername === "") {
        toast.error("Please write a username");
      } else {
        this.editProfileFn({
          variables: {
            username: newUsername,
            bio,
            gender,
            firstName,
            lastName,
            nationalityCode,
            residenceCode
          }
        });
      }
      this.setState({ isProfileSubmitted: true });
    }
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
  public onInputUsernameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { name, value }
    } = event;
    const replaceChar = /[~!@\#$%^&*\()\-=+_'\;<>0-9\/.\`:\"\\,\[\]?|{}]/gi;
    this.setState({
      [name]: value
        .replace(/^\s\s*/, "")
        .replace(/\s\s*$/, "")
        .replace(replaceChar, "")
        .replace(/[^a-z|^A-Z|^0-9]/, "")
    } as any);
  };

  public updateEditProfile = (cache, { data: { editProfile } }) => {
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
    try {
      const data = cache.readQuery({
        query: ME
      });
      if (data) {
        data.me.user.username = editProfile.user.username;
        cache.writeQuery({
          query: ME,
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
  public onSubmitVerifyPhone: React.FormEventHandler<
    HTMLFormElement
  > = event => {
    event.preventDefault();
    this.completeEditPhoneVerificationFn();
  };

  public onSubmitPhoneNumber: React.FormEventHandler<
    HTMLFormElement
  > = event => {
    event.preventDefault();
    const {
      newCountryPhoneNumber,
      newPhoneNumber,
      isPhoneSubmitted
    } = this.state;
    if (newPhoneNumber) {
      const phone = `${newCountryPhoneNumber}${
        newPhoneNumber.startsWith("0")
          ? newPhoneNumber.substring(1)
          : newPhoneNumber
      }`;
      const isValid = /(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})/.test(
        phone
      );
      console.log(phone);
      if (isValid) {
        if (!isPhoneSubmitted) {
          this.phoneVerificationFn();
          this.setState({
            isPhoneSubmitted: true
          });
        }
      } else {
        toast.error("Please write a valid phone number");
      }
    } else {
      toast.error("Please write a phone number");
    }
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
        data.getAvatars.avatars.find(
          i => i.uuid === markAsMain.preAvatarUUID
        ).isMain = false;
        data.getAvatars.avatars.find(
          i => i.uuid === markAsMain.newAvatarUUID
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
