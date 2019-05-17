import React from "react";
import { Link } from "react-router-dom";
import styled from "../../Styles/typed-components";

import Wrapper from "../../Components/Wrapper";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import Bold from "../../Components/Bold";
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

const GreyLine = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid grey;
  @media screen and (max-width: 935px) {
    margin: 0 10px 0 10px;
  }
`;

const UserRow = styled.div`
  display: grid;
  flex-direction: row;
  height: 50px;
  grid-template-columns: 5fr 1fr 1fr 1fr;
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

const GreyText = styled(Bold)`
  color: #999;
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

interface IProps {
  data?: any;
  loading: boolean;
  userName: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  cityList: any;
}

const CitiesPresenter: React.SFC<IProps> = ({
  data: { frequentVisits: { cities = null } = {} } = {},
  loading,
  userName,
  cityList,
  search,
  onChange
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && cities) {
    return (
      <>
        <SWrapper>
          <PHeader>
            <AvatarContainer>
              <CAvatar
                size="lg"
                url={
                  "https://image.fmkorea.com/files/attach/images/3842645/451/442/046/5b8bcef55357387016a4a5d5343249ea.jpg"
                }
              />
              total km
            </AvatarContainer>
            <UserContainer>
              <UserNameRow>
                <Username>{userName} Cities</Username>
                <Input
                  placeholder="Search"
                  value={search}
                  onChange={onChange}
                />
              </UserNameRow>
              {console.log(cityList)}
              {cityList.length !== 0 &&
                cityList.map(city => (
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
                    <GreyText text={`x ${city.count}`} />
                    <GreyText text={`${city.diff} d`} />
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
                    <Link to={`/city/${city.cityName}`}>
                      <Header>
                        <SAvatar size={"sm"} url={city.cityPhoto} />
                        <HeaderColumn>
                          <HeaderText text={city.cityName} />
                          <Location>{city.country.countryName}</Location>
                        </HeaderColumn>
                      </Header>
                    </Link>
                    <GreyText text={`x ${city.count}`} />
                    <GreyText text={`${city.diff} d`} />
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
          <GreyLine />
        </SWrapper>
      </>
    );
  }
  return null;
};

export default CitiesPresenter;
