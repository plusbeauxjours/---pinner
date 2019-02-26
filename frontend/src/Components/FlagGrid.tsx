import React from "react";
import styled from "../Styles/typed-components";
import FlagCard from "./FlagCard";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 200px));
  grid-template-rows: 175px;
  grid-auto-rows: 175px;
  grid-gap: 25px;
  margin-bottom: 85px;
`;

interface IProps {
  countries?: any;
  className?: string;
}

const FlagGrid: React.SFC<IProps> = ({ countries, className }) => (
  <Container className={className}>
    {countries.map(country => (
      <FlagCard
        key={country.id}
        countryname={country.countryname}
        countrycode={country.countrycode}
      />
    ))}
  </Container>
);

export default FlagGrid;
