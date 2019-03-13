import React from "react";
import Loader from "src/Components/Loader";
import styled from "src/Styles/typed-components";
import Wrapper from "src/Components/Wrapper";
import { GetCities } from "../../types/api";
import CityGrid from "../../Components/CityGrid";

const TallWrapper = styled(Wrapper)`
  height: 50vh;
  text-align: center;
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
    return <TallWrapper>{cities && <CityGrid cities={cities} />}</TallWrapper>;
  } else {
    return null;
  }
};

export default LocationPresenter;
