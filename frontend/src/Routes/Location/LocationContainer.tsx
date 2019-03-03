import React from "react";
import LocationPresenter from "./LocationPresenter";
import { Query } from "react-apollo";
import { GET_CITY } from "./LocationQueries";
import { GetCities } from "../../types/api";

class CityQuery extends Query<GetCities> {}

interface IState {
  page: number;
}

class LocationContainer extends React.Component<any, IState> {
  public state = {
    page: 0
  };
  public render() {
    return (
      <CityQuery query={GET_CITY}>
        {({ data, loading }) => (
          <LocationPresenter data={data} loading={loading} />
        )}
      </CityQuery>
    );
  }
}

export default LocationContainer;
