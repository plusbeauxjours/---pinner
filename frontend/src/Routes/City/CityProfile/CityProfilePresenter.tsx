import React from "react";
import { Link } from "react-router-dom";
import styled from "../../../Styles/typed-components";

import Wrapper from "../../../Components/Wrapper";
import Loader from "../../../Components/Loader";
import Avatar from "../../../Components/Avatar";
import Bold from "../../../Components/Bold";
import { keyframes } from "styled-components";
import Weather from "src/Components/Weather";
import UserHeader from "../../../Components/UserHeader";
import CityLikeBtn from "../../../Components/CityLikeBtn";
import UserBox from "src/Components/UserBox";
import CoffeeBox from "src/Components/CoffeeBox";
import LocationBox from "src/Components/LocationBox";
import { List } from "../../../Icons";

const SWrapper = styled(Wrapper)`
  z-index: 1;
`;

const PHeader = styled.header`
  display: flex;
  padding: 40px 15px 40px 15px;
  @media screen and (max-width: 700px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const InfoRow = styled.span`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-gap: 10px;
  width: 300px;
  margin-top: 10px;
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

const GreyLine = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom:  1px solid ${props => props.theme.borderColor};
  @media screen and (max-width: 935px) {
    margin: 10px 10px 0 10px;
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
    border-bottom: 1px solid ${props => props.theme.borderColor};
  }
`;

const Modal = styled.div`
  background-color: ${props => props.theme.modalBgColor};
  border: 1px solid ${props => props.theme.borderColor};
  width: 30%;
  border-radius: 12px;
  z-index: 10;
  animation: ${ModalAnimation} 0.1s linear;
`;

const CAvatar = styled(Avatar)`
  border-radius: 3px;
  height: 300px;
  width: 300px;
  margin-right: 20px;
  @media screen and (max-width: 700px) {
    margin-right: 0px;
  }
`;

const UserContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  @media screen and (max-width: 800px) {
    min-width: 300px;
  }
`;

const UserRow = styled.div`
  display: grid;
  flex-direction: row;
  grid-template-columns: 2fr 1fr 1fr;
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

const UserNameRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
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

const Header = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 50px;
  padding-left: 5px;
`;

const HeaderText = styled(Bold)`
  display: flex;
`;

const HeaderColumn = styled.div`
  margin-left: 15px;
`;

const SAvatar = styled(Avatar)`
  border-radius: 3px;
  height: 45px;
  width: 45px;
`;

const Location = styled.span`
  display: flex;
  margin-top: 5px;
  display: block;
  font-size: 12px;
  font-weight: 200;
`;

const LocationName = styled.span`
  font-size: 30px;
  font-weight: 300;
  margin: 5px 10px 5px 0;
  text-transform: uppercase;
`;

const SText = styled(Bold)`
  font-size: 18px;
  font-weight: 100;
  text-transform: uppercase;
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

// const RightIcon = styled.div`
//   position: absolute;
//   display: flex;
//   margin-left: 941px;
//   top: 40%;
//   svg {
//     fill: ${props => props.theme.iconColor};
//   }
// `;

// const LeftIcon = styled.div`
//   position: absolute;
//   display: flex;
//   margin-left: -30px;
//   top: 40%;
//   svg {
//     fill: ${props => props.theme.iconColor};
//   }
// `;

interface IProps {
  coffeeData: any;
  coffeeLoading: boolean;
  cityData?: any;
  cityLoading: boolean;
  nearCitiesData?: any;
  nearCitiesLoading: boolean;
  samenameCitiesData: any;
  samenameCitiesLoading: boolean;
  coffeeReportModalOpen: boolean;
  coffeeRequestModalOpen: boolean;
  toggleCoffeeRequestModal: () => void;
  toggleCoffeeReportModal: () => void;
  isStaying: boolean;
  cityId: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  usersNowList: any;
  submitCoffee: any;
  reportModalOpen: boolean;
  toggleReportModal: () => void;
  slackReportLocations: (targetLocationId: string, payload: string) => void;
}

const CityProfilePresenter: React.FunctionComponent<IProps> = ({
  coffeeData: { getCoffees: { coffees = null } = {} } = {},
  coffeeLoading,
  cityData: {
    cityProfile: { usersNow = null, usersBefore = null, city = null } = {}
  } = {},
  cityLoading,
  nearCitiesData: { nearCities: { cities: nearCities = null } = {} } = {},
  nearCitiesLoading,
  samenameCitiesData: {
    getSamenameCities: { cities: samenameCities = null } = {}
  } = {},
  samenameCitiesLoading,
  coffeeReportModalOpen,
  coffeeRequestModalOpen,
  toggleCoffeeRequestModal,
  toggleCoffeeReportModal,
  isStaying,
  cityId,
  search,
  onChange,
  usersNowList,
  submitCoffee,
  reportModalOpen,
  toggleReportModal,
  slackReportLocations
}) => {
  if (cityLoading) {
    return <Loader />;
  } else if (!cityLoading && city) {
    return (
      <>
        {reportModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleReportModal} />
            <Modal>
              <ModalLink
                onClick={() => slackReportLocations(city.cityId, "PHOTO")}
              >
                Inappropriate Photos
              </ModalLink>
              <ModalLink
                onClick={() => slackReportLocations(city.cityId, "LOCATION")}
              >
                Wrong Location
              </ModalLink>

              <ModalLink
                onClick={() => slackReportLocations(city.cityId, "OTHER")}
              >
                Other
              </ModalLink>
              <ModalLink onClick={toggleReportModal}>Cancel</ModalLink>
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
              <ModalLink onClick={toggleCoffeeReportModal}>Cancel</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        {coffeeRequestModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleCoffeeRequestModal} />
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
              <ModalLink onClick={toggleCoffeeRequestModal}>Cancel</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        <SWrapper>
          {/* <LeftIcon>
            <Link
              to={{
                pathname: `/country/${city.country.countryCode}`,
                state: { countryName: city.country.countryName }
              }}
            >
              <Left />
            </Link>
          </LeftIcon> */}
          {/* <RightIcon>
            <Link
              to={{
                pathname: `/country/${city.country.countryCode}`,
                state: { countryName: city.country.countryName }
              }}
            >
              <Right />
            </Link>
          </RightIcon> */}
          <PHeader>
            <AvatarContainer>
              <CAvatar size="lg" url={city.cityPhoto} city={true} />
              <NameContainer>
                <LocationName>{city.cityName}</LocationName>{" "}
                <ListIcon onClick={toggleReportModal}>
                  <List />
                </ListIcon>
              </NameContainer>
              <InfoRow>
                <Weather latitude={city.latitude} longitude={city.longitude} />
                <CityLikeBtn
                  isLiked={city.isLiked}
                  cityId={city.id}
                  likeCount={city.likeCount}
                  type={"profile"}
                />
              </InfoRow>
              <Link
                to={{
                  pathname: `/country/${city.country.countryCode}`,
                  state: { countryName: city.country.countryName }
                }}
              >
                <Header>
                  <SAvatar
                    size={"sm"}
                    url={city.country.countryPhoto}
                    city={true}
                  />
                  <HeaderColumn>
                    <HeaderText text={city.country.countryName} />
                    <Location>{city.country.continent.continentName}</Location>
                  </HeaderColumn>
                </Header>
              </Link>
            </AvatarContainer>
            <UserContainer>
              <UserNameRow>
                <SText text={city.userCount === 1 ? `USER` : `USERS`} />
                <Input
                  placeholder="Search user who is in this city"
                  onChange={onChange}
                  value={search}
                />
              </UserNameRow>
              {usersNowList.length !== 0 &&
                usersNowList.map(user => (
                  <UserRow key={user.profile.id}>
                    <Link to={`/${user.profile.username}`}>
                      <UserHeader
                        username={user.profile.username}
                        currentCity={user.profile.currentCity.cityName}
                        currentCountry={
                          user.profile.currentCity.country.countryName
                        }
                        avatar={user.profile.avatarUrl}
                        size={"sm"}
                      />
                    </Link>
                  </UserRow>
                ))}
              {usersNowList.length === 0 &&
                !search &&
                usersNow &&
                usersNow.map(user => (
                  <UserRow key={user.profile.id}>
                    <Link to={`/${user.profile.username}`}>
                      <UserHeader
                        username={user.profile.username}
                        currentCity={user.profile.currentCity.cityName}
                        currentCountry={
                          user.profile.currentCity.country.countryName
                        }
                        avatar={user.profile.avatarUrl}
                        size={"sm"}
                      />
                    </Link>
                  </UserRow>
                ))}
            </UserContainer>
          </PHeader>
          {usersBefore && usersBefore.length !== 0 ? (
            <>
              <GreyLine />
              <UserBox
                users={usersBefore}
                currentCityId={cityId}
                type={"usersBefore"}
              />
            </>
          ) : null}
          <CoffeeBox
            coffeeLoading={coffeeLoading}
            currentCityId={cityId}
            toggleCoffeeRequestModal={toggleCoffeeRequestModal}
            coffees={coffees}
            isStaying={isStaying}
          />
          <LocationBox
            nearCities={nearCities}
            cityId={cityId}
            title={"NEAR CITIES"}
            loading={nearCitiesLoading}
          />
          <LocationBox
            samenameCities={samenameCities}
            cityId={cityId}
            title={"SAMENAME CITIES"}
            loading={samenameCitiesLoading}
          />
        </SWrapper>
      </>
    );
  }
  return null;
};

export default CityProfilePresenter;
