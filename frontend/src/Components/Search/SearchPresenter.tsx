import React from "react";
import styled from "../../Styles/typed-components";
import Wrapper from "src/Components/Wrapper";
import Bold from "../../Components/Bold";
import Loader from "src/Components/Loader";
import { Link } from "react-router-dom";
import UserHeader from "../UserHeader";
import Avatar from "../Avatar";
import FollowBtnContainer from "../FollowBtn/index";

const SWrapper = styled(Wrapper)`
  z-index: 1;
`;

const UserRow = styled.div`
  display: grid;
  flex-direction: row;
  height: 50px;
  grid-template-columns: 5fr 1fr;
  padding: 0 5px 0 5px;
  grid-gap: 15px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: grey;
  }
  &:not(:last-child) {
    border-bottom: 1px solid grey;
  }
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

interface IProps {
  searchData?: any;
  searchLoading: boolean;
}

const SearchPresenter: React.SFC<IProps> = ({
  searchData: {
    searchUsers: { users = null } = {},
    searchCities: { cities = null } = {},
    searchCountries: { countries = null } = {},
    searchContinents: { continents = null } = {}
  } = {},
  searchLoading
}) => {
  if (searchLoading) {
    return <Loader />;
  } else if (!searchLoading) {
    return (
      <SWrapper>
        {users &&
          users.length > 0 &&
          users.map(user => (
            <UserRow key={user.id}>
              <Link to={`/${user.username}`}>
                <UserHeader
                  username={user.username}
                  currentCity={user.profile.currentCity.cityName}
                  currentCountry={user.profile.currentCity.country.countryName}
                  avatar={user.profile.avatar}
                  size={"sm"}
                />
              </Link>
              {!user.isSelf && (
                <FollowBtnContainer
                  isFollowing={user.profile.isFollowing}
                  userId={user.id}
                  username={user.profile.username}
                />
              )}
            </UserRow>
          ))}
        {cities &&
          cities.length > 0 &&
          cities.map(city => (
            <UserRow key={city.id}>
              <Link to={`/city/${city.cityName}`}>
                <Header>
                  <SAvatar size={"sm"} url={city.cityPhoto} />
                  <HeaderColumn>
                    <HeaderText text={city.cityName} />
                    <Location>{city.country.countryName}</Location>
                  </HeaderColumn>
                </Header>
              </Link>
            </UserRow>
          ))}
        {countries &&
          countries.length > 0 &&
          countries.map(country => (
            <UserRow key={country.id}>
              <Link to={`/country/${country.countryName}`}>
                <Header>
                  <SAvatar size={"sm"} url={country.countryPhoto} />
                  <HeaderColumn>
                    <HeaderText text={country.countryName} />
                    <Location>{country.continent.continentName}</Location>
                  </HeaderColumn>
                </Header>
              </Link>
            </UserRow>
          ))}
        {continents &&
          continents.length > 0 &&
          continents.map(continent => (
            <UserRow key={continent.id}>
              <Link to={`/continent/${continent.continentName}`}>
                <Header>
                  <SAvatar size={"sm"} url={continent.continentPhoto} />
                  <HeaderColumn>
                    <HeaderText text={continent.continentName} />
                  </HeaderColumn>
                </Header>
              </Link>
            </UserRow>
          ))}
        {users &&
          users.length === 0 &&
          cities &&
          cities.length === 0 &&
          countries &&
          countries.length === 0 &&
          continents &&
          continents.length === 0 && <Bold text="Nothing found..." />}
      </SWrapper>
    );
  }
  return null;
};

export default SearchPresenter;
