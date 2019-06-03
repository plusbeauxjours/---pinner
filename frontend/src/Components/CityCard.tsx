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
`;

const CountryName = styled(CityName)`
  font-size: 20px;
  margin-top: 20px;
  pointer-events: none;
`;

interface IProps {
  countryName?: string;
  countryCode: string;
  cityName: string;
  userCount?: number;
  userLogCount?: number;
  cityPhoto: string;
}

const CityCard: React.SFC<IProps> = ({
  countryName,
  countryCode,
  cityName,
  userCount,
  userLogCount,
  cityPhoto
}) => {
  return (
    <SLink to={`/city/${cityName}`}>
      <CityPhoto src={cityPhoto} />
      <Metric>
        <Flag countryCode={countryCode} size="sm" />
      </Metric>
      <CityName text={cityName} />
      <CountryName text={countryName} />
      {/* <Counter>userCount:{userCount.toString()}</Counter>
      <Counter>userLogCoun:{userLogCount.toString()}</Counter>
       */}
    </SLink>
  );
};
export default CityCard;
