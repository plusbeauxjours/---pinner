import React from "react";
import styled from "../Styles/typed-components";
import { Link } from "react-router-dom";
import Bold from "./Bold";

const LocationPhoto = styled.img`
  margin-bottom: 10px;
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
                <LocationContainer key={city.id}>
                  <Link to={`/city/${city.cityName}`}>
                    <LocationPhoto src={city.cityPhoto} />
                  </Link>
                  <LocationName text={city.cityName} />
                  <CountryName text={city.country.countryName} />
                </LocationContainer>
              ))}
            </>
          );
        case "country":
          return (
            <>
              {countries.map(country => (
                <LocationContainer key={country.id}>
                  <Link to={`/country/${country.countryName}`}>
                    <LocationPhoto src={country.countryPhoto} />
                  </Link>
                  <LocationName text={country.countryName} />
                </LocationContainer>
              ))}
            </>
          );
        case "continent":
          return (
            <>
              {continents.map(continent => (
                <LocationContainer key={continent.id}>
                  <Link to={`/continent/${continent.continentName}`}>
                    <LocationPhoto src={continent.continentPhoto} />
                  </Link>
                  <LocationName text={continent.continentName} />
                </LocationContainer>
              ))}
            </>
          );
        default:
          return <p>hi</p>;
      }
    })()}
  </>
);

export default LocationGrid;
