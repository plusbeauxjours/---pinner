import React from "react";
import Loader from "../../Components/Loader";
import Photo from "../../Components/Photo";
import Wrapper from "../../Components/Wrapper";
import styled from "../../Styles/typed-components";
import { Feed } from "src/types/api";

const SWrapper = styled(Wrapper)`
  max-width: 650px;
`;

interface IProps {
  data?: Feed;
  loading: boolean;
  currentCity: string;
  currentCountry: string;
  currentCountryCode: string;
}

const FeedPresenter: React.SFC<IProps> = ({
  data: { feed: { cards = null } = {} } = {},
  loading,
  currentCity,
  currentCountry,
  currentCountryCode
}) => {
  if (loading) {
    return <Loader />;
  } else if (cards) {
    return (
      <SWrapper>
        <h1>
          welcome to {currentCity}
          {currentCountry}
          {currentCountryCode}
        </h1>
        {cards &&
          cards.map(card => {
            return (
              <>
                <Photo
                  key={card.id}
                  id={card.id}
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
              </>
            );
          })}
      </SWrapper>
    );
  } else {
    return null;
  }
};

export default FeedPresenter;
