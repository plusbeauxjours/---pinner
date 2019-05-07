import React from "react";

import { Query } from "react-apollo";
import { GetCities, GetCitiesVariables } from "src/types/api";
import { GET_CITIES } from "src/Routes/UserProfile/UserProfileQueries";
import LocationRow from "./LocationRow";
import Loader from "./Loader";

class GetCitiesQuery extends Query<GetCities, GetCitiesVariables> {}

const GetCities: React.SFC<any> = username => (
  <GetCitiesQuery query={GET_CITIES} variables={username}>
    {({ data: { getCities: { trip = null } = {} } = {}, loading }) => {
      if (loading) {
        return <Loader />;
      } else if (!loading && trip) {
        console.log(trip);
        return trip.map(city => (
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
