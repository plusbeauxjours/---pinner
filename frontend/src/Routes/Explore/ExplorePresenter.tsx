import React from "react";
import styled from "../../Styles/typed-components";
import Loader from "src/Components/Loader";
import Wrapper from "src/Components/Wrapper";
import UserCard from "../../Components/UserCard";
import CardGrid from "../../Components/CardGrid";

const UserWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 200px));
  grid-gap: 25px;
  margin-bottom: 85px;
`;

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
        {users && (
          <UserWrapper>
            {users.map(user => (
              <UserCard
                key={user.id}
                id={user.id}
                avatar={user.profile.avatar}
                username={user.username}
                isFollowing={user.profile.isFollowing}
              />
            ))}
          </UserWrapper>
        )}
        {cards && <CardGrid cards={cards} />}
      </Wrapper>
    );
  } else {
    return null;
  }
};

export default ExplorePresenter;
