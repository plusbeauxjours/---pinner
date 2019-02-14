import React from "react";
import Loader from "src/Components/Loader";
import Wrapper from "src/Components/Wrapper";
import Photo from "src/Components/Photo";

const CardDetailPresenter: React.SFC<any> = ({ data, loading }) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && data) {
    const {
      cardDetail: { card }
    } = data;

    return (
      <Wrapper>
        <Photo
          id={card.id}
          inline={false}
          creatorAvatar={card.creator.profile.avatar}
          creatorUsername={card.creator.username}
          location={card.location}
          photoUrl={card.file}
          likeCount={card.likeCount}
          commentCount={card.commentCount}
          caption={card.caption}
          comments={card.comments}
          createdAt={card.createdAt}
          isLiked={card.isLiked}
        />
      </Wrapper>
    );
  }
  return null;
};

export default CardDetailPresenter;
