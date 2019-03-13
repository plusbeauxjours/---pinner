import React from "react";
import styled from "../Styles/typed-components";
import CityCard from "./CityCard";

const Container = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(200px, 295px));
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
  grid-gap: 25px;
  margin-bottom: 85px;
`;

interface IProps {
  cities?: any;
  className?: string;
}

const CityGrid: React.SFC<IProps> = ({ cities, className }) => (
  <Container className={className}>
    {cities.map(city => (
      <CityCard
        key={city.id}
        countryName={city.country.countryName}
        countryCode={city.country.countryCode}
        cityName={city.cityName}
        userCount={city.userCount}
        userLogCount={city.userLogCount}
        cardCount={city.cardCount}
        cityPhoto={city.cityPhoto}
      />
    ))}
  </Container>
);

export default CityGrid;
