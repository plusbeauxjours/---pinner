import { Link } from "react-router-dom";
import React from "react";
import { NearCities, NearCountries, RecommandUsers } from "../../types/api";
import styled from "../../Styles/typed-components";

import Loader from "../../Components/Loader";
import UserGrid from "../../Components/UserGrid";
import LocationGrid from "../../Components/LocationGrid";
import Wrapper from "../../Components/Wrapper";

const TallWrapper = styled(Wrapper)`
  height: 50vh;
  text-align: center;
`;

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

interface IProps {
  recommandUsersData?: RecommandUsers;
  nearCitiesData?: NearCities;
  nearCountriesData?: NearCountries;
  recommandUsersLoading: boolean;
  nearCitiesLoading: boolean;
  nearCountriesLoading: boolean;
}

const ExplorePresenter: React.SFC<IProps> = ({
  recommandUsersData: { recommandUsers: { users = null } = {} } = {},
  nearCitiesData: { nearCities: { cities = null } = {} } = {},
  nearCountriesData: { nearCountries: { countries = null } = {} } = {},
  recommandUsersLoading,
  nearCitiesLoading,
  nearCountriesLoading
}) => {
  if (users || cities || countries) {
    return (
      <TallWrapper>
        <Link to="/explore/userlist">
          <p>see all</p>
        </Link>
        <p>recommand user</p>
        <Container>
          {!recommandUsersLoading && users ? (
            <UserGrid users={users} />
          ) : (
            <Loader />
          )}
        </Container>
        <p>near cities</p>
        <Container>
          {!nearCitiesLoading && cities ? (
            <LocationGrid cities={cities} type={"city"} />
          ) : (
            <Loader />
          )}
        </Container>
        <p>near countries</p>
        <Container>
          {!nearCountriesLoading && countries ? (
            <LocationGrid countries={countries} type={"country"} />
          ) : (
            <Loader />
          )}
        </Container>
      </TallWrapper>
    );
  } else {
    return null;
  }
};

export default ExplorePresenter;
