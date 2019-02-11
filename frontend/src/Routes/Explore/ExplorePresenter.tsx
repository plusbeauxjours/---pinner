import React from "react";
import styled from "../../Styles/typed-components";
import Loader from "src/Components/Loader";
import Wrapper from "src/Components/Wrapper";

const UserWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  grid-gap: 25px;
`;

const CardWrapper = styled.div``;

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
      </Wrapper>
    );
  } else {
    return null;
  }
};

export default ExplorePresenter;
