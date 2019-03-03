import React from "react";
import { Link } from "react-router-dom";

import { Feed } from "src/types/api";
import { Upload } from "../../Icons";

import Loader from "../../Components/Loader";
import Photo from "../../Components/Photo";
import Wrapper from "../../Components/Wrapper";
import styled from "../../Styles/typed-components";

const SWrapper = styled(Wrapper)`
  max-width: 650px;
`;

const Icon = styled.span`
  margin-right: 30px;
  &:last-child {
    margin-right: 0;
  }
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
        <Icon>
          <Link to="/upload">
            <Upload />
          </Link>
        </Icon>
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
