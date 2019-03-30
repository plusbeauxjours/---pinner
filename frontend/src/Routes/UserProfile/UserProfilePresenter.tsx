import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Gear } from "../../Icons";
import styled, { keyframes } from "../../Styles/typed-components";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";

import {
  UserProfile,
  TopCountries,
  FrequentVisits,
  GetTrips
} from "../../types/api";

import Wrapper from "../../Components/Wrapper";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import Bold from "../../Components/Bold";
import CardGrid from "../../Components/CardGrid";
import FollowBtn from "../../Components/FollowBtn";
import Input from "../../Components/Input";
import LocationRow from "src/Components/LocationRow";

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

const TripRow = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  justify-content: space-between;
  align-items: center;
  background-color: #2d3a41;
  border-radius: 3px;
  border: 1px solid grey;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: grey;
  }
`;

const TripText = styled.div`
  display: flex;
`;

const ScrollContainer = styled.div`
  position: relative;
  display: flex;
`;

const TripBox = styled.div`
  width: 905px;
  display: flex;
  flex-wrap: nowrap;
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

const SeeAll = styled.p`
  font-size: 12px;
  font-weight: 100;
  cursor: pointer;
`;

interface ITheme {
  size: string;
}

interface IProps {
  userProfileData: UserProfile;
  userProfileLoading: boolean;

  topCountriesData?: TopCountries;
  topCountriesLoading: boolean;

  frequentVisitsData?: FrequentVisits;
  frequentVisitsLoading: boolean;

  getTripsData?: GetTrips;
  getTipsLoading: boolean;
  tripList: any;
  topCountriesList: any;
  frequentVisitsList: any;

  modalOpen: boolean;
  confirmModalOpen: boolean;

  tripModalOpen: boolean;
  tripConfirmModalOpen: boolean;
  tripAddModalOpen: boolean;
  tripEditModalOpen: boolean;
  topCountriesModalOpen: boolean;
  frequentVisitsModalOpen: boolean;

  editMode: boolean;
  openEditMode: () => void;

  userName: string;
  bio: string;
  gender: string;
  firstName: string;
  lastName: string;
  cityName: string;

  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  focusedInput: "startDate" | "endDate" | null;
  onDatesChange: (arg: {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }) => void;
  onFocusChange: (arg: "startDate" | "endDate" | null) => void;

  toggleTripSeeAll: () => void;
  toggleTopCountriesSeeAll: () => void;
  toggleFrequentVisitsSeeAll: () => void;
  toggleModal: () => void;
  toggleConfirmModal: () => void;

  toggleTripModal: any;
  toggleTripConfirmModal: () => void;
  toggleAddTripModal: () => void;
  toggleEditTripModal: () => void;
  toggleTopCountriesModal: () => void;
  toggleFrequentVisitsModal: () => void;

  logUserOutFn: () => void;

  confirmDeleteProfile: () => void;
  deleteTrip: () => void;
  addTrip: () => void;
  editTrip: () => void;

  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onKeyUpTrip: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

const UserProfilePresenter: React.SFC<IProps> = ({
  userProfileData: { userProfile: { user = null } = {} },
  userProfileLoading,

  topCountriesData: { topCountries: { footprints: topCountries = null } = {} },
  topCountriesLoading,

  frequentVisitsData: {
    frequentVisits: { footprints: frequentCities = null } = {}
  },
  frequentVisitsLoading,

  getTripsData: { getTrips: { footprints: getTrips = null } = {} } = {},
  getTipsLoading,
  tripList,
  topCountriesList,
  frequentVisitsList,
  modalOpen,
  tripModalOpen,
  confirmModalOpen,
  tripConfirmModalOpen,
  tripAddModalOpen,
  tripEditModalOpen,
  topCountriesModalOpen,
  frequentVisitsModalOpen,
  editMode,
  toggleTripSeeAll,
  toggleTopCountriesSeeAll,
  toggleFrequentVisitsSeeAll,
  toggleModal,
  toggleConfirmModal,
  toggleTripModal,
  toggleTripConfirmModal,
  toggleAddTripModal,
  toggleEditTripModal,
  toggleTopCountriesModal,
  toggleFrequentVisitsModal,
  openEditMode,
  logUserOutFn,
  confirmDeleteProfile,
  deleteTrip,
  addTrip,
  editTrip,
  onInputChange,
  onKeyUp,
  onKeyUpTrip,
  userName,
  bio,
  gender,
  firstName,
  lastName,
  cityName,
  startDate,
  endDate,
  focusedInput,
  onDatesChange,
  onFocusChange
}) => {
  if (userProfileLoading) {
    return <Loader />;
  } else if (user && topCountries && frequentCities) {
    return (
      <>
        {/* 
        ////////////// MODAL //////////////
        */}
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
        {tripModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleTripModal} />
            <Modal>
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
                onKeyUp={onKeyUpTrip}
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
                onKeyUp={onKeyUpTrip}
              />
              {console.log(cityName)}
            </FormModal>
          </FromModalContainer>
        )}
        {topCountriesModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleTopCountriesModal} />
            <Modal>
              <Wrapper>
                {topCountriesList.map(country => (
                  <LocationRow
                    key={country.id}
                    id={country.id}
                    avatar={country.countryPhoto}
                    countryName={country.countryName}
                    type={"topCountries"}
                  />
                ))}
              </Wrapper>
            </Modal>
          </ModalContainer>
        )}
        {frequentVisitsModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleFrequentVisitsModal} />
            <Modal>
              <Wrapper>
                {frequentVisitsList.map(city => (
                  <LocationRow
                    key={city.id}
                    id={city.id}
                    cityName={city.cityName}
                    avatar={city.cityPhoto}
                    countryName={city.country.countryName}
                    type={"frequentVisits"}
                  />
                ))}
              </Wrapper>
            </Modal>
          </ModalContainer>
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
            <Link to={`/${user.username}/footprint`}>
              <GearContainer>
                <Gear />
              </GearContainer>
            </Link>
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
                <Row>
                  <UBold text={String(user.profile.cityCount)} />
                  <UBold text={" CITIES - done"} />
                </Row>
                <Row>
                  <UBold text={String(user.profile.cityCount)} />
                  <UBold text={" COUNTRIES"} />
                </Row>
                <Row>
                  <UBold text={String(user.profile.cityCount)} />
                  <UBold text={" CONTINENT"} />
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
                      <AvatarContainer key={user.id}>
                        <SAvatar
                          size={"sm"}
                          key={user.id}
                          url={follower.user.profile.avatar}
                        />
                      </AvatarContainer>
                    ))}
                  <UBold text={String(user.profile.followersCount)} />
                  <UBold text={"CONTRIES"} />
                </Row>
                <Row>
                  {user.profile.followers &&
                    user.profile.followers.map(follower => (
                      <AvatarContainer key={user.id}>
                        <SAvatar
                          size={"sm"}
                          key={user.id}
                          url={follower.user.profile.avatar}
                        />
                      </AvatarContainer>
                    ))}
                  <UBold text={String(user.profile.followersCount)} />
                  <UBold text={"MATCHINGS"} />
                </Row>
                <Row>
                  {user.profile.followers &&
                    user.profile.followers.map(follower => (
                      <AvatarContainer key={user.id}>
                        <SAvatar
                          size={"sm"}
                          key={user.id}
                          url={follower.user.profile.avatar}
                        />
                      </AvatarContainer>
                    ))}
                  <UBold text={String(user.profile.followersCount)} />
                  <UBold text={"PEOPLE THEY CROSS PATHS WITH MOST"} />
                </Row>
                <Row>
                  {user.profile.followers &&
                    user.profile.followers.map(follower => (
                      <AvatarContainer key={user.id}>
                        <SAvatar
                          size={"sm"}
                          key={user.id}
                          url={follower.user.profile.avatar}
                        />
                      </AvatarContainer>
                    ))}
                  <UBold text={String(user.profile.followersCount)} />
                  <UBold text={"FOLLOWERS - done"} />
                </Row>
                <Row>
                  {user.profile.followings &&
                    user.profile.followings.map(following => (
                      <AvatarContainer key={user.id}>
                        <SAvatar
                          size={"sm"}
                          key={user.id}
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
            <SBold text={"TRIP LOG"} />
            <SeeAll onClick={toggleTripSeeAll}>SEE ALL</SeeAll>
          </Title>
          <TripContainer>
            {console.log(getTrips)}
            {!getTipsLoading && getTrips ? (
              getTrips.map(getTrip => (
                <TripRow
                  key={getTrip.id}
                  onClick={() =>
                    toggleTripModal(getTrip.id, getTrip.city.cityName)
                  }
                >
                  <CityPhoto src={getTrip.city.cityPhoto} size={"sm"} />
                  <TripText>{getTrip.city.cityName}</TripText>
                  <TripText>{getTrip.city.country.countryName}</TripText>
                  <TripText>{getTrip.startDate}</TripText>
                  <TripText>{getTrip.endDate}</TripText>
                </TripRow>
              ))
            ) : (
              <Loader />
            )}
            {console.log(tripList)}
            {!getTipsLoading && tripList ? (
              tripList.map(trip => (
                <TripRow
                  key={trip.id}
                  onClick={() => toggleTripModal(trip.id, trip.city.cityName)}
                >
                  <CityPhoto src={trip.city.cityPhoto} size={"sm"} />
                  <TripText>{trip.city.cityName}</TripText>
                  <TripText>{trip.city.country.countryName}</TripText>
                  <TripText>{trip.startDate}</TripText>
                  <TripText>{trip.endDate}</TripText>
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
            <SeeAll onClick={toggleTopCountriesSeeAll}>SEE ALL</SeeAll>
          </Title>
          <Container>
            <TripBox>
              <ScrollContainer>
                {!topCountriesLoading && topCountries ? (
                  topCountries.map(topCountry => (
                    <CityContainer key={topCountry.id}>
                      <Link
                        to={`/country/${topCountry.city.country.countryName}`}
                      >
                        <CityPhoto
                          src={topCountry.city.country.countryPhoto}
                          size={"md"}
                        />
                      </Link>
                      <CityName text={topCountry.city.country.countryName} />
                    </CityContainer>
                  ))
                ) : (
                  <Loader />
                )}
              </ScrollContainer>
            </TripBox>
          </Container>
          <GreyLine />
          <Title>
            <SBold text={"FREQUENT VISITS"} />
            <SeeAll onClick={toggleFrequentVisitsSeeAll}>SEE ALL</SeeAll>
          </Title>
          <Container>
            <TripBox>
              <ScrollContainer>
                {!frequentVisitsLoading && frequentCities ? (
                  frequentCities.map(frequentCity => (
                    <CityContainer key={frequentCity.id}>
                      <Link to={`/city/${frequentCity.city.cityName}`}>
                        <CityPhoto
                          src={frequentCity.city.cityPhoto}
                          size={"md"}
                        />
                      </Link>
                      <CityName text={frequentCity.city.cityName} />
                      <CountryName
                        text={frequentCity.city.country.countryName}
                      />
                    </CityContainer>
                  ))
                ) : (
                  <Loader />
                )}
              </ScrollContainer>
            </TripBox>
          </Container>
          <GreyLine />
          <Title>
            <SBold text={"POSTS"} />
            <SeeAll onClick={toggleModal}>SEE ALL</SeeAll>
          </Title>
          {user.cards && user.cards.length !== 0 && (
            <CardGrid cards={user.cards} />
          )}
        </SWrapper>
      </>
    );
  }
  return null;
};

export default UserProfilePresenter;
