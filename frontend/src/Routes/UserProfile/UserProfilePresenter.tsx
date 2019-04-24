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
import CardGrid from "../../Components/CardGrid";
import FollowBtn from "../../Components/FollowBtn";
import Input from "../../Components/Input";
import GetCities from "../../Components/GetCities";
import GetCountries from "../../Components/GetCountries";
import GetContinents from "../../Components/GetContinents";
import GetFollowers from "src/Components/GetFollowers";
import GetFollowings from "src/Components/GetFollowings";
import GetDurationAvatars from "src/Components/GetDurationAvatars";
import Flag from "src/Components/Flag";
import GetKnowingFollowers from "src/Components/GetKnowingFollowers";
import Weather from "src/Components/Weather";
import CoffeeGrid from "src/Components/CoffeeGrid";

const PHeader = styled.header`
  display: flex;
  flex-direction: column;
  height: 280px;
  align-items: center;
  background: ${props => props.theme.headerColor};
`;

const PAvatar = styled(Avatar)`
  margin: 40px;
`;

const Username = styled.span`
  text-align: center;
  font-size: 22px;
  font-weight: 100;
`;

const NameContainer = styled.span`
  display: flex;
`;

const GearContainer = styled.span`
  margin-left: 15px;
  cursor: pointer;
`;

const SWrapper = styled(Wrapper)`
  z-index: 1;
  height: 50vh;
  text-align: center;
`;

const PBody = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: 200px;
  grid-gap: 15px;
  flex-wrap: wrap;
  height: 100%;
  justify-content: center;
  background: ${props => props.theme.bgColor};
  padding: 15px;
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
  margin-right: 15px;
  margin-bottom: 25px;
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

const CityName = styled(Bold)`
  position: absolute;
  display: flex;
  z-index: 5;
  font-size: 40px;
  font-family: "Qwigley";
  font-weight: 200;
  pointer-events: none;
`;

const CountryName = styled(CityName)`
  font-size: 20px;
  margin-top: 20px;
  pointer-events: none;
`;

const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(200px, 1fr));
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-items: center;
  margin: 0 60px 0 60px;
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
  margin-bottom: 40px;
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

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  padding: 5px;
  border: 1px solid grey;
`;

const AvatarContainer = styled.div``;

const UBold = styled(Bold)`
  display: flex;
  align-self: flex-end;
  font-weight: 100;
  font-size: 7px;
  cursor: pointer;
`;

const SAvatar = styled(Avatar)`
  margin-right: -12px;
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

const TripContainer = styled.div`
  display: grid;
  flex-direction: column;
  margin: 20px 10px 20px 10px;
`;

const GreyLine = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid grey;
`;

const SBold = styled(Bold)`
  font-size: 20px;
  font-weight: 100;
`;

const CountryNameText = styled.div`
  z-index: 5;
`;

const SFlag = styled(Flag)`
  opacity: 0.4;
`;

const TripOverlay = styled.div`
  z-index: 1;
  opacity: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    fill: white;
  }
  transition: opacity 0.3s ease-in-out;
`;

const TripRow = styled.div<ITheme>`
  display: grid;
  grid-template-columns: 1fr 3fr 3fr 2fr 2fr 1.5fr 3fr 0.2fr;
  justify-content: space-between;
  align-items: center;
  background-color: #2d3a41;
  border-radius: 3px;
  border: 1px solid grey;
  padding: 10px;
  &:hover {
    ${TripOverlay} {
      opacity: 1;
    }
  }
`;

const TripText = styled.div`
  display: flex;
  align-items: center;
`;

const ScrollContainer = styled.div`
  position: relative;
  display: flex;
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

const SeeAll = styled.p`
  font-size: 12px;
  font-weight: 100;
  cursor: pointer;
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

const Overlay = styled.div`
  color: white;
  z-index: 1;
  opacity: 0;
  display: flex;
  position: absolute;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  svg {
    fill: white;
  }
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 1;
  }
`;

const STripText = styled(TripText)`
  margin-left: 15px;
`;

const STextArea = styled(Textarea)`
  width: 100%;
  border: 0;
  resize: none;
  font-size: 14px;
  padding: 15px 0px;
`;

const Box = styled.div`
  width: 905px;
  height: 225px;
  display: flex;
  overflow-x: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  ::-webkit-scrollbar {
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: ${props => props.theme.bgColor};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    background-color: ${props => props.theme.greyColor};
  }
`;

interface ITheme {
  size?: string;
}

interface IProps {
  userProfileData: any;
  userProfileLoading: boolean;

  topCountriesData?: any;
  topCountriesLoading: boolean;

  frequentVisitsData?: any;
  frequentVisitsLoading: boolean;

  getTripsData?: any;
  getTipsLoading: boolean;

  knowingFollowersData: any;
  knowingFollowersLoading: boolean;

  myCoffeeData?: any;
  myCoffeeLoading: boolean;

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
  duration: (
    startDate: moment.Moment | null,
    endDate: moment.Moment | null
  ) => number;
}

const UserProfilePresenter: React.SFC<IProps> = ({
  userProfileData: { userProfile: { user = null } = {} } = {},
  userProfileLoading,

  topCountriesData: {
    topCountries: { footprints: topCountries = null } = {}
  } = {},
  topCountriesLoading,

  frequentVisitsData: {
    frequentVisits: { footprints: frequentCities = null } = {}
  } = {},
  frequentVisitsLoading,

  getTripsData: { getTrips: { footprints: getTrips = null } = {} } = {},
  getTipsLoading,

  knowingFollowersData: {
    getKnowingFollowers: {
      count = null,
      profiles: knowingFollowers = null
    } = {}
  } = {},
  knowingFollowersLoading,

  myCoffeeData: {
    getMyCoffee: { requestingCoffees = null, coffees = null } = {}
  } = {},
  myCoffeeLoading,

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
  duration,
  submitCoffee
}) => {
  if (userProfileLoading) {
    return <Loader />;
  } else if (user && topCountries && frequentCities) {
    return (
      <>
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
              <ModalLink onClick={toggleRequestModal}>Cancel</ModalLink>
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
              <ModalLink onClick={toggleModal}>Cancel</ModalLink>
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
        {followersModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleFollowersModal} />
            <RowModal onClick={toggleFollowersModal}>
              <Wrapper>
                <GetFollowers username={user.username} />
              </Wrapper>
            </RowModal>
          </ModalContainer>
        )}
        {followingsModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleFollowingsModal} />
            <RowModal onClick={toggleFollowingsModal}>
              <Wrapper>
                <GetFollowings username={user.username} />
              </Wrapper>
            </RowModal>
          </ModalContainer>
        )}
        {knowingFollowersModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleKnowingFollowersModal} />
            <RowModal onClick={toggleKnowingFollowersModal}>
              <Wrapper>
                <GetKnowingFollowers username={user.username} />
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
              <ModalLink onClick={toggleTripModal}>Cancel</ModalLink>
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
        <PHeader>
          <PAvatar size="lg" url={user.profile.avatar} />
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
          <NameContainer>
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
        </PHeader>
        {/* 
        ////////////// BODY //////////////
        */}
        <SWrapper>
          <PBody>
            <InfoContainer>
              <CityContainer>
                <Link to={`/city/${user.profile.currentCity.cityName}`}>
                  <CityPhoto
                    src={user.profile.currentCity.cityPhoto}
                    size={"md"}
                  />
                </Link>

                <CityName text={user.profile.currentCity.cityName} />
                <CountryName
                  text={user.profile.currentCity.country.countryName}
                />
              </CityContainer>
              <ColumnContainer>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s
                  with....
                </p>
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
              </ColumnContainer>
            </InfoContainer>
            <InfoContainer>
              <ColumnContainer>
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
              </ColumnContainer>
              <ColumnContainer>
                <Row>
                  {user.profile.followers &&
                    user.profile.followers.map(follower => (
                      <AvatarContainer key={follower.id}>
                        <SAvatar
                          size={"sm"}
                          key={follower.id}
                          url={follower.user.profile.avatar}
                        />
                      </AvatarContainer>
                    ))}
                  <UBold text={String(user.profile.followersCount)} />
                  <UBold text={"PEOPLE THEY CROSS PATHS WITH MOST"} />
                </Row>
                {!user.profile.isSelf && knowingFollowers && (
                  <Row onClick={toggleKnowingFollowersModal}>
                    {knowingFollowers.map(follower => (
                      <AvatarContainer key={follower.id}>
                        <SAvatar
                          size={"sm"}
                          key={follower.id}
                          url={follower.avatar}
                        />
                      </AvatarContainer>
                    ))}
                    <UBold text={String(count)} />
                    <UBold
                      text={
                        "SOME OF YOUR FOLLOWERS ARE FOLLOWING TOGETHER - done"
                      }
                    />
                  </Row>
                )}
                <Row onClick={toggleFollowersModal}>
                  {user.profile.followers &&
                    user.profile.followers.map(follower => (
                      <AvatarContainer key={follower.id}>
                        <SAvatar
                          size={"sm"}
                          key={follower.id}
                          url={follower.user.profile.avatar}
                        />
                      </AvatarContainer>
                    ))}
                  <UBold text={String(user.profile.followersCount)} />
                  <UBold text={"FOLLOWERS - done"} />
                </Row>
                <Row onClick={toggleFollowingsModal}>
                  {user.profile.followings &&
                    user.profile.followings.map(following => (
                      <AvatarContainer key={following.id}>
                        <SAvatar
                          size={"sm"}
                          key={following.id}
                          url={following.user.profile.avatar}
                        />
                      </AvatarContainer>
                    ))}
                  <UBold text={String(user.profile.followingCount)} />
                  <UBold text={"FOLLOWINGS - done"} />
                </Row>
              </ColumnContainer>
            </InfoContainer>
          </PBody>
          <GreyLine />
          {/* 
          ////////////// TRIPS //////////////
          */}
          <Title>
            <SBold text={"COFFEES"} />
            {/* <SeeAll onClick={toggleCoffeeSeeAll}>SEE ALL</SeeAll> */}
          </Title>
          <Container>
            {myCoffeeLoading && <Loader />}
            {user.profile.isSelf &&
            requestingCoffees &&
            requestingCoffees.length !== 0 ? (
              <CoffeeGrid requestingCoffees={requestingCoffees} />
            ) : (
              <Icon onClick={toggleRequestModal}>
                <Upload />
              </Icon>
            )}
            <Box>
              {!myCoffeeLoading && coffees ? (
                <CoffeeGrid coffees={coffees} />
              ) : (
                <Loader />
              )}
            </Box>
          </Container>
          <GreyLine />
          <Title>
            <SBold text={"TRIPS"} />
            <SeeAll onClick={toggleTripSeeAll}>SEE ALL</SeeAll>
          </Title>
          <TripContainer>
            {user.profile.isSelf && (
              <TripIcon onClick={addTrip}>
                <Upload />
              </TripIcon>
            )}
            {!getTipsLoading && getTrips ? (
              getTrips.map(trip => (
                <TripRow key={trip.id}>
                  <CityPhoto src={trip.city.cityPhoto} size={"sm"} />
                  <STripText>{trip.city.cityName}</STripText>
                  <TripText>
                    <SFlag
                      countryCode={trip.city.country.countryCode}
                      size={"sm"}
                    />
                    <CountryNameText>
                      {trip.city.country.countryName}
                    </CountryNameText>
                  </TripText>
                  <TripText>{trip.startDate}</TripText>
                  <TripText>{trip.endDate}</TripText>
                  <TripText>
                    {duration(trip.startDate, trip.endDate)}
                    <p> Days</p>
                  </TripText>
                  <TripText>
                    <GetDurationAvatars
                      page={0}
                      cityName={trip.city.cityName}
                      startDate={trip.startDate}
                      endDate={trip.endDate}
                    />
                  </TripText>
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
                </TripRow>
              ))
            ) : (
              <Loader />
            )}
          </TripContainer>
          <GreyLine />
          {/* 
          ////////////// LOCATIONS //////////////
          */}
          <Title>
            <SBold text={"TOP COUNTRIES"} />
          </Title>
          <Container>
            <TripBox>
              {!topCountriesLoading && topCountries ? (
                topCountries.map(topCountry => (
                  <ScrollContainer>
                    <Link
                      to={`/country/${topCountry.city.country.countryName}`}
                    >
                      <CityContainer key={topCountry.id}>
                        <Square>
                          <CityPhoto
                            src={topCountry.city.country.countryPhoto}
                            size={"md"}
                          />
                          <CityName
                            text={topCountry.city.country.countryName}
                          />
                          <Overlay />
                        </Square>
                      </CityContainer>
                    </Link>
                  </ScrollContainer>
                ))
              ) : (
                <Loader />
              )}
            </TripBox>
          </Container>
          <GreyLine />
          <Title>
            <SBold text={"FREQUENT VISITS"} />
          </Title>
          <Container>
            <TripBox>
              {!frequentVisitsLoading && frequentCities ? (
                frequentCities.map(frequentCity => (
                  <ScrollContainer>
                    <Link to={`/city/${frequentCity.city.cityName}`}>
                      <CityContainer key={frequentCity.id}>
                        <Square>
                          <CityPhoto
                            src={frequentCity.city.cityPhoto}
                            size={"md"}
                          />
                          <CityName text={frequentCity.city.cityName} />
                          <CountryName
                            text={frequentCity.city.country.countryName}
                          />
                          <Overlay>
                            <Weather
                              lat={frequentCity.city.lat}
                              lng={frequentCity.city.lng}
                            />
                          </Overlay>
                        </Square>
                      </CityContainer>
                    </Link>
                  </ScrollContainer>
                ))
              ) : (
                <Loader />
              )}
            </TripBox>
          </Container>
          <GreyLine />
          <Title>
            <SBold text={"POSTS"} />
          </Title>
          <CardGrid
            upload={user.profile.isSelf ? true : false}
            cards={user.cards}
            toggleUploadModal={toggleUploadModal}
          />
        </SWrapper>
      </>
    );
  }
  return null;
};

export default UserProfilePresenter;
