import React from "react";
import UserListPresent from "./UserListPresenter";
import { Query } from "react-apollo";
import { UserList } from "../../types/api";
import { USER_LIST_QUERY } from "./UserListQuery";

class UserListQuery extends Query<UserList> {}

class UserListContainer extends React.Component<any> {
  public render() {
    return (
      <UserListQuery query={USER_LIST_QUERY}>
        {({ data, loading }) => (
          <UserListPresent data={data} loading={loading} />
        )}
      </UserListQuery>
    );
  }
}

export default UserListContainer;
