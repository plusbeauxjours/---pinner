import React from "react";
import styled from "../Styles/typed-components";
import { Link } from "react-router-dom";
import Bold from "./Bold";
import Weather from "src/Components/Weather";

const ScrollContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  margin: 0 15px 25px 0;
`;

const Square = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-position: cover;
  background-size: 100%;
`;

const Overlay = styled.div`
  color: white;
  z-index: 1;
  opacity: 0;
  display: flex;
  position: absolute;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  svg {
    fill: white;
  }
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 1;
  }
`;

const LocationPhoto = styled.img`
  display: flex;
  width: 200px;
  height: 200px;
  background-size: cover;
  border-radius: 3px;
  z-index: 1;
  object-fit: cover;
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
                      <Square>
                        <LocationPhoto src={city.cityPhoto} />
                        <LocationName text={city.cityName} />
                        <CountryName text={city.country.countryName} />
                        <Overlay>
                          <Weather latitude={city.latitude} longitude={city.longitude} />
                        </Overlay>
                      </Square>
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
                      <Square>
                        <LocationPhoto src={country.countryPhoto} />
                        <LocationName text={country.countryName} />
                        <Overlay />
                      </Square>
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
                      <Square>
                        <LocationPhoto src={continent.continentPhoto} />
                        <LocationName text={continent.continentName} />
                        <Overlay />
                      </Square>
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
