import React from "react";
import styled from "../../Styles/typed-components";
import Wrapper from "src/Components/Wrapper";
import Bold from "../../Components/Bold";
import Loader from "src/Components/Loader";
import { Link } from "react-router-dom";
import UserHeader from "../UserHeader";
import Avatar from "../Avatar";
import useGoogleAutocomplete from "../../autocompleteHelpers";
import { GOOGLE_PLACE_KEY } from "src/keys";

const SWrapper = styled(Wrapper)`
  z-index: 1;
`;

const UserRow = styled.div<ITheme>`
  display: grid;
  flex-direction: row;
  height: 50px;
  grid-template-columns: 5fr 0.5fr;
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

interface ITheme {
  active?: string;
}

interface IProps {
  search: string;
  activeId: number;
  searchData?: any;
  searchLoading: boolean;
}

const SearchPresenter: React.SFC<IProps> = ({
  search,
  activeId,
  searchData: {
    searchUsers: { users = null } = {},
    searchCities: { cities = null } = {},
    searchCountries: { countries = null } = {},
    searchContinents: { continents = null } = {}
  } = {},
  searchLoading
}) => {
  const { results, isLoading } = useGoogleAutocomplete({
    apiKey: `${GOOGLE_PLACE_KEY}`,
    query: search,
    options: {
      types: "(cities)",
      language: "en"
    }
  });
  if (searchLoading || isLoading) {
    return <Loader />;
  } else {
    return (
      <SWrapper>
        {users &&
          users.length > 0 &&
          users.map((user, index) => {
            let active;
            if (index === activeId) {
              active = "active";
            }
            return (
              <UserRow key={index} active={active}>
                <Link to={`/${user.username}`}>
                  <UserHeader
                    username={user.username}
                    currentCity={user.profile.currentCity.cityName}
                    currentCountry={
                      user.profile.currentCity.country.countryName
                    }
                    avatar={user.profile.avatar}
                    size={"sm"}
                  />
                </Link>
              </UserRow>
            );
          })}
        {results.predictions &&
          results.predictions.length > 0 &&
          results.predictions.map(prediction => (
            <UserRow key={prediction.id}>
              <Link to={`/city/${prediction.place_id}`}>
                <Header>
                  <SAvatar
                    size={"sm"}
                    url={prediction.structured_formatting.main_text}
                  />
                  <HeaderColumn>
                    <HeaderText
                      text={prediction.structured_formatting.main_text}
                    />
                    <Location>
                      {prediction.structured_formatting.secondary_text
                        ? prediction.structured_formatting.secondary_text
                        : prediction.structured_formatting.main_text}
                    </Location>
                  </HeaderColumn>
                </Header>
              </Link>
            </UserRow>
          ))}
        {/* {cities &&
          cities.length !== 0 &&
          cities.map(city => (
            <UserRow key={city.id}>
              <Link to={`/city/${city.cityId}`}>
                <Header>
                  <SAvatar size={"sm"} url={city.cityPhoto} />
                  <HeaderColumn>
                    <HeaderText text={city.cityName} />
                    <Location>{city.country.countryName}</Location>
                  </HeaderColumn>
                </Header>
              </Link>
            </UserRow>
          ))} */}
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
          results &&
          results.length === 0 &&
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
