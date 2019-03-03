import React from "react";
import styled from "src/Styles/typed-components";
import { Link } from "react-router-dom";
import Flag from "../Components/Flag";

const Container = styled.div`
  background-color: white;
  border-radius: 3px;
  border: ${props => props.theme.boxBorder};
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  padding-bottom: 10px;
  padding-right: 30px;
`;

const SFlag = styled(Flag)`
  display: flex;
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
          size="sm"
        />
      </Link>
    </Container>
  );
};
export default FlagCard;
