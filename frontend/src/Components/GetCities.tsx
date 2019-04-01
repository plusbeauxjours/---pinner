import React from "react";

import { Query } from "react-apollo";
import { GetCities, GetCitiesVariables } from "src/types/api";
import { GET_CITIES } from "src/Routes/UserProfile/UserProfileQueries";
import LocationRow from "./LocationRow";

class GetCitiesQuery extends Query<GetCities, GetCitiesVariables> {}

const GetCities: React.SFC<any> = username => (
  <GetCitiesQuery query={GET_CITIES} variables={username}>
    {({ data: { getCities: { footprints = null } = {} } = {}, loading }) => {
      if (!loading && footprints) {
        console.log(footprints);
        return footprints.map(city => (
          <LocationRow
            key={city.id}
            id={city.id}
            cityName={city.city.cityName}
            avatar={city.city.cityPhoto}
            countryName={city.city.country.countryName}
            type={"getCities"}
          />
        ));
      } else {
        return null;
      }
    }}
  </GetCitiesQuery>
);

export default GetCities;
