import { Link } from "react-router-dom";
import React from "react";
import {
  NearCities,
  NearCountries,
  RecommandUsers,
  LatestCities
} from "../../types/api";
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
  recommandUsersLoading: boolean;
  nearCitiesData?: NearCities;
  nearCitiesLoading: boolean;
  nearCountriesData?: NearCountries;
  nearCountriesLoading: boolean;
  latestCitiesData?: LatestCities;
  latestCitiesLoading: boolean;
}

const ExplorePresenter: React.SFC<IProps> = ({
  recommandUsersData: { recommandUsers: { users = null } = {} } = {},
  recommandUsersLoading,
  nearCitiesData: { nearCities: { cities: nearCities = null } = {} } = {},
  nearCitiesLoading,
  nearCountriesData: { nearCountries: { countries = null } = {} } = {},
  nearCountriesLoading,
  latestCitiesData: { latestCities: { cities: latestCities = null } = {} } = {},
  latestCitiesLoading
}) => {
  if (users || nearCities || countries || latestCities) {
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
          {!nearCitiesLoading && nearCities ? (
            <LocationGrid cities={nearCities} type={"city"} />
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
        <p>latest cities</p>
        <Container>
          {!latestCitiesLoading && latestCities ? (
            <LocationGrid cities={latestCities} type={"city"} />
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
