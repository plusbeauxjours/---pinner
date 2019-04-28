import React from "react";
import { Link } from "react-router-dom";
import styled from "../../Styles/typed-components";

import Wrapper from "../../Components/Wrapper";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import Bold from "../../Components/Bold";
import LocationGrid from "../../Components/LocationGrid";
import { keyframes } from "styled-components";
import LocationRow from "src/Components/LocationRow";
import AvatarGrid from "../../Components/AvatarGrid";
import GetCards from "../../Components/GetCards";

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

const ContinentName = styled(Bold)`
  position: absolute;
  display: flex;
  z-index: 5;
  font-size: 40px;
  font-family: "Qwigley";
  font-weight: 200;
  pointer-events: none;
`;

const ContinentContainer = styled.div`
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

interface IProps {
  data?: any;
  loading: boolean;
  toggleCitySeeAll: () => void;
  cityList: any;
  cityModalOpen: boolean;
  toggleCityModal: () => void;
  countryName: string;
}

const CountryProfilePresenter: React.SFC<IProps> = ({
  data: {
    countryProfile: {
      cities = null,
      usersNow = null,
      usersBefore = null,
      country = null,
      coffees = null
    } = {}
  } = {},
  loading,
  toggleCitySeeAll,
  cityList,
  cityModalOpen,
  toggleCityModal,
  countryName
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && cities && usersNow && usersBefore && country) {
    return (
      <>
        {cityModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleCityModal} />
            <Modal>
              <Wrapper>
                {cityList.map(list => (
                  <LocationRow
                    key={list.id}
                    id={list.id}
                    cityName={list.cityName}
                    avatar={list.cityPhoto}
                    countryName={list.country.countryName}
                    type={"nearCity"}
                  />
                ))}
              </Wrapper>
            </Modal>
          </ModalContainer>
        )}
        {console.log(cities, usersNow, usersBefore, country)}
        <PHeader>
          <PAvatar size="lg" url={country.countryPhoto} />
          <Username>{country.countryName}</Username>
        </PHeader>
        <SWrapper>
          <PBody>
            <ContinentContainer>
              <Link to={`/continent/${country.continent.continentName}`}>
                <CountryPhoto src={country.continent.continentPhoto} />
              </Link>
              <ContinentName text={country.continent.continentName} />
            </ContinentContainer>
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
                    <SText text={String(country.cityCount)} />
                    VISA for you
                  </InfoRow>
                  <InfoRow>
                    <SText text={String(country.cityCount)} />
                    English Skill
                  </InfoRow>
                  <InfoRow>
                    <SText text={String(country.cityCount)} />
                    GDP
                  </InfoRow>
                  <InfoRow>
                    <SText text={String(country.cityCount)} />
                    Flag
                  </InfoRow>
                </HalfInfo>
                <HalfInfo>
                  <InfoRow>
                    AirLine
                    <SText text={String(country.cityCount)} />
                  </InfoRow>
                  <InfoRow>
                    SNS
                    <SText text={String(country.cityCount)} />
                  </InfoRow>
                  <InfoRow>
                    Capital
                    <SText text={String(country.cityCount)} />
                  </InfoRow>
                  <InfoRow>
                    Potal
                    <SText text={String(country.cityCount)} />
                  </InfoRow>
                </HalfInfo>
              </InfoInlineContainer>
            </InfoContainer>
          </PBody>
          {usersBefore && usersBefore.length !== 0 ? (
            <>
              <SmallTitle>
                <SmallGreyLine />
                <SSText text={"USERS WHO HAVE BEEN HERE"} />
              </SmallTitle>
              <AvatarGrid usersBefore={usersBefore} />
            </>
          ) : null}
          {usersNow && usersNow.length !== 0 ? (
            <>
              <SmallTitle>
                <SmallGreyLine />
                <SSText text={"USERS NOW"} />
              </SmallTitle>
              <AvatarGrid usersNow={usersNow} />
            </>
          ) : null}
          {coffees && coffees.length !== 0 ? (
            <>
              <SmallTitle>
                <SmallGreyLine />
                <SSText text={"COFFEES NOW"} />
              </SmallTitle>
              <AvatarGrid coffees={coffees} />
            </>
          ) : null}
          <GreyLine />
          <Title>
            <SText text={"CITIES"} />
          </Title>
          <Container>
            <Box>
              {!loading && cities ? (
                <LocationGrid cities={cities} type={"city"} />
              ) : (
                <Loader />
              )}
            </Box>
          </Container>
          <GetCards location={"country"} countryName={countryName} />
        </SWrapper>
      </>
    );
  }
  return null;
};

export default CountryProfilePresenter;
