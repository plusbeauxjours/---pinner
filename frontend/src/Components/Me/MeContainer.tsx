import React from "react";
import { Query } from "react-apollo";
import { me } from "../../types/api";
import { ME } from "./MeQueries";
import MePresenter from "./MePresenter";

class MeQuery extends Query<me> {}

class MeContainer extends React.Component {
  public render() {
    return (
      <MeQuery query={ME}>
        {({ data, loading }) => <MePresenter data={data} loading={loading} />}
      </MeQuery>
    );
  }
}

export default MeContainer;
