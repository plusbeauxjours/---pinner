import React from "react";
import Loader from "src/Components/Loader";
import UserGrid from "../../Components/UserGrid";

interface IProps {
  data?: any;
  loading: boolean;
}

const ExplorePresenter: React.SFC<IProps> = ({
  data: { latestUsers: { users = null } = {} } = {},
  loading
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && users) {
    return <>{users && <UserGrid users={users} />}</>;
  } else {
    return null;
  }
};

export default ExplorePresenter;
