import React from "react";
import Loader from "../../Components/Loader";
import Photo from "../../Components/Photo";
import Wrapper from "../../Components/Wrapper";
import styled from "../../Styles/typed-components";

const SWrapper = styled(Wrapper)`
  max-width: 650px;
`;

interface IProps {
  getUserData?: any;
  getFeedData?: any;
  loading: boolean;
  cityname: string;
}

const FeedByCityPresenter: React.SFC<IProps> = ({
  getUserData,
  getFeedData,
  loading,
  cityname
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && getUserData && getFeedData) {
    console.log(getUserData, getFeedData);

    const { feedByCity: { cards = {} } = {} } = getFeedData;
    const { getUsersByCity: { locationLogs = {} } = {} } = getUserData;
    return (
      <SWrapper>
        <h2>{cityname}</h2>
        {locationLogs &&
          locationLogs.map(locationLog => (
            <p>{locationLog.creator.username}</p>
          ))}
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

export default FeedByCityPresenter;
