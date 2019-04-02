import React from "react";
import { Link } from "react-router-dom";
import styled from "../../Styles/typed-components";

import Wrapper from "../../Components/Wrapper";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import Bold from "../../Components/Bold";
// import LocationGrid from "../../Components/LocationGrid";
import moment = require("moment");
import CardGrid from "src/Components/CardGrid";

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

const CountryPhoto = styled.img`
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

// const Container = styled.div`
//   border-bottom: 4px;
//   display: flex;
//   align-items: center;
//   flex-direction: row;
//   -webkit-box-flex: 0;
//   flex: 0 0 auto;
//   height: 250px;
//   border-bottom: 1px solid grey;
//   padding: 20px;
// `;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const SeeAll = styled.p`
  font-size: 12px;
  font-weight: 100;
  cursor: pointer;
`;

interface IProps {
  cityName: string;
  cityPhoto: string;
  countryName: string;
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  cardsData: any;
  cardsLoading: boolean;
  usersData: any;
  usersLoading: boolean;
  profileDate: any;
  profileLoading: boolean;
  state: any;
}

const TripProfilePresenter: React.SFC<IProps> = ({
  cityName,
  cityPhoto,
  countryName,
  startDate,
  endDate,
  cardsData: { getDurationCards: { cards = null } = {} } = {},
  cardsLoading,
  usersData: { getDurationAvatars: { usersBefore = null } = {} } = {},
  usersLoading,
  profileDate: { tripProfile: { usersNow = null, city = null } = {} } = {},
  profileLoading,
  state
}) => {
  if (profileLoading) {
    return <Loader />;
  } else if (!profileLoading && !usersLoading && city) {
    return (
      <>
        <PHeader>
          <PAvatar size="lg" url={cityPhoto} />
          <Username>{cityName}</Username>
          <Username>
            {startDate}
            {endDate}
          </Username>
        </PHeader>
        <SWrapper>
          <PBody>
            {!profileLoading && city ? (
              <CountryContainer>
                <Link to={`/country/${countryName}`}>
                  <CountryPhoto src={city.country.countryPhoto} />
                </Link>
                <CountryName text={countryName} />
              </CountryContainer>
            ) : (
              <Loader />
            )}
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
                    {/* <SBold text={String(country.cityCount)} /> */}
                    VISA for you
                  </InfoRow>
                  <InfoRow>
                    {/* <SBold text={String(country.cityCount)} /> */}
                    English Skill
                  </InfoRow>
                  <InfoRow>
                    {/* <SBold text={String(country.cityCount)} /> */}
                    GDP
                  </InfoRow>
                  <InfoRow>
                    {/* <SBold text={String(country.cityCount)} /> */}
                    Flag
                  </InfoRow>
                </HalfInfo>
                <HalfInfo>
                  <InfoRow>
                    AirLine
                    {/* <SBold text={String(country.cityCount)} /> */}
                  </InfoRow>
                  <InfoRow>
                    SNS
                    {/* <SBold text={String(country.cityCount)} /> */}
                  </InfoRow>
                  <InfoRow>
                    Capital
                    {/* <SBold text={String(country.cityCount)} /> */}
                  </InfoRow>
                  <InfoRow>
                    Potal
                    {/* <SBold text={String(country.cityCount)} /> */}
                  </InfoRow>
                </HalfInfo>
              </InfoInlineContainer>
            </InfoContainer>
            <FollowContainer>
              <Follow>
                USERS WHO IS HERE
                {/* <SBold text={String(country.cardCount)} /> */}
                <AvatarGrid>
                  {usersNow &&
                    usersNow.map(user => (
                      <AvatarContainer key={user.id}>
                        <Link to={`/${user.username}`}>
                          <SAvatar size={"sm"} url={user.avatar} />
                        </Link>
                      </AvatarContainer>
                    ))}
                  {console.log(usersNow, usersBefore)}
                </AvatarGrid>
              </Follow>
              <Follow>
                USERS WHO HAS BEEN HERE
                {/* <SBold text={String(country.cardCount)} /> */}
                <AvatarGrid>
                  {usersBefore &&
                    usersBefore.map(user => (
                      <AvatarContainer key={user.id}>
                        <Link to={`/${user.actor.profile.username}`}>
                          <SAvatar
                            size={"sm"}
                            url={user.actor.profile.avatar}
                          />
                        </Link>
                      </AvatarContainer>
                    ))}
                </AvatarGrid>
              </Follow>
            </FollowContainer>
          </PBody>
          <Title>
            <SBold text={"POSTS"} />
            <SeeAll>SEE ALL</SeeAll>
          </Title>
          {!cardsLoading && cards ? <CardGrid cards={cards} /> : <Loader />}
        </SWrapper>
      </>
    );
  }
  return <p>goodmorning</p>;
};

export default TripProfilePresenter;
