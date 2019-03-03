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
