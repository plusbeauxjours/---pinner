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
  lastCity: string;
  lastCountry: string;
}

const FeedPresenter: React.SFC<IProps> = ({
  data: { feed: { cards = null } = {} } = {},
  loading,
  lastCity,
  lastCountry
}) => {
  if (loading) {
    return <Loader />;
  } else if (cards) {
    return (
      <SWrapper>
        <h1>
          welcome to {lastCity}
          {lastCountry}
        </h1>
        {cards &&
          cards.map(cardkolpo => {
            console.log(cardkolpo);
            return (
              <>
                <Photo
                  key={cardkolpo.id}
                  id={cardkolpo.id}
                  inline={true}
                  creatorAvatar={cardkolpo.creator.profile.avatar}
                  creatorUsername={cardkolpo.creator.username}
                  country={cardkolpo.country.countryname}
                  city={cardkolpo.city.cityname}
                  photoUrl={cardkolpo.file}
                  likeCount={cardkolpo.likeCount}
                  commentCount={cardkolpo.commentCount}
                  caption={cardkolpo.caption}
                  comments={cardkolpo.comments}
                  createdAt={cardkolpo.createdAt}
                  isLiked={cardkolpo.isLiked}
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
