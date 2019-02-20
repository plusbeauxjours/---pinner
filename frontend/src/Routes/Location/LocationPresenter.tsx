import React from "react";
import Loader from "src/Components/Loader";
import styled from "src/Styles/typed-components";
import { Link } from "react-router-dom";

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
      <Container className={className}>
        {country.map(index => (
          <Link to={`/location/${index.countryname}`}>
            <div key={index.id}>
              <p>{index.countryname}</p>
            </div>
          </Link>
        ))}
        {city.map(index => (
          <Link to={`/location/${index.cityname}`}>
            <div key={index.id}>
              <p>{index.cityname}</p>
            </div>
          </Link>
        ))}
      </Container>
    );
  } else {
    return null;
  }
};

export default LocationPresenter;
