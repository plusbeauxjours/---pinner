import React from "react";
import styled from "../../Styles/typed-components";

import Loader from "../../Components/Loader";
import LocationGrid from "../../Components/LocationGrid";
import Wrapper from "../../Components/Wrapper";
import { keyframes } from "styled-components";
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

const SText = styled(Bold)`
  font-size: 20px;
  font-weight: 100;
`;

const ModalOverlay = styled.div`
  z-index: 5;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
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
  latestCitiesData?: any;
  latestCitiesLoading: boolean;

  toggleLatestCitySeeAll: () => void;

  latestCityList: any;

  latestCityModalOpen: boolean;

  toggleLatestCityModal: () => void;
}

const ExplorePresenter: React.SFC<IProps> = ({
  latestCitiesData: { latestCities: { cities: latestCities = null } = {} } = {},
  latestCitiesLoading,

  toggleLatestCitySeeAll,

  latestCityList,

  toggleLatestCityModal,

  latestCityModalOpen
}) => {
  if (latestCities) {
    return (
      <>
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
          <GreyLine />
          <Title>
            <SText text={"LATEST CITIES"} />
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
