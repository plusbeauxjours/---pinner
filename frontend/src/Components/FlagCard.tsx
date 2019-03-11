import React from "react";
import styled from "src/Styles/typed-components";
import { Link } from "react-router-dom";
import Flag from "../Components/Flag";
import Bold from "../Components/Bold";

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
  background-size: cover;
  border-radius: 3px;
  z-index: 1;
`;

const SBold = styled(Bold)`
  z-index: 5;
  align-self: center;
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

const FlagCard: React.SFC<IProps> = ({
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
      {console.log(cityPhoto)}
      <Metric>
        <SFlag
          countryCode={require(`../Images/countryFlag/${countryCode}.svg`)}
          size="sm"
        />
      </Metric>
      <SBold text={cityName} />
      <Counter>
        userCount:
        <SBold text={userCount.toString()} />
      </Counter>
      <Counter>
        userLogCoun:
        <SBold text={userLogCount.toString()} />
      </Counter>
      <Counter>
        cardCount:
        <SBold text={cardCount.toString()} />
      </Counter>
    </SLink>
  );
};
export default FlagCard;
