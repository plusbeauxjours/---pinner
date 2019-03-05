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

const SBold = styled(Bold)`
  display: flex;
  align-self: center;
`;

const Metric = styled.div`
  display: flex;
  align-self: flex-end;
  padding-bottom: 10px;
  padding-right: 30px;
`;

interface IProps {
  countryname: string;
  countrycode: string;
  cityname: string;
}

const FlagCard: React.SFC<IProps> = ({
  countryname,
  countrycode,
  cityname
}) => {
  return (
    <SLink to={`/city/${cityname}`}>
      <Metric>
        <SFlag
          countrycode={require(`../Images/countryFlag/${countrycode}.svg`)}
          size="sm"
        />
      </Metric>
      <SBold text={cityname} />
    </SLink>
  );
};
export default FlagCard;
