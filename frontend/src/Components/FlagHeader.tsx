import React from "react";
import styled from "styled-components";
// import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import Flag from "src/Images/countryFlag/scotland.svg";

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

const FAvatar = styled(Avatar)``;

interface IProps {
  cityname: string;
  countryname: string;
  flag?: string;
}

const FlagHeader: React.SFC<IProps> = ({ cityname, countryname, flag }) => (
  <>
    <Header>
      {/* <Link to={`/${countryname}`}> */}
      <HeaderColumn>
        <FAvatar url={Flag} size="md" />
        <Location>{cityname}</Location>
      </HeaderColumn>
      {/* </Link> */}
    </Header>
  </>
);

export default FlagHeader;
