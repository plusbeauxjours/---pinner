import React from "react";
import styled from "../../Styles/typed-components";

import Wrapper from "../../Components/Wrapper";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import Bold from "../../Components/Bold";
import Flag from "../../Components/Flag";
import LocationGrid from "../../Components/LocationGrid";
import LocationRow from "src/Components/LocationRow";
import { keyframes } from "styled-components";
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
  display: flex;
  flex: 1;
  margin-bottom: 10px;
  height: 150px;
  border-radius: 3px;
  border: 1px solid grey;
  padding: 5px;
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

const FlagGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 40px;
  padding: 20px;
`;

const AvatarContainer = styled.div``;

interface IProps {
  data?: any;
  loading: boolean;
  toggleCountrySeeAll: () => void;
  countryList: any;
  countryModalOpen: boolean;
  toggleCountryModal: () => void;
  continentName: string;
}

const ContinentProfilePresenter: React.SFC<IProps> = ({
  data: {
    continentProfile: {
      continent = null,
      countries = null,
      usersNow = null,
      usersBefore = null,
      coffees = null
    } = {}
  } = {},
  loading,
  toggleCountrySeeAll,
  countryList,
  countryModalOpen,
  toggleCountryModal,
  continentName
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && continent && countries) {
    return (
      <>
        {countryModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleCountryModal} />
            <Modal>
              <Wrapper>
                {countryList.map(list => (
                  <LocationRow
                    key={list.id}
                    id={list.id}
                    avatar={list.countryPhoto}
                    countryName={list.countryName}
                    continentName={list.continent.continentName}
                    type={"nearCountry"}
                  />
                ))}
              </Wrapper>
            </Modal>
          </ModalContainer>
        )}
        <PHeader>
          <PAvatar size="lg" url={continent.continentPhoto} />
          <Username>{continent.continentName}</Username>
        </PHeader>
        <SWrapper>
          <PBody>
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
                    <SText text={String(continent.countryCount)} />
                    AQI
                  </InfoRow>
                  <InfoRow>
                    <SText text={String(continent.countryCount)} />
                    TEMPERATURE
                  </InfoRow>
                  <InfoRow>
                    <SText text={String(continent.countryCount)} />
                    DISTANCE
                  </InfoRow>
                </HalfInfo>
                <HalfInfo>
                  <InfoRow>
                    cardCount
                    <SText text={String(continent.countryCount)} />
                  </InfoRow>

                  <InfoRow>
                    userCount
                    <SText text={String(continent.countryCount)} />
                  </InfoRow>

                  <InfoRow>
                    userLogCount
                    <SText text={String(continent.countryCount)} />
                  </InfoRow>
                </HalfInfo>
              </InfoInlineContainer>
            </InfoContainer>
            <FollowContainer>
              COUNTRIES
              <SText text={String(continent.countryCount)} />
              <Follow>
                <FlagGrid>
                  {countries &&
                    countries.map(country => (
                      <AvatarContainer key={country.id}>
                        <Flag size={"sm"} countryCode={country.countryCode} />
                      </AvatarContainer>
                    ))}
                </FlagGrid>
              </Follow>
            </FollowContainer>
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
            <SText text={"COUNTRIES"} />
          </Title>
          <Container>
            <Box>
              {!loading && countries ? (
                <LocationGrid countries={countries} type={"country"} />
              ) : (
                <Loader />
              )}
            </Box>
          </Container>
          <GetCards location={"continent"} continentName={continentName} />
        </SWrapper>
      </>
    );
  }
  return null;
};

export default ContinentProfilePresenter;
