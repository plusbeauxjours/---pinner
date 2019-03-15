import React from "react";
import Loader from "src/Components/Loader";
import UserGrid from "../../Components/UserGrid";
import { Explore } from "src/types/api";
import Wrapper from "../../Components/Wrapper";
import { Link } from "react-router-dom";
import styled from "../../Styles/typed-components";

const Container = styled.div`
  border-bottom: 4px;
  display: flex;
  align-self: flex-start;
  flex-direction: row;
  -webkit-box-flex: 0;
  flex: 0 0 auto;
  height: 250px;
`;

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
        <Container>
          <Link to="/explore/userlist">
            <p>see all</p>
          </Link>
          <p>recommand user</p>

          {users && <UserGrid users={users} />}
        </Container>
        <Container>
          <p>nearest city</p>
        </Container>

        <Container>
          <p>recommand next city</p>
        </Container>
      </Wrapper>
    );
  } else {
    return null;
  }
};

export default ExplorePresenter;
