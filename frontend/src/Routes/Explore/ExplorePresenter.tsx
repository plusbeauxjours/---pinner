import { Link } from "react-router-dom";
import React from "react";
import { NearCities, NearCountries, RecommandUsers } from "../../types/api";
import styled from "../../Styles/typed-components";

import Loader from "../../Components/Loader";
import Wrapper from "../../Components/Wrapper";
import Bold from "../../Components/Bold";
import UserGrid from "../../Components/UserGrid";

const Container = styled.div`
  border-bottom: 4px;
  display: flex;
  align-items: center;
  flex-direction: row;
  -webkit-box-flex: 0;
  flex: 0 0 auto;
  height: 250px;
  border-bottom: 1px solid grey;
  padding: 20px;
`;

const CityContainer = styled.div`
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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

interface IProps {
  recommandUsersData?: RecommandUsers;
  nearCitiesData?: NearCities;
  nearCountriesData?: NearCountries;
  loading: boolean;
}

const ExplorePresenter: React.SFC<IProps> = ({
  recommandUsersData: { recommandUsers: { users = null } = {} } = {},
  nearCitiesData: { nearCities: { cities = null } = {} } = {},
  nearCountriesData: { nearCountries: { countries = null } = {} } = {},
  loading
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && users) {
    return (
      <Wrapper>
        <Link to="/explore/userlist">
          <p>see all</p>
        </Link>
        <p>recommand user</p>
        <Container>{users && <UserGrid users={users} />}</Container>
        <p>near cities</p>
        <Container>
          {cities &&
            cities.map(city => (
              <CityContainer>
                <Link to={`/city/${city.cityName}`}>
                  <CityPhoto src={city.cityPhoto} />
                </Link>
                <CityName text={city.cityName} />
                <CountryName text={city.country.countryName} />
              </CityContainer>
            ))}
        </Container>
        <p>near countries</p>
        <Container>
          {console.log(countries)}
          {countries &&
            countries.map(country => (
              <CityContainer>
                <Link to={`/country/${country.countryName}`}>
                  <CityPhoto src={country.countryPhoto} />
                </Link>
                <CityName text={country.countryName} />
              </CityContainer>
            ))}
        </Container>
      </Wrapper>
    );
  } else {
    return null;
  }
};

export default ExplorePresenter;
