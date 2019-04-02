import React from "react";
import { Link } from "react-router-dom";
import styled from "../../Styles/typed-components";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

import Wrapper from "../../Components/Wrapper";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import Bold from "../../Components/Bold";
import CardGrid from "../../Components/CardGrid";

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

const AvatarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 40px;
  padding: 20px;
`;

const AvatarContainer = styled.div``;

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

const CityProfilePresenter: React.SFC<IProps> = ({
  data: {
    cityProfile: {
      cards = null,
      usersNow = null,
      usersBefore = null,
      city = null
    } = {}
  } = {},
  loading
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && cards && usersNow && usersBefore && city) {
    return (
      <>
        <PHeader>
          <PAvatar size="lg" url={city.cityPhoto} />
          <Username>{city.cityName}</Username>
        </PHeader>
        <SWrapper>
          <PBody>
            <CountryContainer>
              <Link to={`/country/${city.country.countryName}`}>
                <CityPhoto src={city.country.countryPhoto} />
              </Link>
              <CountryName text={city.country.countryName} />
            </CountryContainer>
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
                USERS WHO IS HERE
                <SBold text={String(city.userCount)} />
                <AvatarGrid>
                  {usersNow &&
                    usersNow.map(user => (
                      <AvatarContainer key={user.id}>
                        <Link to={`/${user.username}`}>
                          <SAvatar
                            size={"sm"}
                            key={user.id}
                            url={user.profile.avatar}
                          />
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
                          <SAvatar
                            size={"sm"}
                            key={user.id}
                            url={user.actor.profile.avatar}
                          />
                        </Link>
                      </AvatarContainer>
                    ))}
                </AvatarGrid>
              </Follow>
            </FollowContainer>
          </PBody>
          <CalendarHeatmap
            startDate={new Date("2018-04-01")}
            endDate={new Date("2019-04-01")}
            values={[
              { date: "2019-01-01" },
              { date: "2019-01-22" },
              { date: "2019-01-30" }
            ]}
          />
          {cards && cards.length !== 0 && <CardGrid cards={cards} />}
        </SWrapper>
      </>
    );
  }
  return null;
};

export default CityProfilePresenter;
