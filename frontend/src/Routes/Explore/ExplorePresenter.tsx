import React from "react";
import Loader from "src/Components/Loader";
import Wrapper from "src/Components/Wrapper";
import UserGrid from "../../Components/UserGrid";
import styled from "src/Styles/typed-components";

const TallWrapper = styled(Wrapper)`
  height: 50vh;
  text-align: center;
`;

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
    return <TallWrapper>{users && <UserGrid users={users} />}</TallWrapper>;
  } else {
    return null;
  }
};

export default ExplorePresenter;
