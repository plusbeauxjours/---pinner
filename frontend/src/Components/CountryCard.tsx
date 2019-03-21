import React from "react";
import styled from "src/Styles/typed-components";
import { Link } from "react-router-dom";
import Flag from "./Flag";
import Bold from "./Bold";

const SLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-image: white;
  border-radius: 3px;
  border: ${props => props.theme.boxBorder};
`;

const CityPhoto = styled.img`
  display: flex;
  position: absolute;
  width: 200px;
  height: 200px;
  background-size: cover;
  border-radius: 3px;
  z-index: 1;
  object-fit: cover;
`;

const Metric = styled.div`
  display: flex;
  z-index: 5;
  align-self: flex-end;
  padding-bottom: 10px;
  padding-right: 23px;
`;

// const Counter = styled.span`
//   z-index: 5;
//   font-size: 20px;
//   font-family: "Qwigley";
//   font-weight: 80;
//   color: white;
// `;

const CityName = styled(Bold)`
  position: absolute;
  display: flex;
  z-index: 5;
  font-size: 40px;
  font-family: "Qwigley";
  font-weight: 200;
  color: white;
  pointer-events: none;
`;

interface IProps {
  countryName: string;
  countryCode: string;
  countryPhoto: string;
  cityCount: number;
  cardCount: number;
}

const CountryCard: React.SFC<IProps> = ({
  countryName,
  countryCode,
  countryPhoto,
  cityCount,
  cardCount
}) => {
  return (
    <SLink to={`/country/${countryName}`}>
      <CityPhoto src={countryPhoto} />
      <Metric>
        <Flag
          countryCode={require(`../Images/countryFlag/${countryCode}.svg`)}
          size="sm"
        />
      </Metric>
      <CityName text={countryName} />
      {/* <Counter>cityCount:{cityCount.toString()}</Counter>
      <Counter>cardCount:{cardCount.toString()}</Counter> */}
    </SLink>
  );
};
export default CountryCard;