import React from "react";
import styled from "../Styles/typed-components";
import FlagCard from "./FlagCard";

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

const FlagGrid: React.SFC<IProps> = ({ cities, className }) => (
  <Container className={className}>
    {cities.map(city => (
      <FlagCard
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

export default FlagGrid;
