import React from "react";
import {
  NearCities,
  NearCountries,
  RecommandUsers,
  LatestCities
} from "../../types/api";
import styled from "../../Styles/typed-components";

import Loader from "../../Components/Loader";
import UserGrid from "../../Components/UserGrid";
import LocationGrid from "../../Components/LocationGrid";
import Wrapper from "../../Components/Wrapper";
import { keyframes } from "styled-components";
import UserRow from "../../Components/UserRow";
import Bold from "../../Components/Bold";
import LocationRow from "src/Components/LocationRow";

const TallWrapper = styled(Wrapper)`
  height: 50vh;
  text-align: center;
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

const GreyLine = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid grey;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
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

const SBold = styled(Bold)`
  font-size: 20px;
  font-weight: 100;
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
  recommandUsersData?: RecommandUsers;
  recommandUsersLoading: boolean;
  nearCitiesData?: NearCities;
  nearCitiesLoading: boolean;
  nearCountriesData?: NearCountries;
  nearCountriesLoading: boolean;
  latestCitiesData?: LatestCities;
  latestCitiesLoading: boolean;
  toggleRecommandUserSeeAll: () => void;
  toggleNearCitySeeAll: () => void;
  toggleNearCountrySeeAll: () => void;
  toggleLatestCitySeeAll: () => void;
  recommandUserList: any;
  nearCityList: any;
  nearCountryList: any;
  latestCityList: any;
  nearCityModalOpen: boolean;
  nearCountryModalOpen: boolean;
  latestCityModalOpen: boolean;
  recommandUserModalOpen: boolean;
  toggleNearCityModal: () => void;
  toggleNearCountryModal: () => void;
  toggleLatestCityModal: () => void;
  toggleRecommandUserModal: () => void;
}

const ExplorePresenter: React.SFC<IProps> = ({
  recommandUsersData: { recommandUsers: { users = null } = {} } = {},
  recommandUsersLoading,
  nearCitiesData: { nearCities: { cities: nearCities = null } = {} } = {},
  nearCitiesLoading,
  nearCountriesData: { nearCountries: { countries = null } = {} } = {},
  nearCountriesLoading,
  latestCitiesData: { latestCities: { cities: latestCities = null } = {} } = {},
  latestCitiesLoading,
  toggleRecommandUserSeeAll,
  toggleNearCitySeeAll,
  toggleNearCountrySeeAll,
  toggleLatestCitySeeAll,
  recommandUserList,
  nearCityList,
  nearCountryList,
  latestCityList,
  toggleRecommandUserModal,
  toggleNearCityModal,
  toggleNearCountryModal,
  toggleLatestCityModal,
  recommandUserModalOpen,
  nearCityModalOpen,
  nearCountryModalOpen,
  latestCityModalOpen
}) => {
  if (users || nearCities || countries || latestCities) {
    return (
      <>
        {recommandUserModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleRecommandUserModal} />
            <Modal>
              <Wrapper>
                {recommandUserList.map(user => (
                  <UserRow
                    key={user.id}
                    id={user.id}
                    username={user.username}
                    avatar={user.profile.avatar}
                    currentCity={user.profile.currentCity.cityName}
                    currentCountry={
                      user.profile.currentCity.country.countryName
                    }
                    isFollowing={user.profile.isFollowing}
                    size={"sm"}
                  />
                ))}
              </Wrapper>
            </Modal>
          </ModalContainer>
        )}
        {nearCityModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleNearCityModal} />
            <Modal>
              <Wrapper>
                {nearCityList.map(city => (
                  <LocationRow
                    key={city.id}
                    id={city.id}
                    cityName={city.cityName}
                    avatar={city.cityPhoto}
                    countryName={city.country.countryName}
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
                {nearCountryList.map(country => (
                  <LocationRow
                    key={country.id}
                    id={country.id}
                    avatar={country.countryPhoto}
                    countryName={country.countryName}
                    type={"nearCountry"}
                  />
                ))}
              </Wrapper>
            </Modal>
          </ModalContainer>
        )}
        {latestCityModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleLatestCityModal} />
            <Modal>
              <Wrapper>
                {latestCityList.map(city => (
                  <LocationRow
                    key={city.id}
                    id={city.id}
                    cityName={city.cityName}
                    avatar={city.cityPhoto}
                    countryName={city.country.countryName}
                    type={"latestCity"}
                  />
                ))}
              </Wrapper>
            </Modal>
          </ModalContainer>
        )}
        <TallWrapper>
          <Title>
            <SBold text={"RECOMMAND USER"} />
            <SeeAll onClick={toggleRecommandUserSeeAll}>SEE ALL</SeeAll>
          </Title>
          <Container>
            <Box>
              {!recommandUsersLoading && users ? (
                <UserGrid users={users} />
              ) : (
                <Loader />
              )}
            </Box>
          </Container>
          <GreyLine />
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
            <SBold text={"LATEST CITIES"} />
            <SeeAll onClick={toggleLatestCitySeeAll}>SEE ALL</SeeAll>
          </Title>
          <Container>
            <Box>
              {!latestCitiesLoading && latestCities ? (
                <LocationGrid cities={latestCities} type={"city"} />
              ) : (
                <Loader />
              )}
            </Box>
          </Container>
        </TallWrapper>
      </>
    );
  } else {
    return null;
  }
};

export default ExplorePresenter;
