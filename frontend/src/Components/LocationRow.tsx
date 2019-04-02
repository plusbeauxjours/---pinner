import React from "react";
import styled from "src/Styles/typed-components";
import { Link } from "react-router-dom";
import Bold from "./Bold";
import Avatar from "./Avatar";

const Container = styled.div`
  background-color: #2d3a41;
  width: 100%;
  border-radius: 3px;
  border: ${props => props.theme.boxBorder};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  padding: 10px;
  align-items: center;
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
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
`;

const HeaderColumn = styled.div`
  margin-left: 15px;
`;

const Location = styled.span`
  display: flex;
  margin-top: 5px;
  display: block;
  font-size: 12px;
  font-weight: 200;
`;

const SAvatar = styled(Avatar)`
  border-radius: 3px;
`;

const SBold = styled(Bold)`
  display: flex;
`;

interface IProps {
  id: string;
  avatar: string;
  cityName?: string;
  countryName?: string;
  continentName?: string;
  type: string;
}

const LocationRow: React.SFC<IProps> = ({
  id,
  avatar,
  cityName,
  countryName,
  continentName,
  type
}) => (
  <>
    {(() => {
      switch (type) {
        case "nearCity":
          return (
            <>
              <Link to={`/city/${cityName}`}>
                <Container>
                  <Header>
                    <SAvatar size={"sm"} url={avatar} />
                    <HeaderColumn>
                      <SBold text={cityName} />
                      <Location>{countryName}</Location>
                    </HeaderColumn>
                  </Header>
                </Container>
              </Link>
            </>
          );
        case "nearCountry":
          return (
            <>
              <Link to={`/country/${countryName}`}>
                <Container>
                  <Header>
                    <SAvatar size={"sm"} url={avatar} />
                    <HeaderColumn>
                      <SBold text={countryName} />
                      <Location>{continentName}</Location>
                    </HeaderColumn>
                  </Header>
                </Container>
              </Link>
            </>
          );
        case "latestCity":
          return (
            <>
              <Container>
                <Link to={`/city/${cityName}`}>
                  <Header>
                    <SAvatar size={"sm"} url={avatar} />
                    <HeaderColumn>
                      <SBold text={cityName} />
                      <Location>{countryName}</Location>
                    </HeaderColumn>
                  </Header>
                </Link>
              </Container>
            </>
          );
        case "topCountries":
          return (
            <>
              <Link to={`/country/${countryName}`}>
                <Container>
                  <Header>
                    <SAvatar size={"sm"} url={avatar} />
                    <HeaderColumn>
                      <SBold text={countryName} />
                      <Location>{continentName}</Location>
                    </HeaderColumn>
                  </Header>
                </Container>
              </Link>
            </>
          );
        case "frequentVisits":
          return (
            <>
              <Link to={`/city/${cityName}`}>
                <Container>
                  <Header>
                    <SAvatar size={"sm"} url={avatar} />
                    <HeaderColumn>
                      <SBold text={cityName} />
                      <Location>{countryName}</Location>
                    </HeaderColumn>
                  </Header>
                </Container>
              </Link>
            </>
          );
        case "getCities":
          return (
            <>
              <Link to={`/city/${cityName}`}>
                <Container>
                  <Header>
                    <SAvatar size={"sm"} url={avatar} />
                    <HeaderColumn>
                      <SBold text={cityName} />
                      <Location>{countryName}</Location>
                    </HeaderColumn>
                  </Header>
                </Container>
              </Link>
            </>
          );
        case "getCountries":
          return (
            <>
              <Link to={`/country/${countryName}`}>
                <Container>
                  <Header>
                    <SAvatar size={"sm"} url={avatar} />
                    <HeaderColumn>
                      <SBold text={countryName} />
                      <Location>{continentName}</Location>
                    </HeaderColumn>
                  </Header>
                </Container>
              </Link>
            </>
          );
        case "getContinent":
          return (
            <>
              <Link to={`/continent/${continentName}`}>
                <Container>
                  <Header>
                    <SAvatar size={"sm"} url={avatar} />
                    <HeaderColumn>
                      <SBold text={continentName} />
                    </HeaderColumn>
                  </Header>
                </Container>
              </Link>
            </>
          );
        default:
          return null;
      }
    })()}
  </>
);
export default LocationRow;