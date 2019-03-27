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
  height: 250px;
  border-bottom: 1px solid grey;
  padding: 20px;
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

const Modal = styled.div`
  background-color: #2d3a41;
  width: 30%;
  border-radius: 12px;
  z-index: 10;
  animation: ${ModalAnimation} 0.1s linear;
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
      <TallWrapper>
        {modalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleModal} />
            <Modal>
              <ModalLink onClick={toggleModal}>Edit Profile</ModalLink>
            </Modal>
          </ModalContainer>
        )}

        <Container onClick={toggleModal}>
          <p>see all</p>
        </Container>

        <p>recommand user</p>
        <Container>
          {!recommandUsersLoading && users ? (
            <UserGrid users={users} />
          ) : (
            <Loader />
          )}
        </Container>
        <p>near cities</p>
        <Container>
          {!nearCitiesLoading && nearCities ? (
            <LocationGrid cities={nearCities} type={"city"} />
          ) : (
            <Loader />
          )}
        </Container>
        <p>near countries</p>
        <Container>
          {!nearCountriesLoading && countries ? (
            <LocationGrid countries={countries} type={"country"} />
          ) : (
            <Loader />
          )}
        </Container>
        <p>latest cities</p>
        <Container>
          {!latestCitiesLoading && latestCities ? (
            <LocationGrid cities={latestCities} type={"city"} />
          ) : (
            <Loader />
          )}
        </Container>
      </TallWrapper>
    );
  } else {
    return null;
  }
};

export default ExplorePresenter;
