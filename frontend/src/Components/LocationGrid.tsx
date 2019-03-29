import React from "react";
import styled from "../Styles/typed-components";
import { Link } from "react-router-dom";
import Bold from "./Bold";

const ScrollContainer = styled.div`
  position: relative;
  display: flex;
`;

const LocationPhoto = styled.img`
  display: flex;
  width: 200px;
  height: 200px;
  background-size: cover;
  border-radius: 3px;
  z-index: 1;
  object-fit: cover;
  margin-bottom: 25px;
`;

const LocationName = styled(Bold)`
  position: absolute;
  display: flex;
  z-index: 5;
  font-size: 40px;
  font-family: "Qwigley";
  font-weight: 200;
  pointer-events: none;
`;

const CountryName = styled(LocationName)`
  font-size: 20px;
  margin-top: 20px;
  pointer-events: none;
`;

const LocationContainer = styled.div`
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
interface IProps {
  cities?: any;
  countries?: any;
  continents?: any;
  className?: string;
  type: string;
}

const LocationGrid: React.SFC<IProps> = ({
  cities,
  countries,
  continents,
  className,
  type
}) => (
  <>
    {(() => {
      switch (type) {
        case "city":
          return (
            <>
              {cities.map(city => (
                <ScrollContainer key={city.id}>
                  <Link to={`/city/${city.cityName}`}>
                    <LocationContainer>
                      <LocationPhoto src={city.cityPhoto} />
                      <LocationName text={city.cityName} />
                      <CountryName text={city.country.countryName} />
                    </LocationContainer>
                  </Link>
                </ScrollContainer>
              ))}
            </>
          );
        case "country":
          return (
            <>
              {countries.map(country => (
                <ScrollContainer key={country.id}>
                  <Link to={`/country/${country.countryName}`}>
                    <LocationContainer>
                      <LocationPhoto src={country.countryPhoto} />
                      <LocationName text={country.countryName} />
                    </LocationContainer>
                  </Link>
                </ScrollContainer>
              ))}
            </>
          );
        case "continent":
          return (
            <>
              {continents.map(continent => (
                <ScrollContainer key={continent.id}>
                  <Link to={`/continent/${continent.continentName}`}>
                    <LocationContainer>
                      <LocationPhoto src={continent.continentPhoto} />
                      <LocationName text={continent.continentName} />
                    </LocationContainer>
                  </Link>
                </ScrollContainer>
              ))}
            </>
          );
        default:
          return null;
      }
    })()}
  </>
);

export default LocationGrid;
