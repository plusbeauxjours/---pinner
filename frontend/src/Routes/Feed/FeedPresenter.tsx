import React from "react";
import { Link } from "react-router-dom";

import { Upload } from "../../Icons";

import Loader from "../../Components/Loader";
import Photo from "../../Components/Photo";
import Wrapper from "../../Components/Wrapper";
import styled from "../../Styles/typed-components";
import Avatar from "../../Components/Avatar";
import Bold from "../../Components/Bold";

const SWrapper = styled(Wrapper)`
  max-width: 650px;
`;

const CityPhoto = styled.img`
  display: flex;
  width: 650px;
  height: 200px;
  overflow: hidden;
  background-size: cover;
  border-radius: 3px;
  margin-bottom: 40px;
  z-index: 1;
`;

const Container = styled.div`
  border: 1px;
  display: flex;
  justify-content: center;
  margin: 30px;
`;

const AvatarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 40px;
  padding: 20px;
`;

const AvatarContainer = styled.div``;

const SAvatar = styled(Avatar)`
  margin: 3px;
`;

const Follow = styled.div`
  flex: 1;
  margin-bottom: 10px;
  height: 150px;
  border-radius: 3px;
  border: 1px solid grey;
  padding: 5px;
`;

const SBold = styled(Bold)`
  font-size: 20px;
  font-weight: 200;
`;

const Icon = styled.span`
  margin-right: 30px;
  &:last-child {
    margin-right: 0;
  }
`;

interface IProps {
  data?: any;
  loading: boolean;
  currentCity: string;
}

const FeedPresenter: React.SFC<IProps> = ({
  data: {
    feed: {
      cards = null,
      usersNow = null,
      usersBefore = null,
      city = null
    } = {}
  },
  loading,
  currentCity
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && cards && usersNow && usersBefore && city) {
    return (
      <SWrapper>
        <h1>welcome to {currentCity}</h1>
        <h1>see all</h1>
        <Container>
          <CityPhoto src={city.cityPhoto} />
        </Container>
        <h1>cardCount {city.cardCount}</h1>
        <h1>userCount {city.userCount}</h1>
        <h1>userLogCount {city.userLogCount}</h1>
        <Container>
          <Follow>
            USERS WHO IS HERE
            <SBold text={String(city.userCount)} />
            <AvatarGrid>
              {usersNow &&
                usersNow.map(user => (
                  <AvatarContainer key={user.id}>
                    <Link to={`/${user.username}`}>
                      <SAvatar size={"sm"} url={user.profile.avatar} />
                    </Link>
                  </AvatarContainer>
                ))}
            </AvatarGrid>
          </Follow>
          <Follow>
            USERS WHO HAS BEEN HERE
            <SBold text={String(city.userLogCount)} />
            <AvatarGrid>
              {usersBefore &&
                usersBefore.map(user => (
                  <AvatarContainer key={user.id}>
                    <Link to={`/${user.actor.username}`}>
                      <SAvatar size={"sm"} url={user.actor.profile.avatar} />
                    </Link>
                  </AvatarContainer>
                ))}
            </AvatarGrid>
          </Follow>
        </Container>
        <Icon>
          <Link to="/upload">
            <Upload />
          </Link>
        </Icon>
        {cards &&
          cards.map(card => {
            return (
              <Photo
                key={card.id}
                id={card.id}
                inline={true}
                creatorAvatar={card.creator.profile.avatar}
                creatorUsername={card.creator.username}
                country={card.country.countryName}
                city={card.city.cityName}
                photoUrl={card.file}
                likeCount={card.likeCount}
                commentCount={card.commentCount}
                caption={card.caption}
                comments={card.comments}
                createdAt={card.createdAt}
                isLiked={card.isLiked}
                borderRadius={card.borderRadius}
              />
            );
          })}
      </SWrapper>
    );
  } else {
    return null;
  }
};

export default FeedPresenter;
