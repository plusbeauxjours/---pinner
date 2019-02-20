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
  lastCity: string;
}

const FeedPresenter: React.SFC<IProps> = ({ data, loading, lastCity }) => {
  if (loading) {
    return <Loader />;
  } else if (data) {
    const { feedByLocation: { cards = {} } = {} } = data;
    return (
      <SWrapper>
        <h1>welcome to {lastCity}</h1>
        {cards &&
          cards.map(card => (
            <Photo
              id={card.id}
              key={card.id}
              inline={true}
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
          ))}
      </SWrapper>
    );
  } else {
    return null;
  }
};

export default FeedPresenter;
