import React from "react";
import { Link } from "react-router-dom";
import styled from "../../Styles/typed-components";

import Wrapper from "../../Components/Wrapper";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import Bold from "../../Components/Bold";
// import AvatarGrid from "../../Components/AvatarGrid";
import FollowBtn from "../../Components/FollowBtn";
import UserHeader from "../../Components/UserHeader";
import GetCards from "../../Components/GetCards";

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

const Input = styled.input`
  width: 215px;
  border: 0;
  border: ${props => props.theme.boxBorder};
  background-color: ${props => props.theme.bgColor};
  border-radius: 3px;
  padding: 5px;
  color: white;
  font-size: 14px;
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
  usersList: any;
}

const FollowingsPresenter: React.SFC<IProps> = ({
  data: { getFollowings: { profiles = null } = {} } = {},
  loading,
  userName,
  onChange,
  search,
  usersList
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && profiles) {
    return (
      <>
        <SWrapper>
          <PHeader>
            <AvatarContainer>
              <CAvatar
                size="lg"
                url={
                  "http://image.dongascience.com/Photo/2018/12/2d5efe44bdd02f3e2ec4e99189d89d18.jpg"
                }
              />
              <InfoRow>
                <SText text={String("undefined")} />
                Count
              </InfoRow>
            </AvatarContainer>
            <UserContainer>
              <UserNameRow>
                <Username>{userName} Followings</Username>
                <Input
                  placeholder="Search"
                  value={search}
                  onChange={onChange}
                />
              </UserNameRow>
              {usersList.length !== 0 &&
                usersList.map(user => (
                  <UserRow key={user.id}>
                    <Link to={`/${user.username}`}>
                      <UserHeader
                        username={user.username}
                        currentCity={user.currentCity.cityName}
                        currentCountry={user.currentCity.country.countryName}
                        avatar={user.avatar}
                        size={"sm"}
                      />
                    </Link>
                    {!user.isSelf && (
                      <FollowBtn
                        isFollowing={user.isFollowing}
                        userId={user.id}
                        username={user.username}
                      />
                    )}
                  </UserRow>
                ))}
              {usersList.length === 0 &&
                profiles &&
                profiles.map(profile => (
                  <UserRow key={profile.id}>
                    <Link to={`/${profile.username}`}>
                      <UserHeader
                        username={profile.username}
                        currentCity={profile.currentCity.cityName}
                        currentCountry={profile.currentCity.country.countryName}
                        avatar={profile.avatar}
                        size={"sm"}
                      />
                    </Link>
                    {!profile.isSelf && (
                      <FollowBtn
                        isFollowing={profile.isFollowing}
                        userId={profile.id}
                        username={profile.username}
                      />
                    )}
                  </UserRow>
                ))}
            </UserContainer>
          </PHeader>
          recommand Users
          {/* {coffees && coffees.length !== 0 ? (
            <>
              <SmallTitle>
                <SmallGreyLine />
                <SSText text={"COFFEES NOW"} />
              </SmallTitle>
              <AvatarGrid coffees={coffees} />
            </>
          ) : null} */}
          <GreyLine />
          <GetCards location={"followings"} userName={userName} />
        </SWrapper>
      </>
    );
  }
  return null;
};

export default FollowingsPresenter;
