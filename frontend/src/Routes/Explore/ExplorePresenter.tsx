import React from "react";
import Loader from "src/Components/Loader";
import Wrapper from "src/Components/Wrapper";
import CardGrid from "../../Components/CardGrid";
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

const ExplorePresenter: React.SFC<IProps> = ({ data, loading }) => {
  if (loading) {
    return <Loader />;
  } else if (data && data) {
    const {
      latestCards: { cards },
      latestUsers: { users }
    } = data;
    return (
      <TallWrapper>
        {users && <UserGrid users={users} />}
        {cards && <CardGrid cards={cards} />}
      </TallWrapper>
    );
  } else {
    return null;
  }
};

export default ExplorePresenter;
