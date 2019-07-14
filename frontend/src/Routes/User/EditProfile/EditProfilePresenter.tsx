import React from "react";
import { List } from "../../../Icons";
import styled, { keyframes } from "../../../Styles/typed-components";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { countries } from "../../../countryData";

import Wrapper from "../../../Components/Wrapper";
import Avatar from "../../../Components/Avatar";
import Bold from "../../../Components/Bold";

const Header = styled.header`
  display: flex;
  flex-direction: column;
  height: 365px;
  background: ${props => props.theme.headerColor};
`;

const PAvatar = styled(Avatar)`
  display: flex;
  justify-self: center;
  align-self: center;
  margin-top: 70px;
`;

const NameContainer = styled.span`
  width: 100%;
  margin: 0px auto;
  padding: 55px 15px 0 15px;
  max-width: 935px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const SWrapper = styled(Wrapper)``;

const PHeader = styled.header`
  display: flex;
  padding: 40px 15px 40px 15px;
  @media screen and (max-width: 600px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  position: relative;
`;

const LocationAvatarContainer = styled(AvatarContainer)`
  flex-direction: column;
`;

const ListIcon = styled.span`
  display: flex;
  flex-direction: row;
  display: flex;
  cursor: pointer;
  margin-top: 7px;
  svg {
    fill: white;
    transition: fill 0.2s ease-in-out;
    &:hover {
      fill: grey;
    }
  }
`;

const Username = styled.span`
  font-size: 35px;
  font-weight: 300;
  margin-right: 10px;
`;

const Bio = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
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

const Row = styled.div`
  display: flex;
  padding: 5px;
`;

const UBold = styled(Bold)`
  display: flex;
  align-self: flex-end;
  font-weight: 100;
  font-size: 12px;
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
  animation: ${ModalAnimation} 0.1s linear;
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

interface IProps {
  modalOpen: boolean;
  confirmModalOpen: boolean;
  profilFormModalOpen: boolean;

  editMode: boolean;
  openEditMode: () => void;

  userName: string;
  bio: string;
  gender: string;
  avatar: string;
  nationality: string;
  residence: string;
  email: string;
  firstName: string;
  lastName: string;
  cityName: string;
  cityId: string;
  cityPhoto: string;
  countryName: string;

  toggleModal: () => void;
  toggleConfirmModal: () => void;

  toggleProfileFormModal: () => void;

  logUserOutFn: () => void;

  confirmDeleteProfile: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDownSubmit: (event: React.KeyboardEvent<HTMLDivElement>) => void;

  username: string;
  isSelf: boolean;
  onSelectChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const EditProfilePresenter: React.FunctionComponent<IProps> = ({
  modalOpen,
  confirmModalOpen,

  profilFormModalOpen,

  editMode,

  toggleModal,
  toggleConfirmModal,

  toggleProfileFormModal,
  openEditMode,
  logUserOutFn,
  confirmDeleteProfile,

  onInputChange,

  onKeyDownSubmit,
  userName,
  bio,
  gender,
  firstName,
  lastName,
  avatar,
  nationality,
  residence,
  email,
  username,
  isSelf,
  onSelectChange
}) => {
  return (
    <>
      {(!nationality || !residence || !gender || !email) &&
        profilFormModalOpen &&
        isSelf && (
          <ModalContainer>
            <ModalOverlay onClick={toggleProfileFormModal} />
            <Modal>
              <ModalLink>
                <Input
                  onChange={onInputChange}
                  type={"text"}
                  value={username}
                  placeholder={username}
                  name={"userName"}
                  onKeyDown={onKeyDownSubmit}
                  autoComplete={"off"}
                />
              </ModalLink>
              <ModalLink>
                <Input
                  onChange={onInputChange}
                  type={"text"}
                  value={avatar}
                  placeholder={avatar}
                  name={"avatar"}
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
              {!nationality ? (
                <ModalLink>
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
                </ModalLink>
              ) : null}
              {!residence ? (
                <ModalLink>
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
                </ModalLink>
              ) : null}
              {!gender ? (
                <ModalLink>
                  <Select
                    value={gender}
                    name={"gender"}
                    onChange={onSelectChange}
                  >
                    <Option value={""}>-</Option>
                    <Option value={"Masculine"}>Masculine</Option>
                    <Option value={"Feminine"}>Feminine</Option>
                    <Option value={"Genderqueer"}>Genderqueer</Option>
                  </Select>
                </ModalLink>
              ) : null}
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

      {modalOpen && (
        <ModalContainer>
          <ModalOverlay onClick={toggleModal} />
          <Modal>
            <ModalLink onClick={toggleConfirmModal}>Edit Avatar</ModalLink>
            <ModalLink onClick={openEditMode}>Edit Profile</ModalLink>
            <ModalLink onClick={toggleConfirmModal}>Settings</ModalLink>
            <ModalLink onClick={toggleConfirmModal}>Delete Profile</ModalLink>
            <ModalLink onClick={logUserOutFn}>Log Out</ModalLink>
            <ModalLink onClick={toggleModal}>CANCEL</ModalLink>
          </Modal>
        </ModalContainer>
      )}
      {confirmModalOpen && (
        <ModalContainer>
          <ModalOverlay onClick={toggleConfirmModal} />
          <Modal>
            <ModalLink onClick={confirmDeleteProfile}>Yes</ModalLink>
            <ModalLink onClick={toggleConfirmModal}>No</ModalLink>
          </Modal>
        </ModalContainer>
      )}

      <Header>
        <PAvatar size="lg" url={avatar} />
        <NameContainer>
          {editMode ? (
            <Input
              onChange={onInputChange}
              type={"text"}
              value={userName}
              placeholder={username}
              name={"userName"}
              onKeyDown={onKeyDownSubmit}
            />
          ) : (
            <Username>{username}</Username>
          )}
          {isSelf ? (
            <ListIcon onClick={toggleModal}>
              <List />
            </ListIcon>
          ) : null}
        </NameContainer>
      </Header>
      {/* 
        ////////////// BODY //////////////
        */}
      <SWrapper>
        <PHeader>
          <LocationAvatarContainer>
            {editMode ? (
              <>
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
              </>
            ) : (
              <p>
                {firstName} {lastName}
              </p>
            )}
            {editMode ? (
              <Input
                onChange={onInputChange}
                type={"text"}
                value={bio}
                placeholder={bio || "Bio"}
                name={"bio"}
                onKeyDown={onKeyDownSubmit}
              />
            ) : (
              <Bio>{`${bio}`}</Bio>
            )}
            {gender ? (
              <Row>
                <UBold text={String(gender)} />
                <UBold text={" gender - done"} />
              </Row>
            ) : null}
          </LocationAvatarContainer>
        </PHeader>
      </SWrapper>
    </>
  );
  return null;
};

export default EditProfilePresenter;
