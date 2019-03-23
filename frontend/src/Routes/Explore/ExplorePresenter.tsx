import { Link } from "react-router-dom";
import React from "react";
import { NearCities, NearCountries, RecommandUsers } from "../../types/api";
import styled from "../../Styles/typed-components";

import Loader from "../../Components/Loader";
import UserGrid from "../../Components/UserGrid";
import LocationGrid from "../../Components/LocationGrid";

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
      <>
        {" "}
        <Link to="/explore/userlist">
          <p>see all</p>
        </Link>
        <p>recommand user</p>
        <Container>{users && <UserGrid users={users} />}</Container>
        <p>near cities</p>
        <Container>
          {cities && <LocationGrid cities={cities} type={"city"} />}
        </Container>
        <p>near countries</p>
        <Container>
          {countries && <LocationGrid countries={countries} type={"country"} />}
        </Container>
      </>
    );
  } else {
    return null;
  }
};

export default ExplorePresenter;
