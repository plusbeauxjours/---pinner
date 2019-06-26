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
import { Right } from "../../../Icons";
import { BACKEND_URL } from 'src/constants';

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
  border-bottom: 1px solid grey;
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

const Modal = styled.div`
  background-color: #2d3a41;
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
  @media screen and (max-width: 600px) {
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

const UserRow = styled.div<ITheme>`
  display: grid;
  flex-direction: row;
  grid-template-columns: 2fr 1fr 1fr;
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

const RightIcon = styled.div`
  position: absolute;
  display: flex;
  margin-left: 941px;
  top: 40%;
  svg {
    fill: white;
  }
`;

// const LeftIcon = styled.div`
//   position: absolute;
//   display: flex;
//   margin-left: -30px;
//   top: 40%;
//   svg {
//     fill: white;
//   }
// `;

interface ITheme {
  active?: string;
}

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
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onClick: any;
  onBlur: any;
  usersNowActiveId: number;
  submitCoffee: any;
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
  onKeyDown,
  onClick,
  onBlur,
  usersNowActiveId,
  submitCoffee
}) => {
  if (cityLoading) {
    return <Loader />;
  } else if (!cityLoading && city) {
    return (
      <>
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
              <ModalLink onClick={toggleCoffeeRequestModal}>CANCEL</ModalLink>
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
          <RightIcon>
            <Link
              to={{
                pathname: `/country/${city.country.countryCode}`,
                state: { countryName: city.country.countryName }
              }}
            >
              <Right />
            </Link>
          </RightIcon>
          <PHeader>
            <AvatarContainer>
              <CAvatar size="lg" url={city.cityPhoto} />
              <LocationName>{city.cityName}</LocationName>
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
                  <SAvatar size={"sm"} url={city.country.countryPhoto} />
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
                  placeholder="Search"
                  onChange={onChange}
                  value={search}
                  onKeyDown={onKeyDown}
                  onClick={onClick}
                  onBlur={onBlur}
                />
              </UserNameRow>
              {usersNowList.length !== 0 &&
                usersNowList.map((user, index) => {
                  let active;
                  if (index === usersNowActiveId) {
                    active = "active";
                  }
                  return (
                    <UserRow key={index} active={active}>
                      <Link to={`/${user.profile.username}`}>
                        <UserHeader
                          username={user.profile.username}
                          currentCity={user.profile.currentCity.cityName}
                          currentCountry={
                            user.profile.currentCity.country.countryName
                          }
                          avatar={`${BACKEND_URL}/media/${
                            user.profile.avatar.thumbnail
                          }`}
                          size={"sm"}
                        />
                      </Link>
                    </UserRow>
                  );
                })}
              {usersNowList.length === 0 &&
                !search &&
                usersNow &&
                usersNow.map((user, index) => {
                  let active;
                  if (index === usersNowActiveId) {
                    active = "active";
                  }
                  return (
                    <UserRow key={index} active={active}>
                      <Link to={`/${user.profile.username}`}>
                        <UserHeader
                          username={user.profile.username}
                          currentCity={user.profile.currentCity.cityName}
                          currentCountry={
                            user.profile.currentCity.country.countryName
                          }
                          avatar={`${BACKEND_URL}/media/${
                            user.profile.avatar.thumbnail
                          }`}
                          size={"sm"}
                        />
                      </Link>
                    </UserRow>
                  );
                })}
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
