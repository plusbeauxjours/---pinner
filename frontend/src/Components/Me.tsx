import React from "react";
import { Query } from "react-apollo";
import { Me } from "../types/api";
import { ME } from "../sharedQueries";

class MeQuery extends Query<Me> {}

const Me: React.SFC<any> = ({ children }) => (
  <MeQuery query={ME}>
    {({ data: { me: { user = null } = {} } = {}, loading }) => {
      if (!loading && user) {
        return children(user);
      } else {
        return children(null);
      }
    }}
  </MeQuery>
);

export default Me;
