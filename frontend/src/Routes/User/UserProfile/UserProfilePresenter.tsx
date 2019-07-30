import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { List, Delete, RedDot, WhiteDot } from "../../../Icons";
import styled, { keyframes } from "../../../Styles/typed-components";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import { Upload } from "../../../Icons";

import Wrapper from "../../../Components/Wrapper";
import Loader from "../../../Components/Loader";
import Avatar from "../../../Components/Avatar";
import Bold from "../../../Components/Bold";
import AvatarGrid from "../../../Components/AvatarGrid";
import Weather from "../../../Components/Weather";
import { GOOGLE_PLACE_KEY } from "src/keys";
import useGoogleAutocomplete from "../../../autocompleteHelpers";
import { BACKEND_URL } from "src/constants";
import { MutationFn } from "react-apollo";
import Thin from "src/Components/Thin";

const Header = styled.header`
  display: flex;
  flex-direction: column;
  height: 365px;
  background: ${props => props.theme.headerColor};
`;

const TripSearchHeader = styled.header`
  display: flex;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
`;

const PAvatar = styled(Avatar)`
  display: flex;
  justify-self: center;
  align-self: center;
  margin-top: 70px;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
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

const AvatarContainer = styled.div``;

const LocationAvatarContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
`;

const ListIcon = styled.span`
  display: flex;
  flex-direction: row;
  display: flex;
  cursor: pointer;
  margin-top: 7px;
  svg {
    fill: ${props => props.theme.iconColor};
    transition: fill 0.2s ease-in-out;
       &:hover {
      fill: ${props => props.theme.hoverColor}
    }
  }
`;

const CAvatar = styled(Avatar)`
  border-radius: 3px;
  height: 200px;
  width: 200px;
  margin-right: 20px;
  @media screen and (max-width: 600px) {
    margin-right: 0px;
    height: 300px;
    width: 300px;
  }
`;

const SText = styled(Bold)`
  font-size: 18px;
  font-weight: 100;
`;

const TripContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 600px) {
    min-width: 300px;
  }
`;

const UserNameRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Username = styled.span`
  font-size: 35px;
  font-weight: 300;
  margin-right: 10px;
`;

const TripOverlay = styled.div`
  z-index: 1;
  opacity: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    fill: ${props => props.theme.iconColor};
    transition: fill 0.3s ease-in-out;
    &:hover {
      fill: red;
    }
  }
  transition: opacity 0.3s ease-in-out;
`;

const TripRow = styled.div<ITheme>`
  display: grid;
  flex-direction: row;
  height: 50px;
  width: 100%;
  grid-template-columns: 6fr 1fr 1fr 1fr 0.1fr;
  padding: 0 5px 0 5px;
  grid-gap: 15px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${props => props.theme.hoverColor};
  }
  &:hover {
    ${TripOverlay} {
      opacity: 1;
    }
  }
  &:not(:last-child) {
    border-bottom:  1px solid ${props => props.theme.borderColor};
  }
`;

const HeaderColumn = styled.div`
  margin-left: 15px;
`;

const HeaderText = styled(Bold)`
  display: flex;
`;

const Location = styled.span`
  display: flex;
  margin-top: 5px;
  display: block;
  font-size: 12px;
  font-weight: 200;
`;

const THeader = styled.header`
  display: flex;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  @media screen and (max-width: 935px) {
    margin-left: 10px;
  }
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-items: center;
  margin: 0 70px 0 70px;
  cursor: pointer;
  svg {
    fill: ${props => props.theme.iconColor};
    transition: fill 0.2s ease-in-out;
       &:hover {
      fill: ${props => props.theme.hoverColor}
    }
  }
`;

const TripIcon = styled(Icon)`
  align-self: center;
  justify-self: center;
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
  width: 200px;
  justify-content: flex-end;
  padding: 5px;
  @media screen and (max-width: 600px) {
    width: 300px;
  }
`;

const UBold = styled(Bold)`
  display: flex;
  align-self: flex-end;
  font-weight: 100;
  font-size: 12px;
`;

const GreyUBold = styled(UBold)`
  color: grey;
`;

const SAvatar = styled(Avatar)`
  border-radius: 3px;
  height: 45px;
  width: 45px;
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

const AvatarModalContainer = styled(ModalContainer)`
  z-index: 10;
`;

const TripModal = styled.div`
  z-index: 10;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  animation: ${ModalAnimation} 0.1s linear;
`;

const DateRangePickerContainer = styled.div`
  display: flex;
  align-self: center;
  z-index: 10;
`;

const TripModalContainer = styled.div`
  z-index: 1;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
`;

const Modal = styled.div`
  background-color: ${props => props.theme.modalBgColor};
  border: 1px solid ${props => props.theme.borderColor};
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
  background-color: ${props => props.theme.modalOverlayColor};
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
    border-bottom:  1px solid ${props => props.theme.borderColor};
  }
`;

const ModalLinkContainer = styled(Link)`
  text-align: center;
  min-height: 50px;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  :not(:last-child) {
    border-bottom:  1px solid ${props => props.theme.borderColor};
  }
`;

const TripInputContainer = styled.div`
  z-index: 10;
  top: 30%;
  width: 400px;
  border: 0;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-self: center;
`;

const SearchCitiesInput = styled.input`
  z-index: 10;
  border: 0;
  border-bottom: 1px solid ${props => props.theme.greyColor};
  padding: 5px;
  color: ${props => props.theme.color};
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
  margin-top: 60px;
  font-size: 34px;
`;

const SSText = styled(Bold)`
  font-size: 12px;
  font-weight: 100;
`;

const SmallTitle = styled(Title)`
  flex-direction: column;
  align-items: center;
`;

const GreyText = styled(Thin)`
  text-align: center;
  color: ${props => props.theme.greyColor};;
`;

const TripInput = styled.input`
  width: 215px;
  border: 0;
  border-bottom:  1px solid ${props => props.theme.borderColor};
  padding: 5px;
  color: ${props => props.theme.color};
  font-size: 12px;
  font-weight: 100;
  &:focus {
    outline: none;
    &::-webkit-input-placeholder {
      color: transparent;
    }
  }
  &::placeholder {
    color: ${props => props.theme.greyColor};
    text-align: right;
  }
`;

const UserRow = styled.div<ITheme>`
  display: grid;
  flex-direction: row;
  height: 50px;
  grid-template-columns: 5fr 0.5fr;
  padding: 0 5px 0 5px;
  grid-gap: 15px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${props => props.theme.hoverColor};
  }
  &:not(:last-child) {
    border-bottom:  1px solid ${props => props.theme.borderColor};
  }
`;

const AvatarKeyContainer = styled.div`
  position: relative;
  z-index: 10;
  &:hover {
    svg {
      opacity: 1;
      transition: all 0.1s ease-in-out;
    }
  }
`;

const ModalAvatars = styled.div`
  z-index: 10;
  margin-top: 85px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  justify-content: center;
  align-items: center;
  animation: ${ModalAnimation} 0.1s linear;
  /* height: 100vh; */
  height: auto;
  overflow-y: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  ::-webkit-scrollbar {
    display: none !important;
    width: 3px;
    background: none;
  }
  &::-webkit-scrollbar-track {
    background: none;
  }
  @media screen and (max-width: 635px) {
    grid-template-columns: 1fr;
  }
  @media screen and (min-width: 635px) and (max-width: 935px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ModalAvatarImage = styled.img`
  z-index: 10;
  height: 300px;
  width: 300px;
  object-fit: cover;
`;

const ImageInput = styled.input`
  display: none;
`;

const AvatarUploadIcon = styled.div`
  z-index: 11;
  height: 300px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  svg {
    fill: ${props => props.theme.iconColor};
    transition: fill 0.2s ease-in-out;
       &:hover {
      fill: ${props => props.theme.hoverColor}
    }
  }
`;

const Label = styled.label``;

const AWrapper = styled.div`
  z-index: 101;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${ModalAnimation} 0.1s linear;
`;

const Img = styled.img`
  display: flex;
  height: 700px;
  width: 700px;
  background-position: center center;
  object-fit: cover;
  @media screen and (max-width: 700px) {
    width: 100%;
    height: 100%;
  }
`;

const Earth = styled.img`
  display: flex;
  width: 267px;
  height: 200px;
  background-position: center center;
  object-fit: cover;
  @media screen and (max-width: 600px) {
    align-self: center;
    height: 300px;
    width: 300px;
  }
`;

const PreviewModalContainer = styled(ModalContainer)`
  z-index: 11;
`;

const AvatarImage = styled.div``;

const AvatarDeleteIcon = styled.div`
  z-index: 20;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  svg {
    opacity: 0;
    transition: all 0.1s ease-in-out;
    fill: ${props => props.theme.iconColor};
  }
`;

const RedDotIcon = styled.div`
  z-index: 20;
  position: absolute;
  top: 18px;
  left: 18px;
  cursor: pointer;
`;

const WhiteDotIcon = styled(RedDotIcon)`
  svg {
    opacity: 0;
    transition: all 0.1s ease-in-out;
    fill: ${props => props.theme.iconColor};
  }
`;

const ConfirmModalContainer = styled(ModalContainer)`
  z-index: 12;
`;
const ConfirmModalOverlay = styled(ModalOverlay)`
  z-index: 12;
`;
const ConfirmModal = styled(Modal)`
  z-index: 12;
`;
const ConfirmModalLink = styled(ModalLink)`
  z-index: 12;
`;

interface ITheme {
  size?: string;
}

interface IProps {
  userProfileData: any;
  userProfileLoading: boolean;

  avatarsData: any;
  avatarsLoading: boolean;

  getTripsData?: any;
  getTipsLoading: boolean;

  coffeeData?: any;
  coffeeLoading: boolean;

  modalOpen: boolean;
  reportModalOpen: boolean;
  avatarPreviewModalOpen: boolean;

  tripModalOpen: boolean;
  tripConfirmModalOpen: boolean;
  tripAddModalOpen: boolean;
  tripEditModalOpen: boolean;
  requestModalOpen: boolean;
  profilFormModalOpen: boolean;

  tripCitySearch: string;
  cityName: string;
  cityId: string;
  cityPhoto: string;
  countryName: string;

  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  tripStartDate: moment.Moment | null;
  tripEndDate: moment.Moment | null;
  focusedInput: "startDate" | "endDate" | null;
  onDatesChange: (arg: {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }) => void;
  onFocusChange: (arg: "startDate" | "endDate" | null) => void;

  toggleModal: () => void;
  toggleReportModal: () => void;
  toggleTripModal: any;
  toggleTripConfirmModal: () => void;
  toggleAddTripModal: () => void;
  toggleEditTripModal: () => void;

  toggleRequestModal: () => void;
  toggleProfileFormModal: () => void;
  avatarModalOpen: boolean;
  toggleAvatarModal: () => void;
  togglePreviewAvatarModal: () => void;

  addTrip: () => void;
  editTrip: () => void;
  deleteTrip: () => void;
  gotoTrip: (
    cityName: string,
    cityId: string,
    cityPhoto: string,
    countryName: string,
    tripStartDate: moment.Moment | null,
    tripEndDate: moment.Moment | null
  ) => void;

  submitCoffee: any;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;

  username: string;

  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  tripList: any;
  isDayBlocked: any;

  onClickSearch: (cityId: string, cityName: string) => void;
  createCityLoading: boolean;
  uploadAvatarLoading: boolean;
  onChangeImage: (currentTarget) => void;
  onSubmitImage: (event) => void;
  imagePreviewUrl: string;
  removeImagePreviewUrl: () => void;
  deleteAvatarFn: MutationFn;
  markAsMainFn: any;
  logUserOutFn: any;
  logoutConfirmModal: boolean;
  toggleLogoutConfirmModal: () => void;
  slackReportUsers: (payload: string) => void;
}

const UserProfilePresenter: React.FunctionComponent<IProps> = ({
  userProfileData: { userProfile: { user = null } = {} } = {},
  userProfileLoading,

  avatarsData: { getAvatars: { avatars = null } = {} } = {},
  avatarsLoading,

  getTripsData: { getTrips: { trip: getTrips = null } = {} } = {},
  getTipsLoading,

  coffeeData: { getCoffees: { coffees = null } = {} } = {},
  coffeeLoading,

  modalOpen,
  reportModalOpen,
  avatarPreviewModalOpen,
  tripModalOpen,
  tripConfirmModalOpen,
  tripAddModalOpen,
  tripEditModalOpen,

  requestModalOpen,

  toggleModal,
  toggleReportModal,
  toggleTripModal,
  toggleTripConfirmModal,
  toggleAddTripModal,
  toggleEditTripModal,
  togglePreviewAvatarModal,

  toggleRequestModal,

  toggleProfileFormModal,
  addTrip,
  editTrip,
  deleteTrip,
  gotoTrip,
  onInputChange,
  onSearchInputChange,
  onSelectChange,
  tripCitySearch,
  cityName,
  cityId,
  cityPhoto,
  countryName,
  startDate,
  endDate,
  tripStartDate,
  tripEndDate,
  focusedInput,
  onDatesChange,
  onFocusChange,
  submitCoffee,

  username,
  search,
  onChange,
  tripList,
  // isDayBlocked,

  onClickSearch,
  createCityLoading,
  uploadAvatarLoading,
  avatarModalOpen,
  toggleAvatarModal,
  onChangeImage,
  onSubmitImage,
  imagePreviewUrl,
  removeImagePreviewUrl,
  deleteAvatarFn,
  markAsMainFn,
  logUserOutFn,
  logoutConfirmModal,
  toggleLogoutConfirmModal,
  slackReportUsers
}) => {
  const { results, isLoading } = useGoogleAutocomplete({
    apiKey: `${GOOGLE_PLACE_KEY}`,
    query: tripCitySearch,
    options: {
      types: "(cities)",
      language: "en"
    }
  });
  if (userProfileLoading || avatarsLoading) {
    return <Loader />;
  } else if (user && coffees && avatars) {
    return (
      <>
        {logoutConfirmModal && (
          <ConfirmModalContainer>
            <ConfirmModalOverlay onClick={toggleLogoutConfirmModal} />
            <ConfirmModal>
              <ConfirmModalLink onClick={logUserOutFn}>Yes</ConfirmModalLink>
              <ConfirmModalLink onClick={toggleLogoutConfirmModal}>
                No
              </ConfirmModalLink>
            </ConfirmModal>
          </ConfirmModalContainer>
        )}
        {avatarPreviewModalOpen && (
          <PreviewModalContainer>
            <ModalOverlay onClick={togglePreviewAvatarModal} />
            <AWrapper>
              <Img src={imagePreviewUrl} />
            </AWrapper>
          </PreviewModalContainer>
        )}
        {avatarModalOpen && (
          <AvatarModalContainer>
            <ModalOverlay onClick={e => onSubmitImage(e)} />
            <ModalAvatars>
              {user.profile.isSelf && imagePreviewUrl.length === 0 && (
                <AvatarUploadIcon>
                  <Label htmlFor="file">
                    <Upload />
                  </Label>
                  <ImageInput
                    id="file"
                    type="file"
                    accept="image/*"
                    onChange={e => onChangeImage(e)}
                  />
                </AvatarUploadIcon>
              )}
              {user.profile.isSelf && imagePreviewUrl.length !== 0 && (
                <AvatarKeyContainer>
                  <AvatarDeleteIcon onClick={removeImagePreviewUrl}>
                    <Delete />
                  </AvatarDeleteIcon>
                  <AvatarImage onClick={togglePreviewAvatarModal}>
                    <ModalAvatarImage src={imagePreviewUrl} />
                  </AvatarImage>
                </AvatarKeyContainer>
              )}
              {!avatarsLoading &&
                avatars &&
                avatars.length !== 0 &&
                avatars.map(avatar => {
                  return (
                    <AvatarKeyContainer key={avatar.id}>
                      <AvatarImage>
                        {avatar.image ? (
                          <Link
                            to={{
                              pathname: `/${username}/${avatar.uuid}`,
                              state: { avatarModalOpen: true }
                            }}
                          >
                            <ModalAvatarImage
                              src={`${BACKEND_URL}/media/${avatar.thumbnail}`}
                            />
                          </Link>
                        ) : (
                          <ModalAvatarImage
                            src={`${BACKEND_URL}/media/${avatar.thumbnail}`}
                          />
                        )}
                      </AvatarImage>
                      {avatar.isMain && user.profile.isSelf ? (
                        <RedDotIcon>
                          <RedDot />
                        </RedDotIcon>
                      ) : null}
                      {!avatar.isMain && user.profile.isSelf ? (
                        <WhiteDotIcon
                          onClick={() =>
                            markAsMainFn({
                              variables: { uuid: avatar.uuid }
                            })
                          }
                        >
                          <WhiteDot />
                        </WhiteDotIcon>
                      ) : null}
                      {!avatar.isMain && user.profile.isSelf ? (
                        <AvatarDeleteIcon
                          onClick={() =>
                            deleteAvatarFn({ variables: { uuid: avatar.uuid } })
                          }
                        >
                          <Delete />
                        </AvatarDeleteIcon>
                      ) : null}
                    </AvatarKeyContainer>
                  );
                })}
            </ModalAvatars>
          </AvatarModalContainer>
        )}
        {requestModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleRequestModal} />
            <Modal>
              <ModalLink onClick={() => submitCoffee("everyone")}>
                EVERYONE
              </ModalLink>
              <ModalLink onClick={() => submitCoffee("nationality")}>
                NATIONALITY
              </ModalLink>
              <ModalLink onClick={() => submitCoffee("gender")}>
                GENDER
              </ModalLink>
              <ModalLink onClick={toggleRequestModal}>Cancel</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        {modalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleModal} />
            <Modal>
              <ModalLinkContainer
                to={{
                  pathname: `/account/edit`,
                  state: {
                    username: user.username,
                    isSelf: user.profile.isSelf,
                    isDarkMode: user.profile.isDarkMode,
                    isHideTrips: user.profile.isHideTrips,
                    isHideCoffees: user.profile.isHideCoffees,
                    isHideCities: user.profile.isHideCities,
                    isHideCountries: user.profile.isHideCountries,
                    isHideContinents: user.profile.isHideContinents,
                    isAutoLocationReport: user.profile.isAutoLocationReport,
                    bio: user.profile.bio,
                    gender: user.profile.gender,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    nationality: user.profile.nationality,
                    residence: user.profile.residence,
                    avatarUrl: user.profile.avatarUrl,
                    countryPhoneNumber: user.profile.countryPhoneNumber,
                    countryPhoneCode: user.profile.countryPhoneCode,
                    phoneNumber: user.profile.phoneNumber,
                    email: user.profile.email,
                    isVerifiedPhoneNumber: user.profile.isVerifiedPhoneNumber,
                    isVerifiedEmail: user.profile.isVerifiedEmail
                  }
                }}
              >
                Edit Profile
              </ModalLinkContainer>
              <ModalLinkContainer
                to={{
                  pathname: `/account/settings`,
                  state: {
                    username: user.username,
                    isSelf: user.profile.isSelf,
                    isDarkMode: user.profile.isDarkMode,
                    isHideTrips: user.profile.isHideTrips,
                    isHideCoffees: user.profile.isHideCoffees,
                    isHideCities: user.profile.isHideCities,
                    isHideCountries: user.profile.isHideCountries,
                    isHideContinents: user.profile.isHideContinents,
                    isAutoLocationReport: user.profile.isAutoLocationReport,
                    bio: user.profile.bio,
                    gender: user.profile.gender,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    nationality: user.profile.nationality,
                    residence: user.profile.residence,
                    avatarUrl: user.profile.avatarUrl,
                    countryPhoneNumber: user.profile.countryPhoneNumber,
                    countryPhoneCode: user.profile.countryPhoneCode,
                    phoneNumber: user.profile.phoneNumber,
                    email: user.profile.email,
                    isVerifiedPhoneNumber: user.profile.isVerifiedPhoneNumber,
                    isVerifiedEmail: user.profile.isVerifiedEmail
                  }
                }}
              >
                Settings
              </ModalLinkContainer>
              <ModalLink onClick={toggleLogoutConfirmModal}>Log Out</ModalLink>
              <ModalLink onClick={toggleModal}>Cancel</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        {tripModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleTripModal} />
            <Modal>
              <ModalLink
                onClick={() =>
                  gotoTrip(
                    cityName,
                    cityId,
                    cityPhoto,
                    countryName,
                    tripStartDate,
                    tripEndDate
                  )
                }
              >
                Goto Trip
              </ModalLink>
              <ModalLink onClick={toggleAddTripModal}>Add Trip</ModalLink>
              <ModalLink onClick={toggleEditTripModal}>Edit Trip</ModalLink>
              <ModalLink onClick={toggleTripConfirmModal}>
                Delete Trip
              </ModalLink>
              <ModalLink onClick={toggleTripModal}>Cancel</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        {reportModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleReportModal} />
            <Modal>
              <ModalLink onClick={() => slackReportUsers("PHOTO")}>
                Inappropriate Photos
              </ModalLink>
              <ModalLink onClick={() => slackReportUsers("SPAM")}>
                Wrong Loca
              </ModalLink>
              <ModalLink onClick={() => slackReportUsers("MESSAGE")}>
                Inappropriate Message
              </ModalLink>
              <ModalLink onClick={() => slackReportUsers("OTHER")}>
                Other
              </ModalLink>
              <ModalLink onClick={toggleReportModal}>Cancel</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        {tripConfirmModalOpen && (
          <ConfirmModalContainer>
            <ConfirmModalOverlay onClick={toggleTripConfirmModal} />
            <ConfirmModal>
              <ConfirmModalLink onClick={deleteTrip}>Yes</ConfirmModalLink>
              <ConfirmModalLink onClick={toggleTripConfirmModal}>
                No
              </ConfirmModalLink>
            </ConfirmModal>
          </ConfirmModalContainer>
        )}
        {tripAddModalOpen && (
          <TripModalContainer>
            <ModalOverlay onClick={addTrip} />
            <TripInputContainer>
              <DateRangePickerContainer>
                <DateRangePicker
                  startDateId="startDate"
                  endDateId="endDate"
                  startDate={startDate}
                  endDate={endDate}
                  onDatesChange={onDatesChange}
                  onFocusChange={onFocusChange}
                  focusedInput={focusedInput}
                  isOutsideRange={() => false}
                  withPortal={true}
                  // isDayBlocked={isDayBlocked()}
                />
              </DateRangePickerContainer>
              <SearchCitiesInput
                autoFocus={true}
                placeholder={"Search a City"}
                onChange={onSearchInputChange}
                value={tripCitySearch}
                autoComplete={"off"}
              />
              <TripModal>
                {createCityLoading || (isLoading && <Loader />)}
                {tripCitySearch.length > 0 &&
                  results.predictions &&
                  !createCityLoading &&
                  !isLoading &&
                  results.predictions.length > 0 &&
                  results.predictions.map(prediction => (
                    <UserRow
                      key={prediction.id}
                      onClick={() =>
                        onClickSearch(
                          prediction.place_id,
                          prediction.structured_formatting.main_text
                        )
                      }
                    >
                      <TripSearchHeader>
                        <SAvatar size={"sm"} cityId={prediction.place_id} />
                        <HeaderColumn>
                          <HeaderText
                            text={prediction.structured_formatting.main_text}
                          />
                          <Location>
                            {prediction.structured_formatting.secondary_text
                              ? prediction.structured_formatting.secondary_text
                              : prediction.structured_formatting.main_text}
                          </Location>
                        </HeaderColumn>
                      </TripSearchHeader>
                    </UserRow>
                  ))}
              </TripModal>
            </TripInputContainer>
          </TripModalContainer>
        )}

        {tripEditModalOpen && (
          <TripModalContainer>
            <ModalOverlay onClick={editTrip} />
            <TripInputContainer>
              <DateRangePickerContainer>
                <DateRangePicker
                  startDateId="startDate"
                  endDateId="endDate"
                  startDate={startDate}
                  endDate={endDate}
                  onDatesChange={onDatesChange}
                  onFocusChange={onFocusChange}
                  focusedInput={focusedInput}
                  isOutsideRange={() => false}
                  withPortal={true}
                  // isDayBlocked={isDayBlocked()}
                />
              </DateRangePickerContainer>
              <SearchCitiesInput
                autoFocus={true}
                placeholder={cityName || "Search a City"}
                onChange={onSearchInputChange}
                value={tripCitySearch}
                autoComplete={"off"}
              />
              <TripModal>
                {createCityLoading || (isLoading && <Loader />)}
                {tripCitySearch.length > 0 &&
                  results.predictions &&
                  !createCityLoading &&
                  !isLoading &&
                  results.predictions.length > 0 &&
                  results.predictions.map(prediction => (
                    <UserRow
                      key={prediction.id}
                      onClick={() =>
                        onClickSearch(
                          prediction.place_id,
                          prediction.structured_formatting.main_text
                        )
                      }
                    >
                      <TripSearchHeader>
                        <SAvatar
                          size={"sm"}
                          url={prediction.structured_formatting.main_text}
                        />
                        <HeaderColumn>
                          <HeaderText
                            text={prediction.structured_formatting.main_text}
                          />
                          <Location>
                            {prediction.structured_formatting.secondary_text
                              ? prediction.structured_formatting.secondary_text
                              : prediction.structured_formatting.main_text}
                          </Location>
                        </HeaderColumn>
                      </TripSearchHeader>
                    </UserRow>
                  ))}
              </TripModal>
            </TripInputContainer>
          </TripModalContainer>
        )}

        {/* 
        ////////////// HEADER //////////////
        */}
        <Header>
          <AvatarContainer>
            <PAvatar
              size="lg"
              url={user.profile.avatarUrl}
              onClick={toggleAvatarModal}
            />
          </AvatarContainer>
          <NameContainer>
            <Username>{user.username}</Username>
            {user.profile.isSelf ? (
              <ListIcon onClick={toggleModal}>
                <List />
              </ListIcon>
            ) : (
              <ListIcon onClick={toggleReportModal}>
                <List />
              </ListIcon>
            )}
          </NameContainer>
        </Header>
        {/* 
        ////////////// BODY //////////////
        */}
        <SWrapper>
          <PHeader>
            <LocationAvatarContainer>
              <Link to={`/city/${user.profile.currentCity.cityId}`}>
                <CAvatar
                  size="lg"
                  url={user.profile.currentCity.cityPhoto}
                  city={true}
                />
              </Link>
              <Row>{`${user.profile.bio}`}</Row>
              <Row>
                <UBold text={String(user.profile.distance)} />
                <UBold text={" how many KM"} />
              </Row>
              <Row>
                <UBold text={String(user.profile.tripCount)} />
                <UBold text={" how many TRIPS - done"} />
              </Row>
              {user.profile.isHideCoffees ? (
                <Row>
                  <GreyUBold text={String(user.profile.coffeeCount)} />
                  {user.profile.cityCount === 1 ? (
                    <GreyUBold text={"Coffee requested"} />
                  ) : (
                    <GreyUBold text={"Coffees requested"} />
                  )}
                </Row>
              ) : (
                <Link
                  to={{
                    pathname: `/${username}/coffees`,
                    state: { coffeesModalOpen: true }
                  }}
                >
                  <Row>
                    <UBold text={String(user.profile.coffeeCount)} />
                    {user.profile.cityCount === 1 ? (
                      <UBold text={"Coffee requested"} />
                    ) : (
                      <UBold text={"Coffees requested"} />
                    )}
                  </Row>
                </Link>
              )}
              {user.profile.isHideCities ? (
                <Row>
                  <GreyUBold text={String(user.profile.cityCount)} />
                  {user.profile.cityCount === 1 ? (
                    <GreyUBold text={"City visited"} />
                  ) : (
                    <GreyUBold text={"Cities visited"} />
                  )}
                </Row>
              ) : (
                <Link
                  to={{
                    pathname: `/${username}/cities`,
                    state: { cityModalOpen: true }
                  }}
                >
                  <Row>
                    <UBold text={String(user.profile.cityCount)} />
                    {user.profile.cityCount === 1 ? (
                      <UBold text={"City visited"} />
                    ) : (
                      <UBold text={"Cities visited"} />
                    )}
                  </Row>
                </Link>
              )}
              {user.profile.isHideCountries ? (
                <Row>
                  <GreyUBold text={String(user.profile.countryCount)} />
                  {user.profile.countryCount === 1 ? (
                    <GreyUBold text={"Country visited"} />
                  ) : (
                    <GreyUBold text={"Countries visited"} />
                  )}
                </Row>
              ) : (
                <Link
                  to={{
                    pathname: `/${username}/countries`,
                    state: { countryModalOpen: true }
                  }}
                >
                  <Row>
                    <UBold text={String(user.profile.countryCount)} />
                    {user.profile.countryCount === 1 ? (
                      <UBold text={"Country visited"} />
                    ) : (
                      <UBold text={"Countries visited"} />
                    )}
                  </Row>
                </Link>
              )}
              {user.profile.isHideContinents ? (
                <Row>
                  <GreyUBold text={String(user.profile.continentCount)} />
                  {user.profile.continentCount === 1 ? (
                    <GreyUBold text={"Continent visited"} />
                  ) : (
                    <GreyUBold text={"Continents visited"} />
                  )}
                </Row>
              ) : (
                <Link
                  to={{
                    pathname: `/${username}/continents`,
                    state: { continentModalOpen: true }
                  }}
                >
                  <Row>
                    <UBold text={String(user.profile.continentCount)} />
                    {user.profile.continentCount === 1 ? (
                      <UBold text={"Continent visited"} />
                    ) : (
                      <UBold text={"Continents visited"} />
                    )}
                  </Row>
                </Link>
              )}
              {user.profile.nationality ? (
                <Row>
                  <Link to={`/country/${user.profile.nationality.countryCode}`}>
                    <UBold
                      text={String(user.profile.nationality.countryEmoji)}
                    />
                    <UBold
                      text={String(user.profile.nationality.countryName)}
                    />
                    <UBold text={"nationality"} />
                  </Link>
                </Row>
              ) : null}
              {user.profile.residence ? (
                <Row>
                  <Link to={`/country/${user.profile.residence.countryCode}`}>
                    <UBold text={String(user.profile.residence.countryEmoji)} />
                    <UBold text={String(user.profile.residence.countryName)} />
                    <UBold text={"residence"} />
                  </Link>
                </Row>
              ) : null}
              <Weather
                latitude={user.profile.currentCity.latitude}
                longitude={user.profile.currentCity.longitude}
              />
              {!coffeeLoading && coffees && coffees.length !== 0 ? (
                <>
                  <SmallTitle>
                    <SSText text={"COFFEE NOW"} />
                  </SmallTitle>
                  <AvatarGrid coffees={coffees} />
                </>
              ) : null}
              {user.profile.isSelf && !coffeeLoading && coffees.length === 0 ? (
                <>
                  <SmallTitle>
                    <SSText text={"COFFEE NOW"} />
                  </SmallTitle>
                  <AvatarGrid toggleRequestModal={toggleRequestModal} />
                </>
              ) : null}
            </LocationAvatarContainer>

            {!user.profile.isSelf && user.profile.isHideTrips ? (
              <p>😎</p>
            ) : (
              <Container>
                <Earth src={require(`../../../Images/animations/earth.gif`)} />
                <TripContainer>
                  <UserNameRow>
                    <SText text={"TRIPS"} />
                    <TripInput
                      placeholder="Search city"
                      value={search}
                      onChange={onChange}
                    />
                  </UserNameRow>
                  {user.profile.isSelf && (
                    <TripIcon onClick={toggleAddTripModal}>
                      <Upload />
                    </TripIcon>
                  )}
                  {tripList.length !== 0 &&
                    tripList.map(trip => (
                      <TripRow key={trip.id}>
                        <THeader
                          onClick={() =>
                            gotoTrip(
                              trip.city.cityName,
                              trip.city.cityId,
                              trip.city.cityPhoto,
                              trip.city.country.countryName,
                              trip.startDate,
                              trip.endDate
                            )
                          }
                        >
                          <SAvatar
                            size={"sm"}
                            url={trip.city.cityPhoto}
                            city={true}
                          />
                          <HeaderColumn>
                            <HeaderText text={trip.city.cityName} />
                            <Location>{trip.city.country.countryName}</Location>
                          </HeaderColumn>
                        </THeader>
                        <GreyText
                          text={trip.startDate ? trip.startDate : "-"}
                        />
                        <GreyText text={trip.endDate ? trip.endDate : "-"} />
                        <GreyText
                          text={
                            trip.diffDays === 1
                              ? `${trip.diffDays} Day`
                              : `${trip.diffDays} Days`
                          }
                        />
                        <TripOverlay
                          onClick={() => {
                            user.profile.isSelf
                              ? toggleTripModal(
                                  trip.id,
                                  trip.city.cityName,
                                  trip.city.cityId,
                                  trip.city.cityPhoto,
                                  trip.city.country.countryName,
                                  trip.startDate,
                                  trip.endDate
                                )
                              : gotoTrip(
                                  trip.city.cityName,
                                  trip.city.cityId,
                                  trip.city.cityPhoto,
                                  trip.city.country.countryName,
                                  trip.startDate,
                                  trip.endDate
                                );
                          }}
                        >
                          <List />
                        </TripOverlay>
                      </TripRow>
                    ))}
                  {tripList.length === 0 &&
                    !search &&
                    getTrips &&
                    getTrips.map(trip => (
                      <TripRow key={trip.id}>
                        <THeader
                          onClick={() =>
                            gotoTrip(
                              trip.city.cityName,
                              trip.city.cityId,
                              trip.city.cityPhoto,
                              trip.city.country.countryName,
                              trip.startDate,
                              trip.endDate
                            )
                          }
                        >
                          <SAvatar
                            size={"sm"}
                            url={trip.city.cityPhoto}
                            city={true}
                          />
                          <HeaderColumn>
                            <HeaderText text={trip.city.cityName} />
                            <Location>{trip.city.country.countryName}</Location>
                          </HeaderColumn>
                        </THeader>
                        <GreyText
                          text={trip.startDate ? trip.startDate : "-"}
                        />
                        <GreyText text={trip.endDate ? trip.endDate : "-"} />
                        {trip.diffDays ? (
                          <GreyText
                            text={
                              trip.diffDays === 1
                                ? `${trip.diffDays} Day`
                                : `${trip.diffDays} Days`
                            }
                          />
                        ) : (
                          <GreyText text={"no trip date"} />
                        )}
                        <TripOverlay
                          onClick={() => {
                            user.profile.isSelf
                              ? toggleTripModal(
                                  trip.id,
                                  trip.city.cityName,
                                  trip.city.cityId,
                                  trip.city.cityPhoto,
                                  trip.city.country.countryName,
                                  trip.startDate,
                                  trip.endDate
                                )
                              : gotoTrip(
                                  trip.city.cityName,
                                  trip.city.cityId,
                                  trip.city.cityPhoto,
                                  trip.city.country.countryName,
                                  trip.startDate,
                                  trip.endDate
                                );
                          }}
                        >
                          <List />
                        </TripOverlay>
                      </TripRow>
                    ))}
                </TripContainer>
              </Container>
            )}
          </PHeader>
        </SWrapper>
      </>
    );
  }
  return null;
};

export default UserProfilePresenter;
