import React from "react";
import Loader from "src/Components/Loader";
import Wrapper from "src/Components/Wrapper";
import Photo from "src/Components/Photo";
import { cardDetail } from "src/types/api";

interface IProps {
  data: cardDetail;
  loading: boolean;
}

const CardDetailPresenter: React.SFC<IProps> = ({ data, loading }) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && data) {
    const {
      cardDetail: { card }
    } = data;
    console.log(typeof card.id);
    return (
      <Wrapper>
        <Photo
          id={card.id}
          inline={false}
          creatorAvatar={card.creator.profile.avatar}
          creatorUsername={card.creator.username}
          country={card.country.countryname}
          city={card.city.cityname}
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
