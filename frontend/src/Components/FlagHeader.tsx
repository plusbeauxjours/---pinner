import React from "react";
import styled from "styled-components";
// import { Link } from "react-router-dom";
import Flag from "./Flag";

const Header = styled.header`
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  cursor: pointer;
`;

const HeaderColumn = styled.div`
  display: flex;
  margin: 0 15px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Location = styled.span`
  margin-top: 2px;
  display: flex;
  font-size: 12px;
  font-weight: 300;
  color: ${props => props.theme.greyColor};
`;

interface IProps {
  cityName: string;
  countryName?: string;
  countryCode?: string;
}

const FlagHeader: React.SFC<IProps> = ({
  cityName,
  countryName,
  countryCode
}) => (
  <>
    <Header>
      {/* <Link to={`/${countryName}`}> */}
      <HeaderColumn>
        <Flag countryCode={countryCode} size={"sm"} />
        <Location>{cityName}</Location>
      </HeaderColumn>
      {/* </Link> */}
    </Header>
  </>
);

export default FlagHeader;
