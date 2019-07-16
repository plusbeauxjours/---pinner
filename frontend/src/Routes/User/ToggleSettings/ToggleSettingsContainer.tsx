import React from "react";
import ToggleSettingsPresenter from "./ToggleSettingsPresenter";
import { Mutation, MutationFn } from "react-apollo";

import { withRouter, RouteComponentProps } from "react-router";
import { TOGGLE_SETTINGS } from "./ToggleSettingsQueries";
import { GET_USER } from "../UserProfile/UserProfileQueries";
import { ToggleSettings, ToggleLikeCityVariables } from "../../../types/api";
import { LOG_USER_OUT } from "../../../sharedQueries.local";

class ToggleSettingsMutation extends Mutation<
  ToggleSettings,
  ToggleLikeCityVariables
> {}
class LogOutMutation extends Mutation {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  username: string;
  isSelf: boolean;
  isDarkMode: boolean;
  isHideTrips: boolean;
  isHideCoffees: boolean;
  isHideCities: boolean;
  isHideCountries: boolean;
  isHideContinents: boolean;
  isAutoLocationReport: boolean;
  logoutConfirmModalOpen: boolean;

  bio: string;
  gender: string;
  firstName: string;
  lastName: string;
  nationality: string;
  residence: string;
  thumbnail: string;
  email: string;
}

class ToggleSettingsContainer extends React.Component<IProps, IState> {
  public toggleSettingsFn: MutationFn;
  public logUserOutFn: MutationFn;
  constructor(props) {
    super(props);
    const { location: { state = {} } = {} } = ({} = props);

    if (props.history.action === "POP" || !props.location.state) {
      props.history.push("/");
    }

    this.state = {
      username: state.username,
      isSelf: state.isSelf,
      isDarkMode: state.isDarkMode,
      isHideTrips: state.isHideTrips,
      isHideCoffees: state.isHideCoffees,
      isHideCities: state.isHideCities,
      isHideCountries: state.isHideCountries,
      isHideContinents: state.isHideContinents,
      isAutoLocationReport: state.isAutoLocationReport,
      logoutConfirmModalOpen: false,

      bio: state.bio,
      gender: state.gender,
      firstName: state.firstName,
      lastName: state.lastName,
      nationality: state.nationality,
      residence: state.residence,
      thumbnail: state.thumbnail,
      email: state.email
    };
  }
  public render() {
    const {
      username,
      isSelf,
      isDarkMode,
      isHideTrips,
      isHideCoffees,
      isHideCities,
      isHideCountries,
      isHideContinents,
      isAutoLocationReport,
      logoutConfirmModalOpen,

      bio,
      gender,
      firstName,
      lastName,
      nationality,
      residence,
      thumbnail,
      email
    } = this.state;
    return (
      <ToggleSettingsMutation
        mutation={TOGGLE_SETTINGS}
        update={this.updateToggleSettings}
      >
        {toggleSettingsFn => {
          this.toggleSettingsFn = toggleSettingsFn;
          return (
            <LogOutMutation mutation={LOG_USER_OUT}>
              {logUserOutFn => {
                this.logUserOutFn = logUserOutFn;
                return (
                  <ToggleSettingsPresenter
                    username={username}
                    isSelf={isSelf}
                    isDarkMode={isDarkMode}
                    isHideTrips={isHideTrips}
                    isHideCoffees={isHideCoffees}
                    isHideCities={isHideCities}
                    isHideCountries={isHideCountries}
                    isHideContinents={isHideContinents}
                    isAutoLocationReport={isAutoLocationReport}
                    //
                    bio={bio}
                    gender={gender}
                    firstName={firstName}
                    lastName={lastName}
                    nationality={nationality}
                    residence={residence}
                    thumbnail={thumbnail}
                    email={email}
                    //
                    onClickToggleIcon={this.onClickToggleIcon}
                    logoutConfirmModalOpen={logoutConfirmModalOpen}
                    toggleConfirmModal={this.toggleConfirmModal}
                    logUserOutFn={logUserOutFn}
                    back={this.back}
                  />
                );
              }}
            </LogOutMutation>
          );
        }}
      </ToggleSettingsMutation>
    );
  }
  public onClickToggleIcon = (payload: string) => {
    const {
      isDarkMode,
      isHideTrips,
      isHideCoffees,
      isHideCities,
      isHideCountries,
      isHideContinents,
      isAutoLocationReport
    } = this.state;
    if (payload === "DARK_MODE") {
      this.setState({
        isDarkMode: !isDarkMode
      });
    } else if (payload === "HIDE_TRIPS") {
      this.setState({
        isHideTrips: !isHideTrips
      });
    } else if (payload === "HIDE_COFFEES") {
      this.setState({
        isHideCoffees: !isHideCoffees
      });
    } else if (payload === "HIDE_CITIES") {
      this.setState({
        isHideCities: !isHideCities
      });
    } else if (payload === "HIDE_COUNTRIES") {
      this.setState({
        isHideCountries: !isHideCountries
      });
    } else if (payload === "HIDE_CONTINENTS") {
      this.setState({
        isHideContinents: !isHideContinents
      });
    } else if (payload === "AUTO_LOCATION_REPORT") {
      this.setState({
        isAutoLocationReport: !isAutoLocationReport
      });
    }
    this.toggleSettingsFn({
      variables: { payload }
    });
  };
  public updateToggleSettings = (cache, { data: { toggleSettings } }) => {
    const { username } = this.state;
    try {
      const data = cache.readQuery({
        query: GET_USER,
        variables: { username }
      });
      if (data) {
        data.userProfile.user.profile.isDarkMode =
          toggleSettings.user.profile.isDarkMode;
        data.userProfile.user.profile.isHideTrips =
          toggleSettings.user.profile.isHideTrips;
        data.userProfile.user.profile.isHideCoffees =
          toggleSettings.user.profile.isHideCoffees;
        data.userProfile.user.profile.isHideCities =
          toggleSettings.user.profile.isHideCities;
        data.userProfile.user.profile.isHideCountries =
          toggleSettings.user.profile.isHideCountries;
        data.userProfile.user.profile.isHideContinents =
          toggleSettings.user.profile.isHideContinents;
        data.userProfile.user.profile.isAutoLocationReport =
          toggleSettings.user.profile.isAutoLocationReport;
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
  public toggleConfirmModal = () => {
    const { logoutConfirmModalOpen } = this.state;
    this.setState({
      logoutConfirmModalOpen: !logoutConfirmModalOpen
    });
  };
  public back = async event => {
    const { history } = this.props;
    const { username } = this.state;
    event.stopPropagation();
    history.push(`/${username}`);
  };
}

export default withRouter(ToggleSettingsContainer);