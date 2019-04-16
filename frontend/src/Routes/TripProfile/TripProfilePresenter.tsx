import React from "react";
import { Link } from "react-router-dom";
import styled from "../../Styles/typed-components";

import Wrapper from "../../Components/Wrapper";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import Bold from "../../Components/Bold";
// import LocationGrid from "../../Components/LocationGrid";
import moment = require("moment");
import CardGrid from "src/Components/CardGrid";
import LocationRow from "src/Components/LocationRow";
import { keyframes } from "styled-components";
import LocationGrid from "src/Components/LocationGrid";

const SWrapper = styled(Wrapper)`
  z-index: 1;
`;

const PHeader = styled.header`
  display: flex;
  flex-direction: column;
  height: 300px;
  align-items: center;
  background: ${props => props.theme.headerColor};
`;

const PAvatar = styled(Avatar)`
  margin: 40px;
`;

const AvatarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 40px;
  padding: 20px;
`;

const AvatarContainer = styled.div``;

const Username = styled.span`
  text-align: center;
  font-size: 22px;
  font-weight: 100;
`;

const PBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0 20px 0;
  justify-content: center;
  background: ${props => props.theme.bgColor};
  border-bottom: 1px solid grey;
  &:not(:last-child) {
    border-bottom: 1px solid grey;
  }
`;

const CountryPhoto = styled.img`
  margin-bottom: 10px;
  display: flex;
  width: 200px;
  height: 200px;
  background-size: cover;
  border-radius: 3px;
  z-index: 1;
  object-fit: cover;
`;

const CountryName = styled(Bold)`
  position: absolute;
  display: flex;
  z-index: 5;
  font-size: 40px;
  font-family: "Qwigley";
  font-weight: 200;
  pointer-events: none;
`;

const CountryContainer = styled.div`
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 300px;
  margin-right: 15px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  margin-bottom: 10px;
  height: 200px;
  border-radius: 3px;
  border: 1px solid grey;
  padding: 5px;
`;

const InfoInlineContainer = styled(InfoContainer)`
  flex-direction: row;
  justify-content: space-between;
`;

const HalfInfo = styled(Info)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 48%;
  height: 100px;
  display: flex;
  margin-bottom: 0;
  padding-bottom: 30px;
`;

const InfoRow = styled.span``;

const FollowContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 400px;
  margin-bottom: 10px;
`;

const Follow = styled.div`
  flex: 1;
  margin-bottom: 10px;
  height: 150px;
  border-radius: 3px;
  border: 1px solid grey;
  padding: 5px;
`;

const SBold = styled(Bold)`
  font-size: 20px;
  font-weight: 200;
`;

const SAvatar = styled(Avatar)`
  margin: 3px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Container = styled.div`
  border-bottom: 4px;
  display: flex;
  align-items: center;
  flex-direction: row;
  -webkit-box-flex: 0;
  flex: 0 0 auto;
  height: 280px;
  padding: 15px;
`;

const Box = styled.div`
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
`;

const ModalOverlay = styled.div`
  z-index: 5;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Modal = styled.div`
  z-index: 10;
  animation: ${ModalAnimation} 0.1s linear;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SeeAll = styled.p`
  font-size: 12px;
  font-weight: 100;
  cursor: pointer;
`;

interface IProps {
  cityName: string;
  cityPhoto: string;
  countryName: string;
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  cardsData: any;
  cardsLoading: boolean;
  usersData: any;
  usersLoading: boolean;
  profileDate: any;
  profileLoading: boolean;
  nearCitiesData?: any;
  nearCitiesLoading: boolean;
  nearCountriesData?: any;
  nearCountriesLoading: boolean;
  toggleNearCitySeeAll: () => void;
  toggleNearCountrySeeAll: () => void;
  nearCityList: any;
  nearCountryList: any;
  nearCityModalOpen: boolean;
  nearCountryModalOpen: boolean;
  toggleNearCityModal: () => void;
  toggleNearCountryModal: () => void;
}

const TripProfilePresenter: React.SFC<IProps> = ({
  cityName,
  cityPhoto,
  countryName,
  startDate,
  endDate,
  cardsData: { getDurationCards: { cards = null } = {} } = {},
  cardsLoading,
  usersData: { getDurationAvatars: { usersBefore = null } = {} } = {},
  usersLoading,
  profileDate: { tripProfile: { usersNow = null, city = null } = {} } = {},
  profileLoading,
  nearCitiesData: { nearCities: { cities: nearCities = null } = {} } = {},
  nearCitiesLoading,
  nearCountriesData: { nearCountries: { countries = null } = {} } = {},
  nearCountriesLoading,
  toggleNearCitySeeAll,
  toggleNearCountrySeeAll,
  nearCityList,
  nearCountryList,
  toggleNearCityModal,
  toggleNearCountryModal,
  nearCityModalOpen,
  nearCountryModalOpen
}) => {
  if (profileLoading) {
    return <Loader />;
  } else if (!profileLoading && !usersLoading && city) {
    return (
      <>
        {nearCityModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleNearCityModal} />
            <Modal>
              <Wrapper>
                {nearCityList.map(nearCity => (
                  <LocationRow
                    key={nearCity.id}
                    id={nearCity.id}
                    cityName={nearCity.cityName}
                    avatar={nearCity.cityPhoto}
                    countryName={nearCity.country.countryName}
                    type={"nearCity"}
                  />
                ))}
              </Wrapper>
            </Modal>
          </ModalContainer>
        )}
        {nearCountryModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleNearCountryModal} />
            <Modal>
              <Wrapper>
                {nearCountryList.map(nearCountry => (
                  <LocationRow
                    key={nearCountry.id}
                    id={nearCountry.id}
                    avatar={nearCountry.countryPhoto}
                    countryName={nearCountry.countryName}
                    continentName={nearCountry.continent.continentName}
                    type={"nearCountry"}
                  />
                ))}
              </Wrapper>
            </Modal>
          </ModalContainer>
        )}
        <PHeader>
          <PAvatar size="lg" url={cityPhoto} />
          <Username>{cityName}</Username>
          <Username>
            From{" "}
            {startDate}{" "}
            To{" "}
            {endDate}
          </Username>
        </PHeader>
        <SWrapper>
          <PBody>
            {!profileLoading && city ? (
              <CountryContainer>
                <Link to={`/country/${countryName}`}>
                  <CountryPhoto src={city.country.countryPhoto} />
                </Link>
                <CountryName text={countryName} />
              </CountryContainer>
            ) : (
              <Loader />
            )}
            <InfoContainer>
              <Info>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with....
              </Info>
              <InfoInlineContainer>
                <HalfInfo>
                  <InfoRow>
                    {/* <SBold text={String(country.cityCount)} /> */}
                    VISA for you
                  </InfoRow>
                  <InfoRow>
                    {/* <SBold text={String(country.cityCount)} /> */}
                    English Skill
                  </InfoRow>
                  <InfoRow>
                    {/* <SBold text={String(country.cityCount)} /> */}
                    GDP
                  </InfoRow>
                  <InfoRow>
                    {/* <SBold text={String(country.cityCount)} /> */}
                    Flag
                  </InfoRow>
                </HalfInfo>
                <HalfInfo>
                  <InfoRow>
                    AirLine
                    {/* <SBold text={String(country.cityCount)} /> */}
                  </InfoRow>
                  <InfoRow>
                    SNS
                    {/* <SBold text={String(country.cityCount)} /> */}
                  </InfoRow>
                  <InfoRow>
                    Capital
                    {/* <SBold text={String(country.cityCount)} /> */}
                  </InfoRow>
                  <InfoRow>
                    Potal
                    {/* <SBold text={String(country.cityCount)} /> */}
                  </InfoRow>
                </HalfInfo>
              </InfoInlineContainer>
            </InfoContainer>
            <FollowContainer>
              <Follow>
                USERS WHO IS HERE
                {/* <SBold text={String(country.cardCount)} /> */}
                <AvatarGrid>
                  {usersNow &&
                    usersNow.map(user => (
                      <AvatarContainer key={user.id}>
                        <Link to={`/${user.username}`}>
                          <SAvatar size={"sm"} url={user.avatar} />
                        </Link>
                      </AvatarContainer>
                    ))}
                  {console.log(usersNow, usersBefore)}
                </AvatarGrid>
              </Follow>
              <Follow>
                USERS WHO HAS BEEN HERE
                {/* <SBold text={String(country.cardCount)} /> */}
                <AvatarGrid>
                  {usersBefore &&
                    usersBefore.map(user => (
                      <AvatarContainer key={user.id}>
                        <Link to={`/${user.actor.profile.username}`}>
                          <SAvatar
                            size={"sm"}
                            url={user.actor.profile.avatar}
                          />
                        </Link>
                      </AvatarContainer>
                    ))}
                </AvatarGrid>
              </Follow>
            </FollowContainer>
          </PBody>
          <Title>
            <SBold text={"NEAR CITIES"} />
            <SeeAll onClick={toggleNearCitySeeAll}>SEE ALL</SeeAll>
          </Title>
          <Container>
            <Box>
              {!nearCitiesLoading && nearCities ? (
                <LocationGrid cities={nearCities} type={"city"} />
              ) : (
                <Loader />
              )}
            </Box>
          </Container>
          <GreyLine />

          <Title>
            <SBold text={"NEAR COUNTRIES"} />
            <SeeAll onClick={toggleNearCountrySeeAll}>SEE ALL</SeeAll>
          </Title>
          <Container>
            <Box>
              {!nearCountriesLoading && countries ? (
                <LocationGrid countries={countries} type={"country"} />
              ) : (
                <Loader />
              )}
            </Box>
          </Container>
          <GreyLine />
          <Title>
            <SBold text={"POSTS"} />
            <SeeAll>SEE ALL</SeeAll>
          </Title>
          {!cardsLoading && cards && cards.length !== 0 ? (
            <CardGrid cards={cards} />
          ) : (
            <Loader />
          )}
        </SWrapper>
      </>
    );
  }
  return null;
};

export default TripProfilePresenter;
