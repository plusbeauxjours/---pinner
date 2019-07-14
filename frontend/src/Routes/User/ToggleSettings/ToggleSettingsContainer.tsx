import React from "react";
import ToggleSettingsPresenter from "./ToggleSettingsPresenter";
import { Mutation, MutationFn } from "react-apollo";

import { withRouter, RouteComponentProps } from "react-router";
import { TOGGLE_SETTINGS } from "./ToggleSettingsQueries";
import { GET_USER } from "../UserProfile/UserProfileQueries";
import { ToggleSettings, ToggleLikeCityVariables } from "../../../types/api";

class ToggleSettingsMutation extends Mutation<
  ToggleSettings,
  ToggleLikeCityVariables
> {}

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
}

class ToggleSettingsContainer extends React.Component<IProps, IState> {
  public toggleSettingsFn: MutationFn;
  constructor(props) {
    super(props);
    const { location: { state = {} } = {} } = ({} = props);
    if (!props.location.state) {
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
      isAutoLocationReport: state.isAutoLocationReport
    };
  }
  public render() {
    const {
      isSelf,
      isDarkMode,
      isHideTrips,
      isHideCoffees,
      isHideCities,
      isHideCountries,
      isHideContinents,
      isAutoLocationReport
    } = this.state;
    return (
      <ToggleSettingsMutation
        mutation={TOGGLE_SETTINGS}
        update={this.updateToggleSettings}
      >
        {toggleSettingsFn => {
          this.toggleSettingsFn = toggleSettingsFn;
          return (
            <ToggleSettingsPresenter
              isSelf={isSelf}
              isDarkMode={isDarkMode}
              isHideTrips={isHideTrips}
              isHideCoffees={isHideCoffees}
              isHideCities={isHideCities}
              isHideCountries={isHideCountries}
              isHideContinents={isHideContinents}
              isAutoLocationReport={isAutoLocationReport}
              onClickToggleIcon={this.onClickToggleIcon}
            />
          );
        }}
      </ToggleSettingsMutation>
    );
  }
  public onClickToggleIcon = (payload: string) => {
    if (payload === "DARK_MODE") {
      this.setState({
        isDarkMode: !this.state.isDarkMode
      });
    } else if (payload === "HIDE_TRIPS") {
      this.setState({
        isHideTrips: !this.state.isHideTrips
      });
    } else if (payload === "HIDE_COFFEES") {
      this.setState({
        isHideCoffees: !this.state.isHideCoffees
      });
    } else if (payload === "HIDE_CITIES") {
      this.setState({
        isHideCities: !this.state.isHideCities
      });
    } else if (payload === "HIDE_COUNTRIES") {
      this.setState({
        isHideCountries: !this.state.isHideCountries
      });
    } else if (payload === "HIDE_CONTINENTS") {
      this.setState({
        isHideContinents: !this.state.isHideContinents
      });
    } else if (payload === "AUTO_LOCATION_REPORT") {
      this.setState({
        isAutoLocationReport: !this.state.isAutoLocationReport
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
}

export default withRouter(ToggleSettingsContainer);
