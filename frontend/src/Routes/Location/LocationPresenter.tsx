import React from "react";
import Loader from "src/Components/Loader";
import styled from "src/Styles/typed-components";
import Wrapper from "src/Components/Wrapper";
import { GetCities } from "../../types/api";
import LocationGrid from "../../Components/LocationGrid";

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

interface IProps {
  data?: GetCities;
  loading: boolean;
}

const LocationPresenter: React.SFC<IProps> = ({
  data: { getCities: { cities = null } = {} } = {},
  loading
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && cities) {
    return (
      <TallWrapper>
        <Container>
          {cities && <LocationGrid cities={cities} type={"city"} />}
        </Container>
      </TallWrapper>
    );
  } else {
    return null;
  }
};

export default LocationPresenter;
