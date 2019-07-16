import React from "react";
import styled, { keyframes } from "../../../Styles/typed-components";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { countries } from "../../../countryData";

import Avatar from "../../../Components/Avatar";
import { BACKEND_URL } from "src/constants";
import { Link } from "react-router-dom";

const PAvatar = styled(Avatar)`
  display: flex;
  margin-left: 20px;
  align-self: center;
  margin: 20px 0px;
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
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${props => props.theme.greyColor};
  }
`;

const Select = styled.select`
  font-size: 12px;
  color: "#2c3e50";
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #2d3a41;
  border: 0;
  margin-bottom: 20px;
  width: 90%;
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

interface IProps {
  deleteConfirmModalOpen: boolean;
  logoutConfirmModalOpen: boolean;
  toggleDeleteConfirmModal: () => void;
  toggleLogoutConfirmModal: () => void;
  profilFormModalOpen: boolean;
  toggleProfileFormModal: () => void;
  deleteProfile: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDownSubmit: (event: React.KeyboardEvent<HTMLDivElement>) => void;
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
  back: (event: any) => void;
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
  onKeyDownSubmit,
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
  back
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
          <Modal>
            <ModalLink onClick={deleteProfile}>Yes</ModalLink>
            <ModalLink onClick={toggleDeleteConfirmModal}>No</ModalLink>
          </Modal>
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
            <MenuText>SETTINGS</MenuText>
          </Link>
          <MenuText onClick={toggleLogoutConfirmModal}>LOGOUT</MenuText>
          <MenuText onClick={back}>CANCEL</MenuText>
        </MenuColumn>
        <GreyLine />
        <Column>
          <Link
            to={{
              pathname: `/${username}`,
              state: { avatarModalOpen: true }
            }}
          >
            <PAvatar size="lg" url={`${BACKEND_URL}/media/${thumbnail}`} />
          </Link>
          <Input
            onChange={onInputChange}
            type={"text"}
            value={username}
            placeholder={username || "Username"}
            name={"username"}
            onKeyDown={onKeyDownSubmit}
          />
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
          <Select value={gender} name={"gender"} onChange={onSelectChange}>
            <Option value={""}>-</Option>
            <Option value={"Masculine"}>Masculine</Option>
            <Option value={"Feminine"}>Feminine</Option>
            <Option value={"Genderqueer"}>Genderqueer</Option>
          </Select>
          <Input
            onChange={onInputChange}
            type={"text"}
            value={firstName}
            placeholder={firstName || "First Name"}
            name={"firstName"}
            onKeyDown={onKeyDownSubmit}
          />
          <Input
            onChange={onInputChange}
            type={"text"}
            value={lastName}
            placeholder={lastName || "Last Name"}
            name={"lastName"}
            onKeyDown={onKeyDownSubmit}
          />
          <Input
            onChange={onInputChange}
            type={"text"}
            value={bio}
            placeholder={bio || "Bio"}
            name={"bio"}
            onKeyDown={onKeyDownSubmit}
          />
          <Input
            onChange={onInputChange}
            type={"email"}
            value={email}
            placeholder={email || "Email"}
            name={"email"}
            onKeyDown={onKeyDownSubmit}
          />
        </Column>
      </Wrapper>
    </>
  );
  return null;
};

export default EditProfilePresenter;
