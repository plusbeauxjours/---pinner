import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Gear, List } from "../../Icons";
import styled, { keyframes } from "../../Styles/typed-components";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import Textarea from "react-expanding-textarea";
import { Upload } from "../../Icons";

import Wrapper from "../../Components/Wrapper";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import Bold from "../../Components/Bold";
import FollowBtn from "../../Components/FollowBtn";
import Input from "../../Components/Input";
import GetCities from "../../Components/GetCities";
import GetCountries from "../../Components/GetCountries";
import GetContinents from "../../Components/GetContinents";
import AvatarGrid from "../../Components/AvatarGrid";
import GetCards from "../../Components/GetCards";
import Weather from "../../Components/Weather";

const Header = styled.header`
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 300px;
  align-items: center;
  background: ${props => props.theme.headerColor};
`;

const PAvatar = styled(Avatar)`
  margin: 40px 0 20px 0;
`;

const NameContainer = styled.span`
  margin-bottom: 20px;
`;

const GearContainer = styled.span`
  margin-left: 15px;
  cursor: pointer;
`;

const SWrapper = styled(Wrapper)`
  z-index: 1;
`;

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
  flex-direction: column;
`;

const CAvatar = styled(Avatar)`
  border-radius: 3px;
  height: 200px;
  width: 200px;
  margin-right: 20px;
  @media screen and (max-width: 600px) {
    margin-right: 0px;
  }
`;

const SText = styled(Bold)`
  font-size: 18px;
  font-weight: 100;
`;

const UserContainer = styled.div`
  display: flex;
  width: 100%;
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
`;

const Username = styled.span`
  text-align: center;
  font-size: 22px;
  font-weight: 100;
`;

const TripOverlay = styled.div`
  z-index: 1;
  opacity: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    fill: white;
    transition: fill 0.3s ease-in-out;
    &:hover {
      fill: red;
    }
  }
  transition: opacity 0.3s ease-in-out;
`;

const UserRow = styled.div`
  display: grid;
  flex-direction: row;
  height: 50px;
  grid-template-columns: 3fr 1fr 1fr 1fr 0.2fr;
  padding: 0 5px 0 5px;
  grid-gap: 15px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: grey;
  }
  &:hover {
    ${TripOverlay} {
      opacity: 1;
    }
  }
  border-top: 1px solid grey;
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

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  -webkit-box-flex: 0;
  flex: 0 0 auto;
  height: 280px;
  padding: 15px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const CityContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CityPhoto = styled.img<ITheme>`
  display: flex;
  width: ${props => {
    if (props.size === "md") {
      return "200px";
    } else if (props.size === "sm") {
      return "50px";
    } else {
      return "200px";
    }
  }};
  height: ${props => {
    if (props.size === "md") {
      return "200px";
    } else if (props.size === "sm") {
      return "50px";
    } else {
      return "200px";
    }
  }};
  background-size: cover;
  border-radius: 3px;
  z-index: 1;
  object-fit: cover;
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-items: center;
  margin: 0 70px 0 70px;
  cursor: pointer;
  svg {
    fill: white;
    transition: fill 0.2s ease-in-out;
    &:hover {
      fill: grey;
    }
  }
`;

const TripIcon = styled(Icon)`
  align-self: center;
  justify-self: center;
  margin-bottom: 10px;
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
  font-size: 7px;
  cursor: pointer;
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

const FromModalContainer = styled(ModalContainer)``;

const Modal = styled.div`
  background-color: #2d3a41;
  width: 30%;
  border-radius: 12px;
  z-index: 10;
  animation: ${ModalAnimation} 0.1s linear;
`;

const FormModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 30%;
`;

const RowModal = styled.div`
  z-index: 10;
  animation: ${ModalAnimation} 0.1s linear;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalOverlay = styled.div`
  z-index: 5;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.6);
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

const ExtendedInput = styled(Input)`
  width: 287px;
  height: 48px;
`;

const GreyLine = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid grey;
`;

const TripBox = styled.div`
  width: 905px;
  display: flex;
  overflow-x: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  ::-webkit-scrollbar {
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0 0, 0, 0.3);
    border-radius: 10px;
    background-color: ${props => props.theme.bgColor};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    background-color: ${props => props.theme.greyColor};
  }
`;

const ScrollContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  margin: 0 15px 25px 0;
`;

const Square = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-position: cover;
  background-size: 100%;
`;

const STextArea = styled(Textarea)`
  width: 100%;
  border: 0;
  resize: none;
  font-size: 14px;
  padding: 15px 0px;
`;

const SSText = styled(Bold)`
  font-size: 12px;
  font-weight: 100;
`;
const SmallTitle = styled(Title)`
  flex-direction: column;
  align-items: center;
`;

const SmallGreyLine = styled(GreyLine)`
  width: 40%;
`;

const GreyText = styled(Bold)`
  color: #999;
`;

const TripInput = styled.input`
  width: 215px;
  border: 0;
  border: ${props => props.theme.boxBorder};
  background-color: ${props => props.theme.bgColor};
  border-radius: 3px;
  padding: 5px;
  color: white;
  font-size: 14px;
  &::placeholder {
    color: ${props => props.theme.greyColor};
  }
`;

interface ITheme {
  size?: string;
}

interface IProps {
  userProfileData: any;
  userProfileLoading: boolean;

  getTripsData?: any;
  getTipsLoading: boolean;

  knowingFollowersData: any;
  knowingFollowersLoading: boolean;

  coffeeData?: any;
  coffeeLoading: boolean;

  modalOpen: boolean;
  confirmModalOpen: boolean;

  tripModalOpen: boolean;
  tripConfirmModalOpen: boolean;
  tripAddModalOpen: boolean;
  tripEditModalOpen: boolean;
  cityModalOpen: boolean;
  countryModalOpen: boolean;
  continentModalOpen: boolean;
  followersModalOpen: boolean;
  followingsModalOpen: boolean;
  knowingFollowersModalOpen: boolean;
  uploadModalOpen: boolean;
  requestModalOpen: boolean;
  coffeeModalOpen: boolean;
  requestingCoffeeModalOpen: boolean;
  coffeeReportModalOpen: boolean;

  editMode: boolean;
  openEditMode: () => void;

  userName: string;
  bio: string;
  gender: string;
  firstName: string;
  lastName: string;
  cityName: string;
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

  toggleTripSeeAll: () => void;
  toggleModal: () => void;
  toggleConfirmModal: () => void;

  toggleTripModal: any;
  toggleTripConfirmModal: () => void;
  toggleAddTripModal: () => void;
  toggleEditTripModal: () => void;
  toggleCityModal: () => void;
  toggleCountryModal: () => void;
  toggleContinentModal: () => void;
  toggleFollowersModal: () => void;
  toggleFollowingsModal: () => void;
  toggleKnowingFollowersModal: () => void;
  toggleUploadModal: () => void;
  toggleRequestModal: () => void;
  toggleCoffeeModal: () => void;
  toggleRequestingCoffeeModal: () => void;
  toggleCoffeeReportModal: () => void;

  logUserOutFn: () => void;

  confirmDeleteProfile: () => void;
  addTrip: () => void;
  editTrip: () => void;
  deleteTrip: () => void;
  gotoTrip: (
    cityName: string,
    cityPhoto: string,
    countryName: string,
    tripStartDate: moment.Moment | null,
    tripEndDate: moment.Moment | null
  ) => void;

  submitCoffee: any;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onKeyUpCard: (event: React.KeyboardEvent<HTMLDivElement>) => void;

  uploadNewCard: (event: React.ChangeEvent<HTMLInputElement>) => void;
  newCardCaption: string;
  deleteCoffee: () => void;
  getCoffeeId: any;
  getRequestingCoffeeId: any;
  username: string;

  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  tripList: any;
}

const UserProfilePresenter: React.SFC<IProps> = ({
  userProfileData: { userProfile: { user = null } = {} } = {},
  userProfileLoading,

  getTripsData: { getTrips: { trip: getTrips = null } = {} } = {},
  getTipsLoading,

  knowingFollowersData: {
    getKnowingFollowers: {
      count = null,
      profiles: knowingFollowers = null
    } = {}
  } = {},
  knowingFollowersLoading,

  coffeeData: { getCoffees: { coffees = null } = {} } = {},
  coffeeLoading,

  modalOpen,
  tripModalOpen,
  confirmModalOpen,
  tripConfirmModalOpen,
  tripAddModalOpen,
  tripEditModalOpen,
  cityModalOpen,
  countryModalOpen,
  continentModalOpen,
  followersModalOpen,
  followingsModalOpen,
  knowingFollowersModalOpen,
  uploadModalOpen,
  requestModalOpen,
  coffeeModalOpen,
  requestingCoffeeModalOpen,
  coffeeReportModalOpen,
  editMode,
  toggleTripSeeAll,
  toggleModal,
  toggleConfirmModal,
  toggleTripModal,
  toggleTripConfirmModal,
  toggleAddTripModal,
  toggleEditTripModal,
  toggleCityModal,
  toggleCountryModal,
  toggleContinentModal,
  toggleFollowersModal,
  toggleFollowingsModal,
  toggleKnowingFollowersModal,
  toggleUploadModal,
  toggleRequestModal,
  toggleCoffeeModal,
  toggleRequestingCoffeeModal,
  toggleCoffeeReportModal,
  openEditMode,
  logUserOutFn,
  confirmDeleteProfile,
  addTrip,
  editTrip,
  deleteTrip,
  gotoTrip,
  onInputChange,
  onKeyUp,
  userName,
  bio,
  gender,
  firstName,
  lastName,
  cityName,
  cityPhoto,
  countryName,
  startDate,
  endDate,
  tripStartDate,
  tripEndDate,
  focusedInput,
  onDatesChange,
  onFocusChange,
  newCardCaption,
  onKeyUpCard,
  uploadNewCard,
  submitCoffee,
  deleteCoffee,
  getCoffeeId,
  getRequestingCoffeeId,
  username,
  search,
  onChange,
  tripList
}) => {
  if (userProfileLoading) {
    return <Loader />;
  } else if (user) {
    return (
      <>
        {requestingCoffeeModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleRequestingCoffeeModal} />
            <Modal>
              <ModalLink onClick={() => console.log("COFFEE DETAIL")}>
                COFFEE DETAIL
              </ModalLink>
              <ModalLink onClick={() => console.log("EDIT COFFEE")}>
                EDIT COFFEE
              </ModalLink>
              <ModalLink onClick={() => deleteCoffee()}>
                CANCEL COFFEE
              </ModalLink>
              <ModalLink onClick={toggleRequestingCoffeeModal}>
                CANCEL
              </ModalLink>
            </Modal>
          </ModalContainer>
        )}
        {coffeeModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleCoffeeModal} />
            <Modal>
              <ModalLink onClick={() => console.log("COFFEE DETAIL")}>
                COFFEE DETAIL
              </ModalLink>
              <ModalLink onClick={() => deleteCoffee()}>
                DELETE COFFEE
              </ModalLink>
              <ModalLink onClick={toggleCoffeeModal}>CANCEL</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        {coffeeReportModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleCoffeeReportModal} />
            <Modal>
              <ModalLink onClick={() => console.log("REPORT COFFEE")}>
                REPORT COFFEE
              </ModalLink>
              <ModalLink onClick={toggleCoffeeReportModal}>CANCEL</ModalLink>
            </Modal>
          </ModalContainer>
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
              <ModalLink onClick={() => submitCoffee("followers")}>
                FOLLOWERS
              </ModalLink>
              <ModalLink onClick={toggleRequestModal}>CANCEL</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        {uploadModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleUploadModal} />
            <Modal>
              <Wrapper>
                <STextArea
                  placeholder="Add a comment..."
                  onChange={uploadNewCard}
                  value={newCardCaption}
                  onKeyUp={onKeyUpCard}
                />
              </Wrapper>
            </Modal>
          </ModalContainer>
        )}

        {modalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleModal} />
            <Modal>
              <ModalLink onClick={openEditMode}>Edit Profile</ModalLink>
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
        {cityModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleCityModal} />
            <RowModal>
              <Wrapper>
                <GetCities username={user.username} />
              </Wrapper>
            </RowModal>
          </ModalContainer>
        )}
        {countryModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleCountryModal} />
            <RowModal>
              <Wrapper>
                <GetCountries username={user.username} />
              </Wrapper>
            </RowModal>
          </ModalContainer>
        )}
        {continentModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleContinentModal} />
            <RowModal>
              <Wrapper>
                <GetContinents username={user.username} />
              </Wrapper>
            </RowModal>
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
              <ModalLink onClick={toggleTripModal}>CANCEL</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        {tripConfirmModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleTripConfirmModal} />
            <Modal>
              <ModalLink onClick={deleteTrip}>Yes</ModalLink>
              <ModalLink onClick={toggleTripConfirmModal}>No</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        {tripAddModalOpen && (
          <FromModalContainer>
            <ModalOverlay onClick={addTrip} />
            <FormModal>
              <DateRangePicker
                startDateId="startDate"
                endDateId="endDate"
                startDate={startDate}
                endDate={endDate}
                onDatesChange={onDatesChange}
                onFocusChange={onFocusChange}
                focusedInput={focusedInput}
                isOutsideRange={() => false}
              />
              <ExtendedInput
                onChange={onInputChange}
                type={"text"}
                placeholder={"Search a City"}
                name={"cityName"}
              />
            </FormModal>
          </FromModalContainer>
        )}
        {tripEditModalOpen && (
          <FromModalContainer>
            <ModalOverlay onClick={editTrip} />
            <FormModal>
              <DateRangePicker
                startDateId="startDate"
                endDateId="endDate"
                startDate={startDate}
                endDate={endDate}
                onDatesChange={onDatesChange}
                onFocusChange={onFocusChange}
                focusedInput={focusedInput}
                isOutsideRange={() => false}
              />
              <ExtendedInput
                onChange={onInputChange}
                type={"text"}
                value={cityName}
                placeholder={cityName || "cityName"}
                name={"cityName"}
              />
              {console.log(cityName)}
            </FormModal>
          </FromModalContainer>
        )}
        {/* 
        ////////////// HEADER //////////////
        */}
        <Header>
          <PAvatar size="lg" url={user.profile.avatar} />
          <NameContainer>
            {editMode ? (
              <ExtendedInput
                onChange={onInputChange}
                type={"text"}
                value={userName}
                placeholder={user.username}
                name={"userName"}
                onKeyUp={onKeyUp}
              />
            ) : (
              <Username>{user.username}</Username>
            )}
            {user.profile.isSelf ? (
              <GearContainer onClick={toggleModal}>
                <Gear />
              </GearContainer>
            ) : (
              <FollowBtn
                isFollowing={user.profile.isFollowing}
                userId={user.id}
              />
            )}
          </NameContainer>
        </Header>
        {/* 
        ////////////// BODY //////////////
        */}
        <SWrapper>
          <PHeader>
            <AvatarContainer>
              <Link to={`/city/${user.profile.currentCity.cityName}`}>
                <CAvatar size="lg" url={user.profile.currentCity.cityPhoto} />
              </Link>
              {editMode ? (
                <>
                  <ExtendedInput
                    onChange={onInputChange}
                    type={"text"}
                    value={firstName}
                    placeholder={user.firstName || "First Name"}
                    name={"firstName"}
                    onKeyUp={onKeyUp}
                  />
                  <ExtendedInput
                    onChange={onInputChange}
                    type={"text"}
                    value={lastName}
                    placeholder={user.lastName || "Last Name"}
                    name={"lastName"}
                    onKeyUp={onKeyUp}
                  />
                </>
              ) : (
                <p>
                  {user.firstName} {user.lastName}
                </p>
              )}
              {user.profile.bio &&
                (editMode ? (
                  <ExtendedInput
                    onChange={onInputChange}
                    type={"text"}
                    value={bio}
                    placeholder={user.profile.bio || "Bio"}
                    name={"bio"}
                    onKeyUp={onKeyUp}
                  />
                ) : (
                  <Bio>{`${user.profile.bio}`}</Bio>
                ))}
              <SText text={String(user.profile.countryCount.userCount)} />
              <SText text={String(user.profile.cityCount.cardCount)} />
              <Row>
                <UBold text={String(user.profile.postCount)} />
                <UBold text={" POSTS - done"} />
              </Row>
              <Row>
                <UBold text={String(user.profile.postCount)} />
                <UBold text={" KM"} />
              </Row>
              <Row>
                <UBold text={String(user.profile.tripCount)} />
                <UBold text={" TRIPS - done"} />
              </Row>
              <Row onClick={toggleCityModal}>
                <UBold text={String(user.profile.cityCount)} />
                <UBold text={" CITIES - done"} />
              </Row>
              <Row onClick={toggleCountryModal}>
                <UBold text={String(user.profile.countryCount)} />
                <UBold text={" COUNTRIES - done"} />
              </Row>
              <Row onClick={toggleContinentModal}>
                <UBold text={String(user.profile.continentCount)} />
                <UBold text={" CONTINENT - done"} />
              </Row>
              <Weather
                latitude={user.profile.currentCity.latitude}
                longitude={user.profile.currentCity.longitude}
              />
            </AvatarContainer>
            <UserContainer>
              <UserNameRow>
                <Username>TRIPS</Username>
                <TripInput
                  placeholder="Search"
                  value={search}
                  onChange={onChange}
                />
              </UserNameRow>
              {user.profile.isSelf && (
                <TripIcon onClick={addTrip}>
                  <Upload />
                </TripIcon>
              )}
              {getTipsLoading && <Loader />}
              {tripList.length !== 0 &&
                tripList.map(trip => (
                  <UserRow key={trip.id}>
                    <Link to={`/city/${trip.city.cityName}`}>
                      <THeader>
                        <SAvatar size={"sm"} url={trip.city.cityPhoto} />
                        <HeaderColumn>
                          <HeaderText text={trip.city.cityName} />
                          <Location>{trip.city.country.countryName}</Location>
                        </HeaderColumn>
                      </THeader>
                    </Link>
                    <GreyText text={trip.startDate} />
                    <GreyText text={trip.endDate} />
                    <GreyText text={`${trip.diffDays} Days`} />
                    <TripOverlay
                      onClick={() => {
                        user.profile.isSelf
                          ? toggleTripModal(
                              trip.id,
                              trip.city.cityName,
                              trip.city.cityPhoto,
                              trip.city.country.countryName,
                              trip.startDate,
                              trip.endDate
                            )
                          : gotoTrip(
                              trip.city.cityName,
                              trip.city.cityPhoto,
                              trip.city.country.countryName,
                              trip.startDate,
                              trip.endDate
                            );
                      }}
                    >
                      <List />
                    </TripOverlay>
                  </UserRow>
                ))}
              {tripList.length === 0 &&
                !getTipsLoading &&
                getTrips &&
                getTrips.map(trip => (
                  <UserRow key={trip.id}>
                    <Link to={`/city/${trip.city.cityName}`}>
                      <THeader>
                        <SAvatar size={"sm"} url={trip.city.cityPhoto} />
                        <HeaderColumn>
                          <HeaderText text={trip.city.cityName} />
                          <Location>{trip.city.country.countryName}</Location>
                        </HeaderColumn>
                      </THeader>
                    </Link>
                    <GreyText text={trip.startDate} />
                    <GreyText text={trip.endDate} />
                    <GreyText text={`${trip.diffDays} Days`} />
                    <TripOverlay
                      onClick={() => {
                        user.profile.isSelf
                          ? toggleTripModal(
                              trip.id,
                              trip.city.cityName,
                              trip.city.cityPhoto,
                              trip.city.country.countryName,
                              trip.startDate,
                              trip.endDate
                            )
                          : gotoTrip(
                              trip.city.cityName,
                              trip.city.cityPhoto,
                              trip.city.country.countryName,
                              trip.startDate,
                              trip.endDate
                            );
                      }}
                    >
                      <List />
                    </TripOverlay>
                  </UserRow>
                ))}
            </UserContainer>
          </PHeader>
          {!user.profile.isSelf &&
          knowingFollowers &&
          knowingFollowers.length !== 0 ? (
            <>
              <SmallTitle>
                <SmallGreyLine />
                <SSText text={"FOLLOWINGS TOGETHER"} />
              </SmallTitle>
              <AvatarGrid knowingFollowers={knowingFollowers} />
            </>
          ) : null}
          {!coffeeLoading && coffees && coffees.length !== 0 ? (
            <>
              <SmallTitle>
                <SmallGreyLine />
                <SSText text={"COFFEE NOW"} />
              </SmallTitle>
              <AvatarGrid coffees={coffees} />
            </>
          ) : null}
          {user.profile.isSelf && coffees.length === 0 ? (
            <>
              <SmallTitle>
                <SmallGreyLine />
                <SSText text={"COFFEE NOW"} />
              </SmallTitle>
              <AvatarGrid toggleRequestModal={toggleRequestModal} />
            </>
          ) : null}
          <GreyLine />
          {/* 
          ////////////// LOCATIONS //////////////
          */}
          <Title>
            <SText text={`ABOUT ${username}`} />
          </Title>
          <Container>
            <TripBox>
              <ScrollContainer>
                <Link to={`/${username}/followers`}>
                  <CityContainer>
                    <Square>
                      <CityPhoto
                        src={
                          "http://img.khan.co.kr/news/2017/08/09/l_2017080901001275500096051.jpg"
                        }
                        size={"md"}
                      />
                    </Square>
                  </CityContainer>
                </Link>
              </ScrollContainer>
              <ScrollContainer>
                <Link to={`/${username}/followings`}>
                  <CityContainer>
                    <Square>
                      <CityPhoto
                        src={
                          "http://image.dongascience.com/Photo/2018/12/2d5efe44bdd02f3e2ec4e99189d89d18.jpg"
                        }
                        size={"md"}
                      />
                    </Square>
                  </CityContainer>
                </Link>
              </ScrollContainer>
              <ScrollContainer>
                <Link to={`/${username}/cities`}>
                  <CityContainer>
                    <Square>
                      <CityPhoto
                        src={
                          "https://image.fmkorea.com/files/attach/images/3842645/451/442/046/5b8bcef55357387016a4a5d5343249ea.jpg"
                        }
                        size={"md"}
                      />
                    </Square>
                  </CityContainer>
                </Link>
              </ScrollContainer>
              <ScrollContainer>
                <Link to={`/${username}/countries`}>
                  <CityContainer>
                    <Square>
                      <CityPhoto
                        src={
                          "http://playwares.com/files/attach/images/23503529/733/482/043/c64e3f04515122d1aee2879590ee250c.jpg"
                        }
                        size={"md"}
                      />
                    </Square>
                  </CityContainer>
                </Link>
              </ScrollContainer>
              {user.profile.isSelf && (
                <ScrollContainer>
                  <Link to={`/${username}/coffees`}>
                    <CityContainer>
                      <Square>
                        <CityPhoto
                          src={
                            "https://media.hojunara.com/wp-content/uploads/2015/01/%EC%BD%94%EC%95%8C%EB%9D%BC.jpg"
                          }
                          size={"md"}
                        />
                      </Square>
                    </CityContainer>
                  </Link>
                </ScrollContainer>
              )}
            </TripBox>
          </Container>
          <GetCards
            toggleUploadModal={toggleUploadModal}
            upload={user.profile.isSelf ? true : false}
            location={"user"}
            userName={username}
          />
        </SWrapper>
      </>
    );
  }
  return null;
};

export default UserProfilePresenter;
