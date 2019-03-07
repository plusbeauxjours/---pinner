import React from "react";
import Loader from "src/Components/Loader";
import UserGrid from "../../Components/UserGrid";
import { Explore } from "src/types/api";
import Wrapper from "../../Components/Wrapper";
import { Link } from "react-router-dom";

interface IProps {
  data?: Explore;
  loading: boolean;
}

const ExplorePresenter: React.SFC<IProps> = ({
  data: { latestUsers: { users = null } = {} } = {},
  loading
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && users) {
    return (
      <Wrapper>
        <Link to="/explore/userlist">
          <p>see all</p>
        </Link>

        {users && <UserGrid users={users} />}
      </Wrapper>
    );
  } else {
    return null;
  }
};

export default ExplorePresenter;
