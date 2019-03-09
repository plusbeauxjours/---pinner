import React from "react";
import styled from "src/Styles/typed-components";
import Bold from "./Bold";
import FlagHeader from "./FlagHeader";

const Container = styled.div`
  background-color: white;
  border-radius: 3px;
  border: ${props => props.theme.boxBorder};
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #e6e6e6;
  }
`;

const Header = styled.header`
  padding: 12px;
  margin: 0 15px 0 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 3px;
`;

const MHeader = styled(Header)`
  max-width: 300px;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 3px;
`;

const TimeStamp = styled.span`
  text-transform: uppercase;
  font-size: 10px;
  line-height: 18px;
  display: block;
  color: ${props => props.theme.greyColor};
`;

const SBold = styled(Bold)`
  display: flex;
  align-items: center;
`;

interface IProps {
  className?: any;
  id: string;
  key: string;
  footprint: any;
  toggleModal: () => void;
}
const FootprintRow: React.SFC<IProps> = ({ footprint }) => (
  <Container>
    <Header>
      <SBold text={"Moved"} />
      <TimeStamp>{footprint.createdAt}</TimeStamp>
    </Header>
    <MHeader>
      <FlagHeader
        cityname={footprint.toCity.cityname}
        countrycode={footprint.toCity.country.countrycode}
      />
    </MHeader>
  </Container>
);

export default FootprintRow;
