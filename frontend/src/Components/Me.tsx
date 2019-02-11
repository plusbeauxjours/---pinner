import React from "react";
import { Query } from "react-apollo";
import { me } from "../types/api";
import { ME } from "../sharedQueries";

class MeQuery extends Query<me> {}

const Me: React.SFC<any> = ({ children }) => (
  <MeQuery query={ME}>
    {({ data, loading }) => {
      if (!loading && data.me) {
        return children(data.me);
      } else {
        return children(null);
      }
    }}
  </MeQuery>
);

export default Me;
