import React from "react";
import { Query } from "react-apollo";
import { me } from "../types/api";
import { ME } from "../sharedQueries";
import Loader from "./Loader";

class MeQuery extends Query<me> {}

const Me: React.SFC<any> = ({ children }) => (
  <MeQuery query={ME}>
    {({ data, loading }) => {
      if (loading) {
        return <Loader />;
      } else if (!loading && data) {
        const {
          me: { user }
        } = data;
        return children(user);
      } else {
        return children(null);
      }
    }}
  </MeQuery>
);

export default Me;
