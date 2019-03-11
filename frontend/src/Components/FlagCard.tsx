import React from "react";
import styled from "src/Styles/typed-components";
import { Link } from "react-router-dom";
import Flag from "../Components/Flag";
import Bold from "../Components/Bold";

const SLink = styled(Link)`
  display: flex;
  flex-direction: column-reverse;
  background-color: white;
  border-radius: 3px;
  border: ${props => props.theme.boxBorder};
`;

const SFlag = styled(Flag)`
  display: flex;
`;

const CityPhoto = styled.img``;

const SBold = styled(Bold)`
  align-self: center;
`;

const Metric = styled.div`
  display: flex;
  align-self: flex-end;
  padding-bottom: 10px;
  padding-right: 30px;
`;

const Counter = styled.span`
  align-self: flex-end;
`;

interface IProps {
  countryName: string;
  countryCode: string;
  cityName: string;
  userCount: number;
  userLogCount: number;
  cardCount: number;
}

const FlagCard: React.SFC<IProps> = ({
  countryName,
  countryCode,
  cityName,
  userCount,
  userLogCount,
  cardCount
}) => {
  return (
    <SLink to={`/city/${cityName}`}>
      <CityPhoto
        src={
          "https://images.unsplash.com/photo-1517164912040-bfe9a44ac04e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjYwNTkwfQ"
        }
      >
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
      </CityPhoto>
    </SLink>
  );
};
export default FlagCard;
