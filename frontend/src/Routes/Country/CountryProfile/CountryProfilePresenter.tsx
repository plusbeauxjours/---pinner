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
import LocationBox from "src/Components/LocationBox";
// import { Right } from "../../../Icons";

const SWrapper = styled(Wrapper)`
  z-index: 1;
`;

const PHeader = styled.header`
  display: flex;
  padding: 40px 15px 40px 15px;
  @media screen and (max-width: 700px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

// const InfoRow = styled.div`
//   display: flex;
//   flex-wrap: nowrap;
//   align-items: center;
//   padding-left: 5px;
//   margin-bottom: 5px;
// `;

const SText = styled(Bold)`
  font-size: 18px;
  font-weight: 100;
  text-transform: uppercase;
`;

// const SSText = styled(Bold)`
//   width: 45px;
//   font-size: 25px;
//   font-weight: 200;
//   text-align: center;
// `;

const GreyLine = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.5);
  @media screen and (max-width: 935px) {
    margin: 10px 10px 0 10px;
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
    background-color: rgba(128, 128, 128, 0.5);
  }
  &:not(:last-child) {
    border-bottom: 1px solid rgba(128, 128, 128, 0.5);
  }
`;

const CAvatar = styled(Avatar)`
  border-radius: 3px;
  height: 300px;
  width: 300px;
  margin-right: 20px;
  @media screen and (max-width: 700px) {
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
  cursor: pointer;
  height: 50px;
  padding-left: 5px;
`;

const LocationHeader = styled(Header)`
  margin-top: 10px;
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
  border-bottom: 1px solid rgba(128, 128, 128, 0.5);
  background-color: ${props => props.theme.bgColor};
  padding: 5px;
  color: white;
  font-size: 12px;
  font-weight: 100;
  &:focus {
    outline: none;
    &::-webkit-input-placeholder {
      color: transparent;
    }
  }
  &::placeholder {
    color: ${props => props.theme.greyColor};
    text-align: right;
  }
`;

const LocationContainer = styled.span`
  margin: 5px 5px 5px 0;
`;

const LocationName = styled.span`
  font-size: 30px;
  font-weight: 300;
  margin-right: 5px;
  text-transform: uppercase;
`;

const Flag = styled.span`
  font-size: 20px;
`;

// const RightIcon = styled.div`
//   position: absolute;
//   display: flex;
//   margin-left: 941px;
//   top: 40%;
//   svg {
//     fill: white;
//   }
// `;

// const LeftIcon = styled.div`
//   position: absolute;
//   display: flex;
//   margin-left: -30px;
//   top: 40%;
//   svg {
//     fill: white;
//   }
// `;

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

  countryCode: string;
  currentCityId: string;
  back: (event) => void;
}

const CountryProfilePresenter: React.FunctionComponent<IProps> = ({
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

  countryCode,
  currentCityId
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && cities && usersNow && usersBefore && country) {
    return (
      <>
        <SWrapper>
          {/* <LeftIcon>
            <Link
              to={{
                pathname: `/country/${city.country.countryCode}`,
                state: { countryName: city.country.countryName }
              }}
            >
              <Left />
            </Link>
          </LeftIcon> */}
          {/* <RightIcon>
            <Link
              to={{
                pathname: `/continent/${country.continent.continentCode}`,
                state: { countryName: country.continent.continentName }
              }}
            >
              <Right />
            </Link>
          </RightIcon> */}
          <PHeader>
            <AvatarContainer>
              <CAvatar size="lg" url={country.countryPhoto} city={true} />
              <LocationContainer>
                <LocationName>{country.countryName}</LocationName>
                <Flag>{country.countryEmoji}</Flag>
              </LocationContainer>
              {/* <InfoRow>
                <SSText text={String(country.distance)} />
                TIME DIFFERENCE
              </InfoRow>
              <InfoRow>
                <SSText text={String(country.countryCapital)} />
                countryCapital
              </InfoRow>
              <InfoRow>
                <SSText text={String(country.countryCurrency)} />
                countryCurrency
              </InfoRow>
              <InfoRow>
                <SSText text={String(country.language)} />
                language
              </InfoRow> */}
              <Link
                to={{
                  pathname: `/continent/${country.continent.continentCode}`,
                  state: { continentName: country.continent.continentName }
                }}
              >
                <LocationHeader>
                  <SAvatar
                    size={"sm"}
                    url={country.continent.continentPhoto}
                    city={true}
                  />
                  <HeaderColumn>
                    <HeaderText text={country.continent.continentName} />
                  </HeaderColumn>
                </LocationHeader>
              </Link>
            </AvatarContainer>
            <UserContainer>
              <UserNameRow>
                <SText text={country.cityCount === 1 ? `CITY` : `CITIES`} />
                <Input
                  placeholder="Search user who is in this country"
                  value={search}
                  onChange={onChange}
                />
              </UserNameRow>
              {cityList.length !== 0 &&
                cityList.map(city => (
                  <UserRow key={city.id}>
                    <Link to={`/city/${city.cityId}`}>
                      <Header>
                        <SAvatar size={"sm"} url={city.cityPhoto} city={true} />
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
                ))}
              {cityList.length === 0 &&
                !search &&
                cities &&
                cities.map(city => (
                  <UserRow key={city.id}>
                    <Link to={`/city/${city.cityId}`}>
                      <Header>
                        <SAvatar size={"sm"} url={city.cityPhoto} city={true} />
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
                ))}
            </UserContainer>
          </PHeader>
          {usersNow && usersNow.length !== 0 ? (
            <>
              <GreyLine />
              <UserBox
                users={usersNow}
                currentCountryCode={countryCode}
                type={"usersNow"}
              />
            </>
          ) : null}
          {usersBefore && usersBefore.length !== 0 ? (
            <>
              <GreyLine />
              <UserBox
                users={usersBefore}
                currentCountryCode={countryCode}
                type={"usersBefore"}
              />
            </>
          ) : null}
          <CoffeeBox
            coffees={coffees}
            coffeeLoading={coffeeLoading}
            cityId={currentCityId}
            currentCountryCode={countryCode}
          />
          <LocationBox
            countries={countries}
            loading={countriesLoading}
            title={`${country.continent.continentName}`}
          />
        </SWrapper>
      </>
    );
  }
  return null;
};

export default CountryProfilePresenter;
