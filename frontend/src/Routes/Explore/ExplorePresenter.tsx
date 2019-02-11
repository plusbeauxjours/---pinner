import React from "react";
import styled from "../../Styles/typed-components";
import Loader from "src/Components/Loader";
import Wrapper from "src/Components/Wrapper";
import UserCard from "../../Components/UserCard";
import SquareCard from "../../Components/SquareCard";

const UserWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 200px));
  grid-gap: 25px;
  margin-bottom: 85px;
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 295px);
  grid-auto-rows: 295px;
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
        {cards && (
          <CardWrapper>
            {cards.map(card => (
              <SquareCard
                key={card.id}
                id={card.id}
                file={card.file}
                likeCount={card.likeCount}
                commentCount={card.commentCount}
              />
            ))}
          </CardWrapper>
        )}
      </Wrapper>
    );
  } else {
    return null;
  }
};

export default ExplorePresenter;
