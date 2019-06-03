import React from "react";
import styled from "../Styles/typed-components";
import CountryCard from "./CountryCard";

const Container = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(200px, 200px));
  grid-auto-rows: 200px;
  grid-gap: 15px;
  margin-bottom: 85px;
`;

interface IProps {
  countries?: any;
  className?: string;
}

const CountryGrid: React.SFC<IProps> = ({ countries, className }) => (
  <Container className={className}>
    {countries.map(country => (
      <CountryCard
        key={country.id}
        countryName={country.countryName}
        countryCode={country.countryCode}
        countryPhoto={country.countryPhoto}
        cityCount={country.cityCount}
      />
    ))}
  </Container>
);

export default CountryGrid;
