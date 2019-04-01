import React from "react";

import { Query } from "react-apollo";
import { GetCountries, GetCountriesVariables } from "src/types/api";
import { GET_COUNTRIES } from "src/Routes/UserProfile/UserProfileQueries";
import LocationRow from "./LocationRow";
import Loader from "./Loader";

class GetCountriesQuery extends Query<GetCountries, GetCountriesVariables> {}

const GetCountries: React.SFC<any> = username => (
  <GetCountriesQuery query={GET_COUNTRIES} variables={username}>
    {({ data: { getCountries: { footprints = null } = {} } = {}, loading }) => {
      if (loading) {
        return <Loader />;
      } else if (!loading && footprints) {
        console.log(footprints);
        return footprints.map(country => (
          <LocationRow
            key={country.id}
            id={country.id}
            countryName={country.city.country.countryName}
            avatar={country.city.country.countryPhoto}
            continentName={country.city.country.continent.continentName}
            type={"getCountries"}
          />
        ));
      } else {
        return null;
      }
    }}
  </GetCountriesQuery>
);

export default GetCountries;
