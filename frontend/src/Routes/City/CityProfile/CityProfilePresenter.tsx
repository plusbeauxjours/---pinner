import React from "react";
import { Link } from "react-router-dom";
import styled from "../../../Styles/typed-components";

import Wrapper from "../../../Components/Wrapper";
import Loader from "../../../Components/Loader";
import Avatar from "../../../Components/Avatar";
import Bold from "../../../Components/Bold";
import { keyframes } from "styled-components";
import Weather from "src/Components/Weather";
import AvatarGrid from "../../../Components/AvatarGrid";
import UserHeader from "../../../Components/UserHeader";
import CityLikeBtn from "../../../Components/CityLikeBtn";
import UserBox from "src/Components/UserBox";

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

const Username = styled.span`
  text-align: center;
  font-size: 22px;
  font-weight: 100;
`;

const InfoRow = styled.span``;

const SText = styled(Bold)`
  font-size: 18px;
  font-weight: 100;
`;

const SSText = styled(Bold)`
  font-size: 12px;
  font-weight: 100;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  @media screen and (max-width: 935px) {
    margin-left: 10px;
  }
`;

const SmallTitle = styled(Title)`
  flex-direction: column;
  align-items: center;
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
    margin: 0 10px 0 10px;
  }
`;

const SmallGreyLine = styled(GreyLine)`
  width: 40%;
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

const LocationRow = styled(UserRow)`
  grid-template-columns: 1fr;
  width: 300px;
  height: 50px;
  margin-top: 15px;
  margin-bottom: 15px;
  border-top: 1px solid grey;
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

const Header = styled.header`
  display: flex;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
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

const Text = styled.p`
  font-weight: 300;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  -webkit-box-flex: 0;
  padding: 15px;
`;

const Box = styled.div`
  max-width: 905px;
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(3, 50px);
  grid-auto-columns: 400px;
  column-gap: 10px;
  overflow-x: auto;
  padding-bottom: 15px;
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
  active?: string;
}

interface IProps {
  cityData?: any;
  cityLoading: boolean;
  nearCitiesData?: any;
  nearCitiesLoading: boolean;

  coffeeReportModalOpen: boolean;
  toggleCoffeeReportModal: () => void;
  cityId: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  usersNowList: any;
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onClick: any;
  onBlur: any;
  usersNowActiveId: number;
}

const CityProfilePresenter: React.SFC<IProps> = ({
  cityData: {
    cityProfile: {
      usersNow = null,
      usersBefore = null,
      city = null,
      coffees = null
    } = {}
  } = {},
  cityLoading,
  nearCitiesData: { nearCities: { cities: nearCities = null } = {} } = {},
  nearCitiesLoading,

  coffeeReportModalOpen,
  toggleCoffeeReportModal,
  cityId,
  search,
  onChange,
  usersNowList,
  onKeyDown,
  onClick,
  onBlur,
  usersNowActiveId
}) => {
  if (cityLoading) {
    return <Loader />;
  } else if (!cityLoading && usersNow && usersBefore && city) {
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
        <SWrapper>
          <PHeader>
            <AvatarContainer>
              <CAvatar size="lg" url={city.cityPhoto} />
              <LocationRow>
                <Link to={`/country/${city.country.countryName}`}>
                  <Header>
                    <SAvatar size={"sm"} url={city.country.countryPhoto} />
                    <HeaderColumn>
                      <HeaderText text={city.country.countryName} />
                      <Location>
                        {city.country.continent.continentName}
                      </Location>
                    </HeaderColumn>
                  </Header>
                </Link>
              </LocationRow>
              <InfoRow>
                <SText text={String(city.userLogCount)} />
                DISTANCE
              </InfoRow>
              <InfoRow>
                <CityLikeBtn
                  isLiked={city.isLiked}
                  cityId={city.id}
                  likeCount={city.likeCount}
                  type={"profile"}
                />
              </InfoRow>
              <Weather latitude={city.latitude} longitude={city.longitude} />
            </AvatarContainer>
            <UserContainer>
              <UserNameRow>
                <Username>{city.cityName}</Username>
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
                          avatar={user.profile.avatar}
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
                          avatar={user.profile.avatar}
                          size={"sm"}
                        />
                      </Link>
                    </UserRow>
                  );
                })}
            </UserContainer>
          </PHeader>
          {coffees && coffees.length !== 0 ? (
            <>
              <SmallTitle>
                <SmallGreyLine />
                <SSText text={"COFFEES NOW"} />
              </SmallTitle>
              <AvatarGrid coffees={coffees} />
            </>
          ) : null}
          {usersBefore && usersBefore.length !== 0 ? (
            <>
              <GreyLine />
              <UserBox users={usersBefore} type={"usersBefore"} />
            </>
          ) : null}

          <GreyLine />
          <Title>
            <SText text={"NEAR CITIES"} />
            <Link to={`/city/${city.cityId}/nearCities`}>
              <SeeAll>SEE ALL</SeeAll>
            </Link>
          </Title>
          <Container>
            <Box>
              {nearCities && !nearCitiesLoading && nearCities.length !== 0 ? (
                nearCities.map(nearCity => (
                  <UserRow key={nearCity.id}>
                    <Link to={`/city/${nearCity.cityId}`}>
                      <Header>
                        <SAvatar size={"sm"} url={nearCity.cityPhoto} />
                        <HeaderColumn>
                          <HeaderText text={nearCity.cityName} />
                          <Location>{nearCity.country.countryName}</Location>
                        </HeaderColumn>
                      </Header>
                    </Link>
                    <CityLikeBtn
                      isLiked={nearCity.isLiked}
                      cityId={nearCity.id}
                      likeCount={nearCity.likeCount}
                      type={"row"}
                    />
                    <Text>{nearCity.distance}km</Text>
                  </UserRow>
                ))
              ) : (
                <Loader />
              )}
            </Box>
          </Container>
        </SWrapper>
      </>
    );
  }
  return null;
};

export default CityProfilePresenter;
