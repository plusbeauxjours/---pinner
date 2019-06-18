import React from "react";
import styled from "../../../Styles/typed-components";
import { Link } from "react-router-dom";

import Wrapper from "../../../Components/Wrapper";
import Loader from "../../../Components/Loader";
import Avatar from "../../../Components/Avatar";
import Bold from "../../../Components/Bold";
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
  align-items: center;
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

interface ITheme {
  active?: string;
}

interface IProps {
  data?: any;
  loading: boolean;
  coffeeData?: any;
  coffeeLoading: boolean;
  continentCode: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  countryList: any;
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onClick: any;
  onBlur: any;
  activeId: number;
  currentCityId: string;
}

const ContinentProfilePresenter: React.SFC<IProps> = ({
  data: {
    continentProfile: {
      continent = null,
      countries = null,
      usersNow = null,
      usersBefore = null,
      continents = null
    } = {}
  } = {},
  loading,
  coffeeData: { getCoffees: { coffees = null } = {} } = {},
  coffeeLoading,
  continentCode,
  onChange,
  search,
  countryList,
  onKeyDown,
  onClick,
  onBlur,
  activeId,
  currentCityId
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && continent) {
    return (
      <>
        <SWrapper>
          <PHeader>
            <AvatarContainer>
              <CAvatar size="lg" url={continent.continentPhoto} />
              <InfoRow>
                <SText text={String(continent.countryCount)} />
                cities
              </InfoRow>
            </AvatarContainer>
            <UserContainer>
              <UserNameRow>
                <Username>{continent.continentName}</Username>
                <Input
                  placeholder="Search"
                  value={search}
                  onChange={onChange}
                  onKeyDown={onKeyDown}
                  onClick={onClick}
                  onBlur={onBlur}
                />
              </UserNameRow>
              {countryList.length !== 0 &&
                countryList.map((country, index) => {
                  let active;
                  if (index === activeId) {
                    active = "active";
                  }
                  return (
                    <UserRow key={index} active={active}>
                      <Link
                        to={{
                          pathname: `/country/${country.countryCode}`,
                          state: { countryName: country.countryName }
                        }}
                      >
                        <Header>
                          <SAvatar size={"sm"} url={country.countryPhoto} />
                          <HeaderColumn>
                            <HeaderText text={country.countryName} />
                            <Location>
                              {country.continent.continentName}
                            </Location>
                          </HeaderColumn>
                        </Header>
                      </Link>
                    </UserRow>
                  );
                })}
              {countryList.length === 0 &&
                !search &&
                countries &&
                countries.map((country, index) => {
                  let active;
                  if (index === activeId) {
                    active = "active";
                  }
                  return (
                    <UserRow key={index} active={active}>
                      <Link
                        to={{
                          pathname: `/country/${country.countryCode}`,
                          state: { countryName: country.countryName }
                        }}
                      >
                        <Header>
                          <SAvatar size={"sm"} url={country.countryPhoto} />
                          <HeaderColumn>
                            <HeaderText text={country.countryName} />
                            <Location>
                              {country.continent.continentName}
                            </Location>
                          </HeaderColumn>
                        </Header>
                      </Link>
                    </UserRow>
                  );
                })}
            </UserContainer>
          </PHeader>
          {usersNow && usersNow.length !== 0 ? (
            <>
              <GreyLine />
              <UserBox
                users={usersNow}
                currentContinentCode={continentCode}
                type={"usersNow"}
              />
            </>
          ) : null}
          {usersBefore && usersBefore.length !== 0 ? (
            <>
              <GreyLine />
              <UserBox
                users={usersBefore}
                currentContinentCode={continentCode}
                type={"usersBefore"}
              />
            </>
          ) : null}
          <CoffeeBox
            coffees={coffees}
            coffeeLoading={coffeeLoading}
            cityId={currentCityId}
            currentContinentCode={continentCode}
          />
        </SWrapper>
      </>
    );
  } else {
    return null;
  }
};

export default ContinentProfilePresenter;
