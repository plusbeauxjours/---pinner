import React from "react";
import Loader from "src/Components/Loader";
import styled from "src/Styles/typed-components";
import { Link } from "react-router-dom";
import Wrapper from "src/Components/Wrapper";

const SWrapper = styled(Wrapper)`
  max-width: 650px;
`;

const Container = styled.div``;

interface IProps {
  data: any;
  loading: boolean;
  className?: string;
}

const LocationPresenter: React.SFC<IProps> = ({ data, loading, className }) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && data) {
    console.log(data);
    const {
      location: { country = {} },
      location: { city = {} }
    } = data;
    return (
      <SWrapper>
        <Container className={className}>
          {country.map(index => (
            <Link key={index.id} to={`/location/${index.countryname}`}>
              <p>{index.countryname}</p>
            </Link>
          ))}
          {city.map(key => (
            <Link key={key.id} to={`/location/${key.cityname}`}>
              <p>{key.cityname}</p>
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
