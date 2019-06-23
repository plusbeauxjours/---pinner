import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { List } from "../../../Icons";
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
    fill: white;
    transition: fill 0.2s ease-in-out;
    &:hover {
      fill: grey;
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
  }
`;

const SText = styled(Bold)`
  font-size: 18px;
  font-weight: 100;
`;

const TripContainer = styled.div`
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
    fill: white;
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
  grid-template-columns: 3fr 1fr 1fr 1fr 0.2fr;
  padding: 0 5px 0 5px;
  grid-gap: 15px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  background-color: ${props => (props.active ? "grey" : null)};
  &:hover {
    background-color: grey;
  }
  &:hover {
    ${TripOverlay} {
      opacity: 1;
    }
  }
  &:not(:last-child) {
    border-bottom: 1px solid grey;
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
  font-size: 12px;
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
    border-bottom: 1px solid #efefef;
  }
`;

const TripInputContainer = styled.div`
  z-index: 10;
  top: 30%;
  width: 30%;
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
  margin-top: 20px;
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
  font-size: 12px;
  &::placeholder {
    color: ${props => props.theme.greyColor};
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
  background-color: ${props => (props.active ? "grey" : null)};
  &:hover {
    background-color: grey;
  }
  &:not(:last-child) {
    border-bottom: 1px solid grey;
  }
`;

interface ITheme {
  size?: string;
  active?: string;
}

interface IProps {
  userProfileData: any;
  userProfileLoading: boolean;

  getTripsData?: any;
  getTipsLoading: boolean;

  coffeeData?: any;
  coffeeLoading: boolean;

  modalOpen: boolean;

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

  toggleTripModal: any;
  toggleTripConfirmModal: () => void;
  toggleAddTripModal: () => void;
  toggleEditTripModal: () => void;

  toggleRequestModal: () => void;
  toggleProfileFormModal: () => void;
  avatarModalOpen: boolean;
  toggleAvatarModalOpen: () => void;

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

  onKeyDownSearch: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onKeyDownTrip: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onClickSearch: (cityId: string, cityName: string) => void;
  onClick: any;
  onBlur: any;
  tripActiveId: number;
  searchActiveId: number;
  createCityLoading: boolean;
}

const UserProfilePresenter: React.SFC<IProps> = ({
  userProfileData: { userProfile: { user = null } = {} } = {},
  userProfileLoading,

  getTripsData: { getTrips: { trip: getTrips = null } = {} } = {},
  getTipsLoading,

  coffeeData: { getCoffees: { coffees = null } = {} } = {},
  coffeeLoading,

  modalOpen,
  tripModalOpen,
  tripConfirmModalOpen,
  tripAddModalOpen,
  tripEditModalOpen,

  requestModalOpen,

  toggleModal,
  toggleTripModal,
  toggleTripConfirmModal,
  toggleAddTripModal,
  toggleEditTripModal,

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

  onKeyDownSearch,
  onKeyDownTrip,
  onClickSearch,
  onClick,
  onBlur,
  tripActiveId,
  searchActiveId,
  createCityLoading,
  avatarModalOpen,
  toggleAvatarModalOpen
}) => {
  const { results, isLoading } = useGoogleAutocomplete({
    apiKey: `${GOOGLE_PLACE_KEY}`,
    query: tripCitySearch,
    options: {
      types: "(cities)",
      language: "en"
    }
  });
  if (userProfileLoading) {
    return <Loader />;
  } else if (user && coffees) {
    return (
      <>
        {avatarModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleAvatarModalOpen} />
            <Modal />
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
              <ModalLink onClick={toggleRequestModal}>CANCEL</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        {modalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleModal} />
            <Modal>
              <ModalLink onClick={() => console.log("Edit Avatar")}>
                Edit Avatar
              </ModalLink>
              <ModalLink onClick={() => console.log("Edit Profile")}>
                Edit Profile
              </ModalLink>
              <ModalLink onClick={() => console.log("Settings")}>
                Settings
              </ModalLink>
              <ModalLink onClick={() => console.log("Delete Profile")}>
                Delete Profile
              </ModalLink>
              <ModalLink onClick={() => console.log("Log Out")}>
                Log Out
              </ModalLink>
              <ModalLink onClick={toggleModal}>CANCEL</ModalLink>
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
                onKeyDown={onKeyDownSearch}
              />
              <TripModal>
                {createCityLoading || (isLoading && <Loader />)}
                {tripCitySearch.length > 0 &&
                  results.predictions &&
                  !createCityLoading &&
                  !isLoading &&
                  results.predictions.length > 0 &&
                  results.predictions.map((prediction, index) => {
                    let active;
                    if (index === searchActiveId) {
                      active = "active";
                    }
                    return (
                      <UserRow
                        key={index}
                        onClick={() =>
                          onClickSearch(
                            prediction.place_id,
                            prediction.structured_formatting.main_text
                          )
                        }
                        active={active}
                      >
                        <TripSearchHeader>
                          <SAvatar size={"sm"} cityId={prediction.place_id} />
                          <HeaderColumn>
                            <HeaderText
                              text={prediction.structured_formatting.main_text}
                            />
                            <Location>
                              {prediction.structured_formatting.secondary_text
                                ? prediction.structured_formatting
                                    .secondary_text
                                : prediction.structured_formatting.main_text}
                            </Location>
                          </HeaderColumn>
                        </TripSearchHeader>
                      </UserRow>
                    );
                  })}
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
                onKeyDown={onKeyDownSearch}
              />
              <TripModal>
                {createCityLoading || (isLoading && <Loader />)}
                {tripCitySearch.length > 0 &&
                  results.predictions &&
                  !createCityLoading &&
                  !isLoading &&
                  results.predictions.length > 0 &&
                  results.predictions.map((prediction, index) => {
                    let active;
                    if (index === searchActiveId) {
                      active = "active";
                    }
                    return (
                      <UserRow
                        key={index}
                        onClick={() =>
                          onClickSearch(
                            prediction.place_id,
                            prediction.structured_formatting.main_text
                          )
                        }
                        active={active}
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
                                ? prediction.structured_formatting
                                    .secondary_text
                                : prediction.structured_formatting.main_text}
                            </Location>
                          </HeaderColumn>
                        </TripSearchHeader>
                      </UserRow>
                    );
                  })}
              </TripModal>
            </TripInputContainer>
          </TripModalContainer>
        )}

        {/* 
        ////////////// HEADER //////////////
        */}
        <Header>
          <AvatarContainer onClick={toggleAvatarModalOpen}>
            <PAvatar size="lg" url={user.profile.avatar} />
          </AvatarContainer>
          <NameContainer>
            <Username>{user.username}</Username>
            {user.profile.isSelf ? (
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
              <Link to={`/city/${user.profile.currentCity.cityId}`}>
                <CAvatar size="lg" url={user.profile.currentCity.cityPhoto} />
              </Link>

              <Bio>{`${user.profile.bio}`}</Bio>
              <Row>
                <UBold text={String(user.profile.postCount)} />
                <UBold text={" how many KM"} />
              </Row>
              <Row>
                <UBold text={String(user.profile.tripCount)} />
                <UBold text={" how many TRIPS - done"} />
              </Row>
              <Row>
                <Link to={`/${username}/coffees`}>
                  <UBold text={String(user.profile.tripCount)} />
                  <UBold text={" how many COFFEES - done"} />
                </Link>
              </Row>
              <Row>
                <Link to={`/${username}/cities`}>
                  <UBold text={String(user.profile.cityCount)} />
                  <UBold text={" how many CITIES - done"} />
                </Link>
              </Row>
              <Row>
                <Link to={`/${username}/countries`}>
                  <UBold text={String(user.profile.countryCount)} />
                  <UBold text={" how many COUNTRIES - done"} />
                </Link>
              </Row>
              <Row>
                <UBold text={String(user.profile.continentCount)} />
                <UBold text={" how many  CONTINENT - done"} />
              </Row>
              {user.profile.gender ? (
                <Row>
                  <UBold text={String(user.profile.gender)} />
                  <UBold text={" gender - done"} />
                </Row>
              ) : null}
              {user.profile.nationality ? (
                <Row>
                  <Link to={`/country/${user.profile.nationality.countryCode}`}>
                    <UBold
                      text={String(user.profile.nationality.countryEmoji)}
                    />
                    <UBold text={" nationality - done"} />
                  </Link>
                </Row>
              ) : null}
              {user.profile.residence ? (
                <Row>
                  <Link to={`/country/${user.profile.residence.countryCode}`}>
                    <UBold text={String(user.profile.residence.countryEmoji)} />
                    <UBold text={" residence - done"} />
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
            <TripContainer>
              <UserNameRow>
                <SText text={"TRIPS"} />
                <TripInput
                  placeholder="Search"
                  value={search}
                  onChange={onChange}
                  onKeyDown={onKeyDownTrip}
                  onClick={onClick}
                  onBlur={onBlur}
                />
              </UserNameRow>
              {user.profile.isSelf && (
                <TripIcon onClick={toggleAddTripModal}>
                  <Upload />
                </TripIcon>
              )}
              {tripList.length !== 0 &&
                tripList.map((trip, index) => {
                  let active;
                  if (index === tripActiveId) {
                    active = "active";
                  }
                  return (
                    <TripRow key={trip.id} active={active}>
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
                        <SAvatar size={"sm"} url={trip.city.cityPhoto} />
                        <HeaderColumn>
                          <HeaderText text={trip.city.cityName} />
                          <Location>{trip.city.country.countryName}</Location>
                        </HeaderColumn>
                      </THeader>
                      <GreyText text={trip.startDate} />
                      <GreyText text={trip.endDate} />
                      <GreyText text={`${trip.diffDays} Days`} />
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
                  );
                })}
              {tripList.length === 0 &&
                !search &&
                getTrips &&
                getTrips.map((trip, index) => {
                  let active;
                  if (index === tripActiveId) {
                    active = "active";
                  }
                  return (
                    <TripRow key={trip.id} active={active}>
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
                        <SAvatar size={"sm"} url={trip.city.cityPhoto} />
                        <HeaderColumn>
                          <HeaderText text={trip.city.cityName} />
                          <Location>{trip.city.country.countryName}</Location>
                        </HeaderColumn>
                      </THeader>
                      <GreyText text={trip.startDate} />
                      <GreyText text={trip.endDate} />
                      <GreyText text={`${trip.diffDays} Days`} />
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
                  );
                })}
            </TripContainer>
          </PHeader>
        </SWrapper>
      </>
    );
  }
  return null
};

export default UserProfilePresenter;
