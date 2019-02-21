import React from "react";
import ProfilePresenter from "./ProfilePresenter";
import { Query, Mutation, MutationFn } from "react-apollo";
import { userProfile, userProfileVariables } from "src/types/api";
import { GET_USER, EDIT_PROFILE } from "./ProfileQueries";
import { withRouter, RouteComponentProps } from "react-router";
import { LOG_USER_OUT } from "src/sharedQueries.local";
import { EditProfile, EditProfileVariables } from "../../types/api";
import { toast } from "react-toastify";

class ProfileQuery extends Query<userProfile, userProfileVariables> {}
class EditProfileMutation extends Mutation<EditProfile, EditProfileVariables> {}
class LogOutMutation extends Mutation {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  modalOpen: boolean;
  editMode: boolean;
  userName: string;
  bio: string;
  gender: string;
  avatar: string;
  firstName: string;
  lastName: string;
}

class ProfileContainer extends React.Component<IProps, IState> {
  public editProfileFn: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      editMode: false,
      userName: props.username,
      bio: props.bio,
      gender: props.gender,
      avatar: props.avatar,
      firstName: props.FirstName,
      lastName: props.lastName
    };
  }
  public render() {
    const {
      match: {
        params: { username }
      }
    } = this.props;
    const {
      modalOpen,
      editMode,
      userName,
      bio,
      gender,
      avatar,
      firstName,
      lastName
    } = this.state;
    return (
      <LogOutMutation mutation={LOG_USER_OUT}>
        {logUserOutFn => (
          <ProfileQuery
            query={GET_USER}
            variables={{ username }}
            fetchPolicy="network-only"
          >
            {({ data, loading }) => (
              <EditProfileMutation
                mutation={EDIT_PROFILE}
                refetchQueries={[{ query: GET_USER }]}
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
                    <ProfilePresenter
                      modalOpen={modalOpen}
                      editMode={editMode}
                      logUserOutFn={logUserOutFn}
                      toggleModal={this.toggleModal}
                      openEditMode={this.openEditMode}
                      loading={loading}
                      data={data}
                      onInputChange={this.onInputChange}
                      onSubmit={editProfileFn}
                      onKeyUp={this.onKeyUp}
                      userName={userName}
                      bio={bio}
                      gender={gender}
                      avatar={avatar}
                      firstName={firstName}
                      lastName={lastName}
                    />
                  );
                }}
              </EditProfileMutation>
            )}
          </ProfileQuery>
        )}
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

export default withRouter(ProfileContainer);
