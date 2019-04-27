import React from "react";
import { Link } from "react-router-dom";
import styled from "../../Styles/typed-components";

import Wrapper from "../../Components/Wrapper";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import Bold from "../../Components/Bold";
import CardGrid from "../../Components/CardGrid";
import { keyframes } from "styled-components";
import LocationGrid from "src/Components/LocationGrid";
import Weather from "src/Components/Weather";
import CoffeesGrid from "../../Components/CoffeesGrid";
import AvatarGrid from "../../Components/AvatarGrid";

const SWrapper = styled(Wrapper)`
  z-index: 1;
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
`;

const CityPhoto = styled.img`
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
  height: 100px;
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

const SBold = styled(Bold)`
  font-size: 20px;
  font-weight: 100;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Box = styled.div`
  width: 905px;
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

const WeatherIcon = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

interface IProps {
  cityData?: any;
  cityLoading: boolean;
  nearCitiesData?: any;
  nearCitiesLoading: boolean;
  nearCountriesData?: any;
  nearCountriesLoading: boolean;
  coffeeReportModalOpen: boolean;
  toggleCoffeeReportModal: () => void;
}

const CityProfilePresenter: React.SFC<IProps> = ({
  cityData: {
    cityProfile: {
      cards = null,
      usersNow = null,
      usersBefore = null,
      city = null,
      coffees = null
    } = {}
  } = {},
  cityLoading,
  nearCitiesData: { nearCities: { cities: nearCities = null } = {} } = {},
  nearCitiesLoading,
  nearCountriesData: { nearCountries: { countries = null } = {} } = {},
  nearCountriesLoading,
  coffeeReportModalOpen,
  toggleCoffeeReportModal
}) => {
  if (cityLoading) {
    return <Loader />;
  } else if (!cityLoading && cards && usersNow && usersBefore && city) {
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
        <PHeader>
          <PAvatar size="lg" url={city.cityPhoto} />
          <Username>{city.cityName}</Username>
        </PHeader>
        <SWrapper>
          <PBody>
            <CountryContainer>
              <Link to={`/country/${city.country.countryName}`}>
                <CityPhoto src={city.country.countryPhoto} />
              </Link>
              <CountryName text={city.country.countryName} />
              {console.log(city)}
            </CountryContainer>
            <InfoContainer>
              <Info>
                <Weather lat={city.lat} lng={city.lng} />
              </Info>
              <InfoInlineContainer>
                <HalfInfo>
                  <InfoRow>
                    <SBold text={String(city.userLogCount)} />
                    DISTANCE
                  </InfoRow>
                </HalfInfo>
                <HalfInfo>
                  <InfoRow>
                    <SBold text={String(city.cardCount)} />
                    card - done
                  </InfoRow>
                  <WeatherIcon>
                    {/* <Weather icon={icon} size={"md"} /> */}
                  </WeatherIcon>

                  <InfoRow>
                    TIME DIFFERENCE
                    <SBold text={String(city.userCount)} />
                  </InfoRow>
                </HalfInfo>
              </InfoInlineContainer>
            </InfoContainer>
          </PBody>
          <GreyLine />
          {usersBefore && usersBefore.length !== 0 ? (
            <>
              <Title>
                <SBold text={"USERS WHO HAVE BEEN HERE"} />
              </Title>
              <AvatarGrid usersBefore={usersBefore} />
              <GreyLine />
            </>
          ) : null}
          {usersNow && usersNow.length !== 0 ? (
            <>
              <Title>
                <SBold text={"USERS NOW"} />
              </Title>
              <AvatarGrid usersNow={usersNow} />
              <GreyLine />
            </>
          ) : null}
          {coffees && coffees.length !== 0 ? (
            <>
              <Title>
                <SBold text={"COFFEES NOW"} />
              </Title>
              <CoffeesGrid coffees={coffees} />
              <GreyLine />
            </>
          ) : null}
          <Title>
            <SBold text={"NEAR CITIES"} />
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
          {!cardsLoading && cards && cards.length !== 0 ? (
            <>
              <GreyLine />
              <Title>
                <SBold text={"POSTS"} />
              </Title>
              <CardGrid cards={cards} />
            </>
          ) : (
            <Loader />
          )}
        </SWrapper>
      </>
    );
  }
  return null;
};

export default CityProfilePresenter;
