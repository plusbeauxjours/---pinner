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
    width: 12px;
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
  margin-top: 150px;
  justify-content: center;
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
  modalOpen: boolean;
  toggleModal: () => void;
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
  modalOpen,
  toggleModal
}) => {
  if (users || nearCities || countries || latestCities) {
    return (
      <>
        {modalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleModal} />
            <Modal>
              <Wrapper>
                {users.map(user => (
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
        <TallWrapper>
          <Title>
            <SBold text={"RECOMMAND USER"} />
            <p onClick={toggleModal}>SEE ALL</p>
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
            <p onClick={toggleModal}>SEE ALL</p>
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
            <p onClick={toggleModal}>SEE ALL</p>
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
            <p onClick={toggleModal}>SEE ALL</p>
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
