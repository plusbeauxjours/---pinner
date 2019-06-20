import React from "react";
import { Link } from "react-router-dom";
import styled from "../../Styles/typed-components";

import Wrapper from "../../Components/Wrapper";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import Bold from "../../Components/Bold";
import moment = require("moment");
import Weather from "src/Components/Weather";
import AvatarGrid from "../../Components/AvatarGrid";
import UserHeader from "../../Components/UserHeader";
import LocationBox from "src/Components/LocationBox";
import CityLikeBtn from "../../Components/CityLikeBtn";

const SWrapper = styled(Wrapper)`
  z-index: 1;
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

const InfoRow = styled.span`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-gap: 10px;
  width: 300px;
  margin-top: 10px;
`;

const SSText = styled(Bold)`
  font-size: 12px;
  font-weight: 100;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  @media screen and (max-width: 935px) {
    margin-left: 10px;
  }
`;

const SmallTitle = styled(Title)`
  flex-direction: column;
  align-items: center;
`;

const GreyLine = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid grey;
  @media screen and (max-width: 935px) {
    margin: 10px 10px 0 10px;
  }
`;

const SmallGreyLine = styled(GreyLine)`
  width: 40%;
`;

const CAvatar = styled(Avatar)`
  border-radius: 3px;
  height: 300px;
  width: 300px;
  margin-right: 20px;
  @media screen and (max-width: 600px) {
    margin-right: 0px;
  }
`;

const UserContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  @media screen and (max-width: 800px) {
    min-width: 300px;
  }
`;

const UserRow = styled.div<ITheme>`
  display: grid;
  flex-direction: row;
  grid-template-columns: 2fr 1fr 1fr;
  padding: 0 5px 0 5px;
  grid-gap: 15px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  background-color: ${props => (props.active ? "grey" : null)};
  &:hover {
    background-color: grey;
  }
  &:not(:last-child) {
    border-bottom: 1px solid grey;
  }
`;

const UserNameRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 215px;
  border: 0;
  border: ${props => props.theme.boxBorder};
  background-color: ${props => props.theme.bgColor};
  border-radius: 3px;
  padding: 5px;
  color: white;
  font-size: 12px;
  &::placeholder {
    color: ${props => props.theme.greyColor};
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 50px;
  padding-left: 5px;
`;

const HeaderText = styled(Bold)`
  display: flex;
`;

const HeaderColumn = styled.div`
  margin-left: 15px;
`;

const SAvatar = styled(Avatar)`
  border-radius: 3px;
  height: 45px;
  width: 45px;
`;

const Location = styled.span`
  display: flex;
  margin-top: 5px;
  display: block;
  font-size: 12px;
  font-weight: 200;
`;

interface ITheme {
  active?: string;
}

interface IProps {
  cityName: string;
  cityPhoto: string;
  countryName: string;
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;

  profileDate: any;
  profileLoading: boolean;
  nearCitiesData?: any;
  nearCitiesLoading: boolean;
  samenameCitiesData: any;
  samenameCitiesLoading: boolean;

  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  usersBeforeList: any;
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onClick: any;
  onBlur: any;
  usersBeforeActiveId: number;
  cityId: string;
}

const TripProfilePresenter: React.SFC<IProps> = ({
  cityName,
  cityPhoto,
  countryName,
  startDate,
  endDate,

  profileDate: {
    tripProfile: { coffees = null, city = null, usersBefore = null } = {}
  } = {},
  profileLoading,
  nearCitiesData: { nearCities: { cities: nearCities = null } = {} } = {},
  nearCitiesLoading,
  samenameCitiesData: {
    getSamenameCities: { cities: samenameCities = null } = {}
  } = {},
  samenameCitiesLoading,
  onChange,
  search,
  usersBeforeList,
  onKeyDown,
  onClick,
  onBlur,
  usersBeforeActiveId,
  cityId
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
                <Weather latitude={city.latitude} longitude={city.longitude} />
                <CityLikeBtn
                  isLiked={city.isLiked}
                  cityId={city.id}
                  likeCount={city.likeCount}
                  type={"profile"}
                />
              </InfoRow>
              <Link
                to={{
                  pathname: `/country/${city.country.countryCode}`,
                  state: { countryName: city.country.countryName }
                }}
              >
                <Header>
                  <SAvatar size={"sm"} url={city.country.countryPhoto} />
                  <HeaderColumn>
                    <HeaderText text={city.country.countryName} />
                    <Location>{city.country.continent.continentName}</Location>
                  </HeaderColumn>
                </Header>
              </Link>
            </AvatarContainer>
            <UserContainer>
              <UserNameRow>
                <Username>{cityName}</Username>
                <Username>
                  From {startDate} To {endDate}
                </Username>
                <Input
                  placeholder="Search"
                  onChange={onChange}
                  value={search}
                  onKeyDown={onKeyDown}
                  onClick={onClick}
                  onBlur={onBlur}
                />
              </UserNameRow>
              {usersBeforeList.length !== 0 &&
                usersBeforeList.map((user, index) => {
                  let active;
                  if (index === usersBeforeActiveId) {
                    active = "active";
                  }
                  return (
                    <UserRow key={index} active={active}>
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
                    </UserRow>
                  );
                })}
              {usersBeforeList.length === 0 &&
                !search &&
                usersBefore &&
                usersBefore.map((user, index) => {
                  let active;
                  if (index === usersBeforeActiveId) {
                    active = "active";
                  }
                  return (
                    <UserRow key={index} active={active}>
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
                    </UserRow>
                  );
                })}
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
          <LocationBox
            nearCities={nearCities}
            cityId={cityId}
            title={"NEAR CITIES"}
            loading={nearCitiesLoading}
          />
          <LocationBox
            samenameCities={samenameCities}
            cityId={cityId}
            title={"SAMENAME CITIES"}
            loading={samenameCitiesLoading}
          />
        </SWrapper>
      </>
    );
  }
  return null;
};

export default TripProfilePresenter;
