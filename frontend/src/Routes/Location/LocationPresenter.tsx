import React from "react";
import Loader from "src/Components/Loader";
import styled from "src/Styles/typed-components";
import { Link } from "react-router-dom";
import Wrapper from "src/Components/Wrapper";
import { GetCountry } from "../../types/api";

const SWrapper = styled(Wrapper)`
  max-width: 650px;
`;

const Container = styled.div``;

interface IProps {
  data: GetCountry;
  loading: boolean;
  className?: string;
}

const LocationPresenter: React.SFC<IProps> = ({
  data: { getCountry: { country = null } = {} } = {},
  loading,
  className
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && country) {
    console.log(country);
    return (
      <SWrapper>
        <Container className={className}>
          {country.map(index => (
            <Link key={index.id} to={`/location/${index.countryname}`}>
              <p>{index.countryname}</p>
            </Link>
          ))}
        </Container>
      </SWrapper>
    );
  } else {
    return null;
  }
};

export default LocationPresenter;
