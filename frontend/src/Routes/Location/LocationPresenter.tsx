import React from "react";
import Loader from "src/Components/Loader";
import styled from "src/Styles/typed-components";
import Wrapper from "src/Components/Wrapper";
import { GetCountries } from "../../types/api";
import FlagGrid from "../../Components/FlagGrid";

const TallWrapper = styled(Wrapper)`
  height: 50vh;
  text-align: center;
`;

interface IProps {
  data?: GetCountries;
  loading: boolean;
}

const LocationPresenter: React.SFC<IProps> = ({
  data: { getCountries: { countries = null } = {} } = {},
  loading
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && countries) {
    return (
      <TallWrapper>
        {countries && <FlagGrid countries={countries} />}
      </TallWrapper>
    );
  } else {
    return null;
  }
};

export default LocationPresenter;
