import React from "react";

import { Query } from "react-apollo";
import { GetContinentsVariables, GetContinents } from "src/types/api";
import { GET_CONTINENTS } from "src/Routes/UserProfile/UserProfileQueries";
import LocationRow from "./LocationRow";
import Loader from "./Loader";

class GetContinentQuery extends Query<GetContinents, GetContinentsVariables> {}

const GetContinents: React.SFC<any> = username => (
  <GetContinentQuery query={GET_CONTINENTS} variables={username}>
    {({ data: { getContinents: { trip = null } = {} } = {}, loading }) => {
      if (loading) {
        return <Loader />;
      } else if (!loading && trip) {
        return trip.map(continent => (
          <LocationRow
            key={continent.id}
            id={continent.id}
            continentName={continent.city.country.continent.continentName}
            avatar={continent.city.country.continent.continentPhoto}
            type={"getContinent"}
          />
        ));
      } else {
        return null;
      }
    }}
  </GetContinentQuery>
);

export default GetContinents;
