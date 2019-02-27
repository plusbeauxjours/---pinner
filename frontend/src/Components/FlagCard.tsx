import React from "react";
import styled from "src/Styles/typed-components";
import Bold from "./Bold";
import { Link } from "react-router-dom";
import Flag from "../Components/Flag";

const Container = styled.div`
  background-color: white;
  border-radius: 3px;
  border: ${props => props.theme.boxBorder};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
`;

const SFlag = styled(Flag)`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
`;

const SBold = styled(Bold)`
  margin-bottom: 10px;
`;

interface IProps {
  countryname: string;
  countrycode: string;
}

const FlagCard: React.SFC<IProps> = ({ countryname, countrycode }) => {
  return (
    <Container>
      <Link to={`/location/${countryname}`}>
        <SFlag
          countrycode={require(`../Images/countryFlag/${countrycode}.svg`)}
          size="md"
        />
      </Link>
      <SBold text={countryname} />
    </Container>
  );
};
export default FlagCard;
