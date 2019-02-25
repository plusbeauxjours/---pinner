import React from "react";
import LocationPresenter from "./LocationPresenter";
import { Query } from "react-apollo";
import { GET_COUNTRY } from "./LocationQueries";
import { GetCountry } from "../../types/api";

class CountryQuery extends Query<GetCountry> {}

interface IState {
  page: number;
}

class LocationContainer extends React.Component<any, IState> {
  public state = {
    page: 0
  };
  public render() {
    return (
      <CountryQuery query={GET_COUNTRY}>
        {({ data, loading }) => (
          <LocationPresenter data={data} loading={loading} />
        )}
      </CountryQuery>
    );
  }
}

export default LocationContainer;
