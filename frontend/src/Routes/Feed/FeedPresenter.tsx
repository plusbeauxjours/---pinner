import React from "react";
import { Link } from "react-router-dom";

import Loader from "../../Components/Loader";
import Photo from "../../Components/Photo";
import Wrapper from "../../Components/Wrapper";
import styled from "../../Styles/typed-components";
import Avatar from "../../Components/Avatar";
import Bold from "../../Components/Bold";
import Flag from "../../Components/Flag";

const SWrapper = styled(Wrapper)`
  z-index: 1;
`;

const PHeader = styled.header`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 55px;

  border: 1px;
  border-color: white;
  margin-top: 20px;
`;

const LocationContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
`;

const LocationHeader = styled.header`
  padding: 12px;
  margin: 0 15px 0 15px;
  display: flex;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
`;

const HeaderColumn = styled.div`
  margin-left: 30px;
`;

const Location = styled.span`
  margin-top: 5px;
  display: block;
  font-size: 12px;
  font-weight: 200;
`;

const AvatarContainer = styled.div`
  display: flex;
`;

const PBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0 20px 0;
  justify-content: center;
  background: ${props => props.theme.bgColor};
  border-bottom: 1px solid grey;
  &:not(:last-child) {
    border-bottom: 1px solid grey;
  }
`;

const UserContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const User = styled.div`
  display: flex;
  padding: 5px;
`;

const SBold = styled(Bold)`
  display: flex;
  align-self: flex-end;
`;

const UBold = styled(SBold)`
  font-weight: 100;
  font-size: 7px;
`;

const SAvatar = styled(Avatar)`
  margin-right: -15px;
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
      <>
        <SWrapper>
          <PHeader>
            <LocationContainer>
              <Link to={`/city/${city.cityName}`}>
                <LocationHeader>
                  <Flag countryCode={city.country.countryCode} size={"sm"} />
                  <HeaderColumn>
                    <SBold text={city.cityName} />
                    <Location>{city.country.countryName}</Location>
                  </HeaderColumn>
                </LocationHeader>
              </Link>
              <p>Temp</p>
              <p>AQI</p>
            </LocationContainer>
            <UserContainer>
              <User>
                {usersNow &&
                  usersNow.map(user => (
                    <Link to="/explore/userlist">
                      <AvatarContainer key={user.id}>
                        <SAvatar
                          size={"sm"}
                          key={user.id}
                          url={user.profile.avatar}
                        />
                      </AvatarContainer>
                    </Link>
                  ))}
                <UBold text={String(city.userCount)} />
                <UBold text={"USERS IS HERE, NOW"} />
              </User>
              <User>
                {usersBefore &&
                  usersBefore.map(user => (
                    <Link to="/explore/userlist">
                      <AvatarContainer key={user.id}>
                        <SAvatar
                          size={"sm"}
                          key={user.id}
                          url={user.actor.profile.avatar}
                        />
                      </AvatarContainer>
                    </Link>
                  ))}
                <UBold text={String(city.userLogCount)} />
                <UBold text={"USERS HAS BEEN HERE"} />
              </User>
            </UserContainer>
          </PHeader>
          <PBody />
          {cards &&
            cards.map(card => (
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
              />
            ))}
        </SWrapper>
      </>
    );
  }
  return null;
};

export default FeedPresenter;
