import React from "react";
import { Link } from "react-router-dom";
import styled from "../../Styles/typed-components";

import Wrapper from "../../Components/Wrapper";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import Bold from "../../Components/Bold";
import moment = require("moment");
import CardGrid from "src/Components/CardGrid";
import LocationGrid from "src/Components/LocationGrid";
import Weather from "src/Components/Weather";
import AvatarGrid from "../../Components/AvatarGrid";
import FollowBtn from "../../Components/FollowBtn";
import UserHeader from "../../Components/UserHeader";
import InfiniteScroll from "react-infinite-scroller";

const SWrapper = styled(Wrapper)`
  z-index: 1;
`;

const Container = styled.div`
  border-bottom: 4px;
  display: flex;
  align-items: center;
  flex-direction: row;
  -webkit-box-flex: 0;
  flex: 0 0 auto;
  height: 280px;
  padding: 15px;
`;

const PHeader = styled.header`
  display: flex;
  padding: 40px 15px 40px 15px;

  @media screen and (max-width: 600px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const Username = styled.span`
  text-align: center;
  font-size: 22px;
  font-weight: 100;
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

const CountryName = styled(Bold)`
  position: absolute;
  display: flex;
  z-index: 5;
  font-size: 40px;
  font-family: "Qwigley";
  font-weight: 200;
  pointer-events: none;
`;

const CountryContainer = styled.div`
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const InfoRow = styled.span``;

const SText = styled(Bold)`
  font-size: 18px;
  font-weight: 100;
`;

const SSText = styled(Bold)`
  font-size: 12px;
  font-weight: 100;
`;

const Title = styled.div`
  display: flex;
  margin-top: 10px;
`;

const SmallTitle = styled(Title)`
  flex-direction: column;
  align-items: center;
`;

const Box = styled.div`
  width: 905px;
  display: flex;
  overflow-x: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  ::-webkit-scrollbar {
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: ${props => props.theme.bgColor};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    background-color: ${props => props.theme.greyColor};
  }
`;

const GreyLine = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid grey;
`;

const SmallGreyLine = styled(GreyLine)`
  width: 40%;
`;

const CAvatar = styled(Avatar)`
  border-radius: 3px;
  height: 300px;
  width: 300px;
  margin-right: 20px;
`;

const UserContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  @media screen and (max-width: 800px) {
    min-width: 300px;
  }
`;

const UserRow = styled.div`
  display: grid;
  flex-direction: row;
  height: 50px;
  grid-template-columns: 4fr 1fr;
  padding: 0 5px 0 5px;
  grid-gap: 15px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: grey;
  }
  border-top: 1px solid grey;
`;

const UserNameRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CWeather = styled(Weather)`
  margin-top: 10px;
`;

interface IProps {
  cityName: string;
  cityPhoto: string;
  countryName: string;
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  cardsData: any;
  cardsLoading: boolean;
  profileDate: any;
  profileLoading: boolean;
  nearCitiesData?: any;
  nearCitiesLoading: boolean;
  loadMore: any;
}

const TripProfilePresenter: React.SFC<IProps> = ({
  cityName,
  cityPhoto,
  countryName,
  startDate,
  endDate,
  cardsData: {
    getDurationCards: { cards = null, hasNextPage = false } = {}
  } = {},
  cardsLoading,
  profileDate: {
    tripProfile: { coffees = null, city = null, usersBefore = null } = {}
  } = {},
  profileLoading,
  nearCitiesData: { nearCities: { cities: nearCities = null } = {} } = {},
  nearCitiesLoading,
  loadMore
}) => {
  if (profileLoading) {
    return <Loader />;
  } else if (!profileLoading && city) {
    return (
      <>
        <SWrapper>
          <PHeader>
            <AvatarContainer>
              <CAvatar size="lg" url={city.cityPhoto} />
              <InfoRow>
                <SText text={String(city.userLogCount)} />
                DISTANCE
              </InfoRow>
              <InfoRow>
                <SText text={String(city.cardCount)} />
                cards
              </InfoRow>
              <SText text={String(city.distance)} />
              <InfoRow>
                TIME DIFFERENCE
                <SText text={String(city.userCount)} />
              </InfoRow>
              <CWeather latitude={city.latitude} longitude={city.longitude} />
            </AvatarContainer>
            <UserContainer>
              <UserNameRow>
                <Username>{cityName}</Username>
                <Username>
                  From {startDate} To {endDate}
                </Username>
              </UserNameRow>
              {usersBefore &&
                usersBefore.map(user => (
                  <>
                    <UserRow key={user.actor.profile.id}>
                      <Link to={`/${user.actor.profile.username}`}>
                        <UserHeader
                          username={user.actor.profile.username}
                          currentCity={user.actor.profile.currentCity.cityName}
                          currentCountry={
                            user.actor.profile.currentCity.country.countryName
                          }
                          avatar={user.actor.profile.avatar}
                          size={"sm"}
                        />
                      </Link>
                      {!user.actor.profile.isSelf && (
                        <FollowBtn
                          isFollowing={user.actor.profile.isFollowing}
                          userId={user.actor.profile.id}
                          username={user.actor.profile.username}
                        />
                      )}
                    </UserRow>
                  </>
                ))}
            </UserContainer>
          </PHeader>

          {coffees && coffees.length !== 0 ? (
            <>
              <SmallTitle>
                <SmallGreyLine />
                <SSText text={"COFFEES AT THAT TIME"} />
              </SmallTitle>
              <AvatarGrid coffees={coffees} />
            </>
          ) : null}
          <GreyLine />
          <Title>
            <SText text={`WHERE ${cityName} IS`} />
          </Title>
          <Container>
            <CountryContainer>
              <Link to={`/country/${city.country.countryName}`}>
                <CityPhoto src={city.country.countryPhoto} />
              </Link>
              <CountryName text={city.country.countryName} />
              {console.log(city)}
            </CountryContainer>
            <Box>
              {!nearCitiesLoading && nearCities ? (
                <LocationGrid cities={nearCities} type={"city"} />
              ) : (
                <Loader />
              )}
            </Box>
          </Container>
          <GreyLine />
          <Title>
            <SText text={"NEAR CITIES"} />
          </Title>
          <Container>
            <Box>
              {!nearCitiesLoading && nearCities ? (
                <LocationGrid cities={nearCities} type={"city"} />
              ) : (
                <Loader />
              )}
            </Box>
          </Container>
          <GreyLine />
          {!cardsLoading && cards && cards.length !== 0 ? (
            <InfiniteScroll
              hasMore={hasNextPage}
              loader={<Loader />}
              loadMore={loadMore}
            >
              {console.log(hasNextPage)}
              <GreyLine />
              <Title>
                <SText text={"POSTS"} />
              </Title>
              <CardGrid cards={cards} />
            </InfiniteScroll>
          ) : null}
        </SWrapper>
      </>
    );
  }
  return null;
};

export default TripProfilePresenter;
