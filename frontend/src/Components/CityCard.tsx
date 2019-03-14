import React from "react";
import styled from "src/Styles/typed-components";
import { Link } from "react-router-dom";
import Flag from "./Flag";
import Bold from "./Bold";

const SLink = styled(Link)`
  display: flex;
  flex-direction: column-reverse;
  background-image: white;
  border-radius: 3px;
  border: ${props => props.theme.boxBorder};
`;

const SFlag = styled(Flag)`
  display: flex;
`;

const CityPhoto = styled.img`
  display: flex;
  position: absolute;
  width: 295px;
  height: 200px;
  overflow: hidden;
  background-size: cover;
  border-radius: 3px;
  z-index: 1;
`;

const CityName = styled(Bold)`
  display: flex;
  z-index: 5;
  font-size: 40px;
  font-family: "Qwigley";
  font-weight: 200;
  color: white;
`;

const Metric = styled.div`
  display: flex;
  z-index: 5;
  align-self: flex-end;
  padding-bottom: 10px;
  padding-right: 30px;
`;

const Counter = styled.span`
  z-index: 5;
  align-self: flex-end;
  font-size: 20px;
  font-family: "Qwigley";
  font-weight: 80;
  color: white;
`;

const CityNameContainer = styled.span`
  z-index: 5;
  display: flex;
  position: absolute;
  align-items: center;
`;

interface IProps {
  countryName: string;
  countryCode: string;
  cityName: string;
  userCount: number;
  userLogCount: number;
  cardCount: number;
  cityPhoto: string;
}

const CityCard: React.SFC<IProps> = ({
  countryName,
  countryCode,
  cityName,
  userCount,
  userLogCount,
  cardCount,
  cityPhoto
}) => {
  return (
    <SLink to={`/city/${cityName}`}>
      <CityPhoto src={cityPhoto} />
      <Metric>
        <SFlag
          countryCode={require(`../Images/countryFlag/${countryCode}.svg`)}
          size="sm"
        />
      </Metric>
      <CityNameContainer>
        <CityName text={cityName} />
      </CityNameContainer>
      <Counter>userCount:{userCount.toString()}</Counter>
      <Counter>userLogCoun:{userLogCount.toString()}</Counter>
      <Counter>cardCount:{cardCount.toString()}</Counter>
    </SLink>
  );
};
export default CityCard;
