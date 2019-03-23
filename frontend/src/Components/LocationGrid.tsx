import React from "react";
import styled from "../Styles/typed-components";
import { Link } from "react-router-dom";
import Bold from "./Bold";

const CityPhoto = styled.img`
  margin-bottom: 10px;
  display: flex;
  width: 200px;
  height: 200px;
  background-size: cover;
  border-radius: 3px;
  z-index: 1;
  object-fit: cover;
`;

const CityName = styled(Bold)`
  position: absolute;
  display: flex;
  z-index: 5;
  font-size: 40px;
  font-family: "Qwigley";
  font-weight: 200;
  pointer-events: none;
`;

const CountryName = styled(CityName)`
  font-size: 20px;
  margin-top: 20px;
  pointer-events: none;
`;

const CityContainer = styled.div`
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
                <CityContainer>
                  <Link to={`/city/${city.cityName}`}>
                    <CityPhoto key={city.id} src={city.cityPhoto} />
                  </Link>

                  <CityName text={city.cityName} />
                  <CountryName text={city.country.countryName} />
                </CityContainer>
              ))}
            </>
          );
        case "country":
          return (
            <>
              {countries.map(country => (
                <CityContainer>
                  <Link to={`/country/${country.countryName}`}>
                    <CityPhoto key={country.id} src={country.countryPhoto} />
                  </Link>

                  <CityName text={country.countryName} />
                </CityContainer>
              ))}
            </>
          );
        case "continent":
          return (
            <>
              {continents.map(continent => (
                <CityContainer>
                  <Link to={`/continent/${continent.continentName}`}>
                    <CityPhoto
                      key={continent.id}
                      src={continent.continentPhoto}
                    />
                  </Link>

                  <CityName text={continent.continentName} />
                </CityContainer>
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
