import React from "react";
import Loader from "../../Components/Loader";
import Photo from "../../Components/Photo";
import Wrapper from "../../Components/Wrapper";
import styled from "../../Styles/typed-components";

const SWrapper = styled(Wrapper)`
  max-width: 650px;
`;

interface IProps {
  data?: any;
  loading: boolean;
}

const FeedPresenter: React.SFC<IProps> = ({ data, loading }) => {
  if (loading) {
    return <Loader />;
  } else if (data) {
    const { feed: { cards = {} } = {} } = data;
    return (
      <SWrapper>
        {cards &&
          cards.map(card => (
            <Photo
              id={card.id}
              key={card.id}
              inline={true}
              creatorAvatar={card.creator.profile.avatar}
              creatorUsername={card.creator.username}
              location={card.location.city}
              photoUrl={card.file}
              likeCount={card.likeCount}
              commentCount={card.commentCount}
              caption={card.caption}
              comments={card.comments}
              createdAt={card.createdAt}
              isLiked={card.isLiked}
            />
          ))}
      </SWrapper>
    );
  } else {
    return null;
  }
};

export default FeedPresenter;
