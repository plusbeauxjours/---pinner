import React from "react";
import Loader from "src/Components/Loader";
import Wrapper from "src/Components/Wrapper";
import CardGrid from "../../Components/CardGrid";
import UserGrid from "../../Components/UserGrid";

const ExplorePresenter: React.SFC<any> = ({ data, loading }) => {
  if (loading) {
    return <Loader />;
  } else if (data.latestCards && data.latestUsers) {
    const {
      latestCards: { cards = [] } = {},
      latestUsers: { users = [] } = {}
    } = data;
    return (
      <Wrapper>
        {users && <UserGrid users={users} />}
        {cards && <CardGrid cards={cards} />}
      </Wrapper>
    );
  } else {
    return null;
  }
};

export default ExplorePresenter;
