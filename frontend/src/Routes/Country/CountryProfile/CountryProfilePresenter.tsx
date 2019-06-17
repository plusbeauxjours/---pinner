import React from "react";
import { Link } from "react-router-dom";
import styled from "../../../Styles/typed-components";

import Wrapper from "../../../Components/Wrapper";
import Loader from "../../../Components/Loader";
import Avatar from "../../../Components/Avatar";
import Bold from "../../../Components/Bold";
import CityLikeBtn from "../../../Components/CityLikeBtn";
import UserBox from "src/Components/UserBox";
import CoffeeBox from "src/Components/CoffeeBox";

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

const InfoRow = styled.span``;

const SText = styled(Bold)`
  font-size: 18px;
  font-weight: 100;
`;

const GreyLine = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid grey;
  @media screen and (max-width: 935px) {
    margin: 0 10px 0 10px;
  }
`;

const UserRow = styled.div<ITheme>`
  display: grid;
  flex-direction: row;
  height: 50px;
  grid-template-columns: 4fr 1fr;
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

const Header = styled.header`
  display: flex;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
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

const LocationRow = styled(UserRow)`
  grid-template-columns: 1fr;
  width: 300px;
  height: 50px;
  margin-top: 26px;
  margin-bottom: 15px;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
`;

interface ITheme {
  active?: string;
}

interface IProps {
  data?: any;
  loading: boolean;
  coffeeData?: any;
  coffeeLoading: boolean;
  countriesData: any;
  countriesLoading: boolean;
  countryName: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  cityList: any;
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onClick: any;
  onBlur: any;
  activeId: number;
  countryCode: string;
  currentCityId: string;
}

const CountryProfilePresenter: React.SFC<IProps> = ({
  data: {
    countryProfile: {
      cities = null,
      usersNow = null,
      usersBefore = null,
      country = null
    } = {}
  } = {},
  loading,
  coffeeData: { getCoffees: { coffees = null } = {} } = {},
  coffeeLoading,
  countriesData: { getCountries: { countries = null } = {} } = {},
  countriesLoading,
  countryName,
  cityList,
  search,
  onChange,
  onKeyDown,
  onClick,
  onBlur,
  activeId,
  countryCode,
  currentCityId
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && cities && usersNow && usersBefore && country) {
    return (
      <>
        <SWrapper>
          <PHeader>
            <AvatarContainer>
              <CAvatar size="lg" url={country.countryPhoto} />
              <InfoRow>
                <SText text={String(country.cityCount)} />
                cities
              </InfoRow>
              <InfoRow>
                <SText text={String(country.distance)} />
                TIME DIFFERENCE
              </InfoRow>
              <InfoRow>
                <SText text={String(country.countryCapital)} />
                countryCapital
              </InfoRow>
              <InfoRow>
                <SText text={String(country.countryCurrency)} />
                countryCurrency
              </InfoRow>
              <InfoRow>
                <SText text={String(country.countryEmoji)} />
                countryEmoji
              </InfoRow>
              <InfoRow>
                <SText text={String(country.language)} />
                language
              </InfoRow>
              <LocationRow>
                <Link
                  to={{
                    pathname: `/continent/${country.continent.continentName}`,
                    state: { continentName: country.continent.continentName }
                  }}
                >
                  <Header>
                    <SAvatar
                      size={"sm"}
                      url={country.continent.continentPhoto}
                    />
                    <HeaderColumn>
                      <HeaderText text={country.continent.continentName} />
                    </HeaderColumn>
                  </Header>
                </Link>
              </LocationRow>
            </AvatarContainer>
            <UserContainer>
              <UserNameRow>
                <Username>{countryName}</Username>
                <Input
                  placeholder="Search"
                  value={search}
                  onChange={onChange}
                  onKeyDown={onKeyDown}
                  onClick={onClick}
                  onBlur={onBlur}
                />
              </UserNameRow>
              {cityList.length !== 0 &&
                cityList.map((city, index) => {
                  let active;
                  if (index === activeId) {
                    active = "active";
                  }
                  return (
                    <UserRow key={index} active={active}>
                      <Link to={`/city/${city.cityId}`}>
                        <Header>
                          <SAvatar size={"sm"} url={city.cityPhoto} />
                          <HeaderColumn>
                            <HeaderText text={city.cityName} />
                            <Location>{countryName}</Location>
                          </HeaderColumn>
                        </Header>
                      </Link>
                      <CityLikeBtn
                        isLiked={city.isLiked}
                        cityId={city.id}
                        likeCount={city.likeCount}
                        type={"row"}
                      />
                    </UserRow>
                  );
                })}
              {cityList.length === 0 &&
                !search &&
                cities &&
                cities.map((city, index) => {
                  let active;
                  if (index === activeId) {
                    active = "active";
                  }
                  return (
                    <UserRow key={index} active={active}>
                      <Link to={`/city/${city.cityId}`}>
                        <Header>
                          <SAvatar size={"sm"} url={city.cityPhoto} />
                          <HeaderColumn>
                            <HeaderText text={city.cityName} />
                            <Location>{countryName}</Location>
                          </HeaderColumn>
                        </Header>
                      </Link>
                      <CityLikeBtn
                        isLiked={city.isLiked}
                        cityId={city.id}
                        likeCount={city.likeCount}
                        type={"row"}
                      />
                    </UserRow>
                  );
                })}
            </UserContainer>
          </PHeader>
          {usersNow && usersNow.length !== 0 ? (
            <>
              <GreyLine />
              <UserBox users={usersNow} type={"usersNow"} />
            </>
          ) : null}
          {usersBefore && usersBefore.length !== 0 ? (
            <>
              <GreyLine />
              <UserBox users={usersBefore} type={"usersBefore"} />
            </>
          ) : null}
          {!coffeeLoading && (
            <CoffeeBox
              coffees={coffees}
              coffeeLoading={coffeeLoading}
              currentCityId={currentCityId}
              currentCountryCode={countryCode}
            />
          )}
        </SWrapper>
      </>
    );
  }
  return null;
};

export default CountryProfilePresenter;
