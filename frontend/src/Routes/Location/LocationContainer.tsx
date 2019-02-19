import React from "react";
import LocationPresenter from "./LocationPresenter";
import { Query } from "react-apollo";
import { location } from "../../types/api";
import { GET_LOCATION } from "./LocationQueries";

class LocationQuery extends Query<location> {}

interface IState {
  page: number;
}

class LocationContainer extends React.Component<any, IState> {
  public state = {
    page: 0
  };
  public render() {
    return (
      <LocationQuery query={GET_LOCATION}>
        {({ data, loading }) => (
          <LocationPresenter data={data} loading={loading} />
        )}
      </LocationQuery>
    );
  }
}

export default LocationContainer;
