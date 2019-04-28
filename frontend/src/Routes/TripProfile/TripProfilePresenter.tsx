import React from "react";
import { Link } from "react-router-dom";
import styled from "../../Styles/typed-components";

import Wrapper from "../../Components/Wrapper";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import Bold from "../../Components/Bold";
import moment = require("moment");
import CardGrid from "src/Components/CardGrid";
import LocationGrid from "src/Components/LocationGrid";
import AvatarGrid from "../../Components/AvatarGrid";

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
  margin-top: 10px;
`;

const SmallTitle = styled(Title)`
  flex-direction: column;
  align-items: center;
`;
const GreyLine = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid grey;
`;
const SmallGreyLine = styled(GreyLine)`
  width: 40%;
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

interface IProps {
  cityName: string;
  cityPhoto: string;
  countryName: string;
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  cardsData: any;
  cardsLoading: boolean;
  profileDate: any;
  profileLoading: boolean;
  nearCitiesData?: any;
  nearCitiesLoading: boolean;
  nearCountriesData?: any;
  nearCountriesLoading: boolean;
}

const TripProfilePresenter: React.SFC<IProps> = ({
  cityName,
  cityPhoto,
  countryName,
  startDate,
  endDate,
  cardsData: { getDurationCards: { cards = null } = {} } = {},
  cardsLoading,
  profileDate: {
    tripProfile: { coffees = null, city = null, usersBefore = null } = {}
  } = {},
  profileLoading,
  nearCitiesData: { nearCities: { cities: nearCities = null } = {} } = {},
  nearCitiesLoading,
  nearCountriesData: { nearCountries: { countries = null } = {} } = {},
  nearCountriesLoading
}) => {
  if (profileLoading) {
    return <Loader />;
  } else if (!profileLoading && city) {
    return (
      <>
        <PHeader>
          <PAvatar size="lg" url={cityPhoto} />
          <Username>{cityName}</Username>
          <Username>
            From {startDate} To {endDate}
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
                    {/* <SText text={String(country.cityCount)} /> */}
                    VISA for you
                  </InfoRow>
                  <InfoRow>
                    {/* <SText text={String(country.cityCount)} /> */}
                    English Skill
                  </InfoRow>
                  <InfoRow>
                    {/* <SText text={String(country.cityCount)} /> */}
                    GDP
                  </InfoRow>
                  <InfoRow>
                    {/* <SText text={String(country.cityCount)} /> */}
                    Flag
                  </InfoRow>
                </HalfInfo>
                <HalfInfo>
                  <InfoRow>
                    AirLine
                    {/* <SText text={String(country.cityCount)} /> */}
                  </InfoRow>
                  <InfoRow>
                    SNS
                    {/* <SText text={String(country.cityCount)} /> */}
                  </InfoRow>
                  <InfoRow>
                    Capital
                    {/* <SText text={String(country.cityCount)} /> */}
                  </InfoRow>
                  <InfoRow>
                    Potal
                    {/* <SText text={String(country.cityCount)} /> */}
                  </InfoRow>
                </HalfInfo>
              </InfoInlineContainer>
            </InfoContainer>
          </PBody>
          {usersBefore && usersBefore.length !== 0 ? (
            <>
              <SmallTitle>
                <SmallGreyLine />
                <SSText text={"USERS AT THAT TIME"} />
              </SmallTitle>
              <AvatarGrid usersBefore={usersBefore} />
            </>
          ) : null}
          {coffees && coffees.length !== 0 ? (
            <>
              <SmallTitle>
                <SmallGreyLine />
                <SSText text={"COFFEES AT THAT TIME"} />
              </SmallTitle>
              <AvatarGrid coffees={coffees} />
            </>
          ) : null}
          <GreyLine />
          <Title>
            <SText text={"NEAR CITIES"} />
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
            <SText text={"NEAR COUNTRIES"} />
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
                <SText text={"POSTS"} />
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

export default TripProfilePresenter;
