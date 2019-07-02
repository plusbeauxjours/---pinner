import React from "react";
import styled from "src/Styles/typed-components";
// import Loader from "./Loader";
import { EditProfile, EditProfileVariables } from "../types/api";
import { Mutation, MutationFn } from "react-apollo";
import { withRouter, RouteComponentProps } from "react-router";
import { GET_USER } from "../Routes/User/UserProfile/UserProfileQueries";
import { toast } from "react-toastify";
import { EDIT_PROFILE } from "../Routes/User/EditProfile/EditProfileQueries";

class EditProfileMutation extends Mutation<EditProfile, EditProfileVariables> {}

const Input = styled.input`
  z-index: 10;
  border: 0;
  border-bottom: 1px solid ${props => props.theme.greyColor};
  padding: 5px;
  color: white;
  background-color: transparent;
  font-size: 12px;
  font-weight: 100;
  transition: border-bottom 0.1s linear;
  &:-webkit-autofill {
    box-shadow: 0 0 0px 1000px white inset !important;
  }
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${props => props.theme.greyColor};
  }
`;

const ModalLink = styled.div`
  text-align: center;
  min-height: 50px;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  :not(:last-child) {
    border-bottom: 1px solid #efefef;
  }
`;

interface IProps extends RouteComponentProps<any> {
  username: string;
  nationality: string;
  gender: string;
  email: string;
}

interface IState {
  username: string;
  nationality: string;
  gender: string;
  email: string;
}

class ProfileForm extends React.Component<IProps, IState> {
  public editProfileFn: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      nationality: props.nationality,
      gender: props.gender,
      email: props.email
    };
  }
  public render() {
    const { username, nationality, gender, email } = this.state;
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
            <>
              {username && (
                <ModalLink>
                  <Input
                    onChange={this.onInputChange}
                    type={"text"}
                    value={username}
                    placeholder={username}
                    name={"username"}
                    onKeyDown={this.onKeyDown}
                  />
                </ModalLink>
              )}
              {!nationality ? (
                <ModalLink>
                  <Input
                    onChange={this.onInputChange}
                    type={"text"}
                    value={nationality}
                    placeholder={nationality || "nationality"}
                    name={"nationality"}
                    onKeyDown={this.onKeyDown}
                  />
                </ModalLink>
              ) : null}
              {!gender ? (
                <ModalLink>
                  <Input
                    onChange={this.onInputChange}
                    type={"text"}
                    value={gender}
                    placeholder={gender || "gender"}
                    name={"gender"}
                    onKeyDown={this.onKeyDown}
                  />
                </ModalLink>
              ) : null}
              {!email ? (
                <ModalLink>
                  <Input
                    onChange={this.onInputChange}
                    type={"text"}
                    value={email}
                    placeholder={email || "email"}
                    name={"email"}
                    onKeyDown={this.onKeyDown}
                  />
                </ModalLink>
              ) : null}
            </>
          );
        }}
      </EditProfileMutation>
    );
  }
  public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
    console.log(this.state);
  };
  public onKeyDown = event => {
    const { username, nationality, gender, email } = this.state;
    const { keyCode } = event;
    if (keyCode === 13) {
      this.editProfileFn({
        variables: {
          userName: username,
          nationality,
          gender,
          email
        }
      });
    } else {
      return null;
    }
  };
  public updatEditProfile = (cache, { data: { editProfile } }) => {
    const {
      match: {
        params: { username }
      }
    } = this.props;
    console.log(username);
    try {
      const data = cache.readQuery({
        query: GET_USER,
        variables: { username }
      });
      console.log(data);
      if (data) {
        data.user = editProfile.user;
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

export default withRouter(ProfileForm);
