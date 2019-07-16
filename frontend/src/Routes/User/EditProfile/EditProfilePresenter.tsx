import React from "react";
import styled, { keyframes } from "../../../Styles/typed-components";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { countries } from "../../../countryData";

import Avatar from "../../../Components/Avatar";
import { BACKEND_URL } from "src/constants";
import { Link } from "react-router-dom";
import Button from "src/Components/Button";

const PAvatar = styled(Avatar)`
  display: flex;
  margin-left: 20px;
  align-self: center;
`;

const ModalAnimation = keyframes`
	  from{
	    opacity:0;
	    transform:scale(1.1);
	  }
	  to{
	    opacity:1;
	    transform:none;
	  }
  `;

const ModalContainer = styled.div`
  z-index: 8;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
`;

const Modal = styled.div`
  background-color: #2d3a41;
  border-radius: 12px;
  width: 312px;
  z-index: 10;
  animation: ${ModalAnimation} 0.1s linear;
  @media screen and (max-width: 935px) {
    width: 30%;
  }
`;

const ConfirmModal = styled(Modal)`
  width: 400px;
`;

const ModalOverlay = styled.div`
  z-index: 5;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.85);
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
    border-bottom: 1px solid grey;
  }
`;

const ConfirmModalLink = styled(ModalLink)`
  cursor: none;
`;

const ModalInputContainer = styled.div`
  min-height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px 25px 0px 25px;
  display: flex;
  flex-direction: column;
  height: 120px;
`;

const Input = styled.input`
  display: flex;
  width: 250px;
  z-index: 2;
  border: 0;
  border-bottom: 1px solid ${props => props.theme.greyColor};
  color: white;
  background-color: transparent;
  font-size: 18px;
  font-weight: 100;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${props => props.theme.greyColor};
  }
`;

const Select = styled.select`
  height: 35px;
  display: flex;
  width: 250px;
  font-size: 18px;
  font-weight: 100;
  border-bottom: 1px solid ${props => props.theme.greyColor};
  color: white;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
  border: none;
`;

const Option = styled.option``;

const Wrapper = styled.div`
  display: flex;
  margin: 20px auto;
  flex-direction: row;
  width: 100%;
  max-width: 935px;
`;
const MenuColumn = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  margin-top: 10px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  width: 735px;
`;

const MenuText = styled.p`
  font-size: 18px;
  font-weight: 100px;
  margin-bottom: 15px;
  cursor: pointer;
`;

const GreyLine = styled.div`
  border-left: 1px solid grey;
  height: 80vh;
  margin: 0px 10px;
`;

const TitleText = styled.p`
  display: flex;
  align-self: center;
  font-size: 18px;
  font-weight: 100;
`;

const ExplainText = styled.p`
  font-size: 12px;
  font-weight: 100;
  margin-bottom: 15px;
  line-height: 15px;
`;

const Conatainer = styled.div`
  height: 35px;
  display: flex;
  width: 600px;
  justify-content: space-between;
  align-content: center;
  flex-wrap: nowrap;
  @media screen and (max-width: 831px) {
    min-width: 300px;
  }
`;

const AvatarConatainer = styled(Conatainer)`
  display: flex;
  width: 600px;
  height: 200px;
  justify-content: center;
  align-content: center;
  margin: 20px 0px 40px 0px;
`;

const DeleteConatainer = styled.div`
  width: 600px;
  border: 1px solid grey;
  padding: 10px 15px 4px 15px;
  margin-bottom: 15px;
`;

const DConatainer = styled(Conatainer)`
  width: 100%;
`;

const SButton = styled(Button)`
  display: flex;
  width: 120px;
`;

const DButton = styled.button`
  width: 120px;
  height: 19px;
  display: flex;
  padding: 2px;
  justify-content: center;
  align-self: center;
  border: 0;
  color: white;
  background-color: ${props => props.theme.blueColor};
  opacity: 0.8;
  font-weight: 600;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
`;

const ConfirmText = styled.p`
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 15px;
`;

const GreyText = styled(MenuText)`
  color: grey;
  &:hover {
    color: white;
  }
`;

interface IProps {
  deleteConfirmModalOpen: boolean;
  logoutConfirmModalOpen: boolean;
  toggleDeleteConfirmModal: () => void;
  toggleLogoutConfirmModal: () => void;
  profilFormModalOpen: boolean;
  toggleProfileFormModal: () => void;
  deleteProfile: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  logUserOutFn: any;

  isSelf: boolean;
  isDarkMode: boolean;
  isHideTrips: boolean;
  isHideCoffees: boolean;
  isHideCities: boolean;
  isHideCountries: boolean;
  isHideContinents: boolean;
  isAutoLocationReport: boolean;

  username: string;
  bio: string;
  gender: string;
  firstName: string;
  lastName: string;
  nationality: string;
  residence: string;
  thumbnail: string;
  email: string;
  confirmUsername: string;
  back: (event: any) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const EditProfilePresenter: React.FunctionComponent<IProps> = ({
  deleteConfirmModalOpen,
  logoutConfirmModalOpen,
  toggleDeleteConfirmModal,
  toggleLogoutConfirmModal,
  profilFormModalOpen,
  toggleProfileFormModal,
  deleteProfile,
  onInputChange,
  onSelectChange,
  logUserOutFn,

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
  thumbnail,
  email,
  confirmUsername,
  back,
  onSubmit
}) => {
  return (
    <>
      {/* {(!user.profile.nationality ||
        !user.profile.residence ||
        !user.profile.gender ||
        !user.profile.email) &&
        profilFormModalOpen &&
        user.profile.isSelf && (
          <ModalContainer>
            <ModalOverlay onClick={toggleProfileFormModal} />
            <Modal>
              <ModalLink>
                <Input
                  onChange={onInputChange}
                  type={"text"}
                  value={username}
                  placeholder={user.username}
                  name={"username"}
                  onKeyDown={onKeyDownSubmit}
                  autoComplete={"off"}
                />
              </ModalLink>
              <ModalLink>
                <Input
                  onChange={onInputChange}
                  type={"text"}
                  value={bio}
                  placeholder={"bio"}
                  name={"bio"}
                  onKeyDown={onKeyDownSubmit}
                  autoComplete={"off"}
                />
              </ModalLink>
              {!user.profile.nationality ? <ModalLink /> : null}
              {!user.profile.residence ? <ModalLink /> : null}
              {!user.profile.gender ? <ModalLink /> : null}
              {!email ? (
                <ModalLink>
                  <Input
                    onChange={onInputChange}
                    type={"text"}
                    value={email}
                    placeholder={"email"}
                    name={"email"}
                    onKeyDown={onKeyDownSubmit}
                  />
                </ModalLink>
              ) : null}
            </Modal>
          </ModalContainer>
        )}
      )} */}
      {deleteConfirmModalOpen && (
        <ModalContainer>
          <ModalOverlay onClick={toggleDeleteConfirmModal} />
          <ConfirmModal>
            <ModalInputContainer>
              <ConfirmText>Are you absolutely sure?</ConfirmText>

              <ExplainText>
                This action cannot be undone. This will permanently delete the
                plusbeauxjours account, comments, trip history, and remove all
                photos. Please type in the name of your username to confirm.
              </ExplainText>
            </ModalInputContainer>

            {username === confirmUsername ? (
              <ModalLink onClick={deleteProfile}>Yes</ModalLink>
            ) : (
              <ConfirmModalLink>
                <Input
                  onChange={onInputChange}
                  type={"text"}
                  value={confirmUsername}
                  name={"confirmUsername"}
                  autoFocus={true}
                  autoComplete={"off"}
                />
              </ConfirmModalLink>
            )}

            <ModalLink onClick={toggleDeleteConfirmModal}>No</ModalLink>
          </ConfirmModal>
        </ModalContainer>
      )}
      {logoutConfirmModalOpen && (
        <ModalContainer>
          <ModalOverlay onClick={toggleLogoutConfirmModal} />
          <Modal>
            <ModalLink onClick={logUserOutFn}>Yes</ModalLink>
            <ModalLink onClick={toggleLogoutConfirmModal}>No</ModalLink>
          </Modal>
        </ModalContainer>
      )}
      {/* 
        ////////////// BODY //////////////
        */}
      <Wrapper>
        <MenuColumn>
          <Link
            to={{
              pathname: `/account/edit`,
              state: {
                username,
                isSelf,
                isDarkMode,
                isHideTrips,
                isHideCoffees,
                isHideCities,
                isHideCountries,
                isHideContinents,
                isAutoLocationReport,
                bio,
                gender,
                firstName,
                lastName,
                nationality,
                residence,
                thumbnail,
                email
              }
            }}
          >
            <MenuText>EDIT PROFILE</MenuText>
          </Link>
          <Link
            to={{
              pathname: `/account/settings`,
              state: {
                username,
                isSelf,
                isDarkMode,
                isHideTrips,
                isHideCoffees,
                isHideCities,
                isHideCountries,
                isHideContinents,
                isAutoLocationReport,
                bio,
                gender,
                firstName,
                lastName,
                nationality,
                residence,
                thumbnail,
                email
              }
            }}
          >
            <GreyText>SETTINGS</GreyText>
          </Link>
          <GreyText onClick={toggleLogoutConfirmModal}>LOGOUT</GreyText>
          <GreyText onClick={back}>CANCEL</GreyText>
        </MenuColumn>
        <GreyLine />
        <Column>
          <AvatarConatainer>
            <Link
              to={{
                pathname: `/${username}`,
                state: { avatarModalOpen: true }
              }}
            >
              <PAvatar size="lg" url={`${BACKEND_URL}/media/${thumbnail}`} />
            </Link>
          </AvatarConatainer>
          <Conatainer>
            <TitleText>USERNAME</TitleText>
            <Input
              onChange={onInputChange}
              type={"text"}
              value={username}
              placeholder={username || "Username"}
              name={"username"}
              autoComplete={"off"}
            />
          </Conatainer>
          <ExplainText>nani</ExplainText>
          <Conatainer>
            <TitleText>NATIONALITY</TitleText>
            <Select
              value={nationality}
              name={"nationality"}
              onChange={onSelectChange}
            >
              {countries.map((country, index) => (
                <Option key={index} value={country.code}>
                  {country.emoji} {country.name}
                </Option>
              ))}
            </Select>
          </Conatainer>
          <ExplainText>nani</ExplainText>
          <Conatainer>
            <TitleText>RESIDENCE</TitleText>
            <Select
              value={residence}
              name={"residence"}
              onChange={onSelectChange}
            >
              {countries.map((country, index) => (
                <Option key={index} value={country.code}>
                  {country.emoji} {country.name}
                </Option>
              ))}
            </Select>
          </Conatainer>
          <ExplainText>nani</ExplainText>
          <Conatainer>
            <TitleText>GENDER</TitleText>
            <Select value={gender} name={"gender"} onChange={onSelectChange}>
              <Option value={""}>-</Option>
              <Option value={"Masculine"}>Masculine</Option>
              <Option value={"Feminine"}>Feminine</Option>
              <Option value={"Other"}>Other</Option>
            </Select>
          </Conatainer>
          <ExplainText>nani</ExplainText>
          <Conatainer>
            <TitleText>FIRST NAME</TitleText>
            <Input
              onChange={onInputChange}
              type={"text"}
              value={firstName}
              placeholder={firstName || "First Name"}
              name={"firstName"}
              autoComplete={"off"}
            />
          </Conatainer>
          <ExplainText>nani</ExplainText>
          <Conatainer>
            <TitleText>LAST NAME</TitleText>
            <Input
              onChange={onInputChange}
              type={"text"}
              value={lastName}
              placeholder={lastName || "Last Name"}
              name={"lastName"}
              autoComplete={"off"}
            />
          </Conatainer>
          <ExplainText>nani</ExplainText>
          <Conatainer>
            <TitleText>BIO</TitleText>
            <Input
              onChange={onInputChange}
              type={"text"}
              value={bio}
              placeholder={bio || "Bio"}
              name={"bio"}
              autoComplete={"off"}
            />
          </Conatainer>
          <ExplainText>nani</ExplainText>
          <Conatainer>
            <TitleText>EMAIL</TitleText>
            <Input
              onChange={onInputChange}
              type={"email"}
              value={email}
              placeholder={email || "Email"}
              name={"email"}
              autoComplete={"off"}
            />
          </Conatainer>
          <ExplainText>nani</ExplainText>
          <DeleteConatainer>
            <DConatainer>
              <TitleText>DELETE PROFILE</TitleText>
              <DButton onClick={toggleDeleteConfirmModal}>
                DELETE PROFILE
              </DButton>
            </DConatainer>
            <ExplainText>
              Once you delete a repository, there is no going back. Please be
              certain.
            </ExplainText>
          </DeleteConatainer>
          <SButton text={"SUBMIT"} onClick={onSubmit} />
        </Column>
      </Wrapper>
    </>
  );
  return null;
};

export default EditProfilePresenter;
