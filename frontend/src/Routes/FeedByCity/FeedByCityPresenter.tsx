import React from "react";
import { Link } from "react-router-dom";
import styled from "../../Styles/typed-components";

import Wrapper from "../../Components/Wrapper";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import Photo from "../../Components/Photo";
import Bold from "../../Components/Bold";

const SWrapper = styled(Wrapper)`
  z-index: 1;
`;

const PHeader = styled.header`
  display: flex;
  flex-direction: column;
  height: 300px;
  align-items: center;
  background: ${props => props.theme.headerColor};
`;

const PAvatar = styled(Avatar)`
  margin: 40px;
`;

const Username = styled.span`
  text-align: center;
  font-size: 22px;
  font-weight: 100;
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

const CityPhoto = styled.img`
  margin-bottom: 10px;
  display: flex;
  width: 200px;
  height: 200px;
  background-size: cover;
  border-radius: 3px;
  z-index: 1;
  object-fit: cover;
`;

const CityName = styled(Bold)`
  position: absolute;
  display: flex;
  z-index: 5;
  font-size: 40px;
  font-family: "Qwigley";
  font-weight: 200;
`;

const CountryName = styled(CityName)`
  font-size: 20px;
  margin-top: 20px;
`;

const CityContainer = styled.div`
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 300px;
  margin-right: 15px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  margin-bottom: 10px;
  height: 200px;
  border-radius: 3px;
  border: 1px solid grey;
  padding: 5px;
`;

const InfoInlineContainer = styled(InfoContainer)`
  flex-direction: row;
  justify-content: space-between;
`;

const HalfInfo = styled(Info)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 48%;
  height: 100px;
  display: flex;
  margin-bottom: 0;
  padding-bottom: 30px;
`;

const InfoRow = styled.span``;

const FollowContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 400px;
  margin-bottom: 10px;
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

const SAvatar = styled(Avatar)`
  margin: 3px;
`;

interface IProps {
  data?: any;
  loading: boolean;
}

const FeedByCityPresenter: React.SFC<IProps> = ({ data, loading }) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && data) {
    const {
      feedByCity: {
        cards = {},
        usersNow = {},
        usersBefore = {},
        city = {}
      } = {}
    } = data;
    return (
      <>
        <PHeader>
          <PAvatar size="lg" url={city.cityPhoto} />
          <Username>{city.cityName}</Username>
        </PHeader>
        <SWrapper>
          <PBody>
            <CityContainer>
              <Link to={`/city/${city.cityName}`}>
                <CityPhoto src={city.cityPhoto} />
              </Link>

              <CityName text={city.cityName} />
              <CountryName text={city.country.countryName} />
            </CityContainer>
            <InfoContainer>
              <Info>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with....
              </Info>
              <InfoInlineContainer>
                <HalfInfo>
                  <InfoRow>
                    <SBold text={String(city.cardCount)} />
                    AQI
                  </InfoRow>
                  <InfoRow>
                    <SBold text={String(city.userCount)} />
                    TEMPERATURE
                  </InfoRow>
                  <InfoRow>
                    <SBold text={String(city.userLogCount)} />
                    DISTANCE
                  </InfoRow>
                </HalfInfo>
                <HalfInfo>
                  <InfoRow>
                    cardCount
                    <SBold text={String(city.cardCount)} />
                  </InfoRow>

                  <InfoRow>
                    userCount
                    <SBold text={String(city.userCount)} />
                  </InfoRow>

                  <InfoRow>
                    userLogCount
                    <SBold text={String(city.userLogCount)} />
                  </InfoRow>
                </HalfInfo>
              </InfoInlineContainer>
            </InfoContainer>
            <FollowContainer>
              <Follow>
                CURRENT USERS
                <SBold text={String(city.userCount)} />
                {usersNow &&
                  usersNow.map(user => (
                    <Link to={`/${user.username}`}>
                      <SAvatar
                        size={"sm"}
                        key={user.id}
                        url={user.profile.avatar}
                      />
                    </Link>
                  ))}
              </Follow>
              <Follow>
                PASSED USERS
                <SBold text={String(city.userLogCount)} />
                {usersBefore &&
                  usersBefore.map(user => (
                    <Link to={`/${user.actor.username}`}>
                      <SAvatar
                        size={"sm"}
                        key={user.id}
                        url={user.actor.profile.avatar}
                      />
                    </Link>
                  ))}
              </Follow>
            </FollowContainer>
          </PBody>
          {cards &&
            cards.map(card => (
              <Photo
                id={card.id}
                key={card.id}
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
            ))}
        </SWrapper>
      </>
    );
  }
  return null;
};

export default FeedByCityPresenter;
