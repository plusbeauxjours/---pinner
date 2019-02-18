import React from "react";
import Loader from "src/Components/Loader";
import styled from "src/Styles/typed-components";

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
    const {
      location: { locations = [] }
    } = data;
    return (
      <Container className={className}>
        {locations.map(location => (
          <h1 key={location.id}>{location.city}</h1>
        ))}
      </Container>
    );
  } else {
    return null;
  }
};

export default LocationPresenter;
