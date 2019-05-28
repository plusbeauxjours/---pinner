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

const UserNameRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const AvatarContainer = styled.div`
  display: flex;
  position: relative;
`;

const LocationAvatarContainer = styled(AvatarContainer)`
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

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  @media screen and (max-width: 935px) {
    margin-left: 10px;
  }
`;
const SeeAll = styled.p`
  font-size: 12px;
  font-weight: 100;
  cursor: pointer;
`;

const Container = styled.div`
  -webkit-box-flex: 0;
  padding: 15px;
`;

const Box = styled.div`
  max-width: 905px;
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(3, 50px);
  grid-auto-columns: 400px;
  column-gap: 10px;
  overflow-x: auto;
  padding-bottom: 15px;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  ::-webkit-scrollbar {
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: ${props => props.theme.bgColor};
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    background-color: ${props => props.theme.greyColor};
  }
`;

const HeaderColumn = styled.div`
  margin-left: 15px;
`;

const CText = styled(Bold)`
  display: flex;
`;

const Location = styled.span`
  display: flex;
  margin-top: 5px;
  position: block;
  font-size: 12px;
  font-weight: 200;
`;

const Explain = styled(Location)`
  color: grey;
`;

interface ITheme {
  active?: string;
}

interface IProps {
  data?: any;
  loading: boolean;
  recommandUsersData: any;
  recommandUsersLoading: boolean;
  userName: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  usersList: any;
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onClick: any;
  onBlur: any;
  activeId: number;
}

const FollowingsPresenter: React.SFC<IProps> = ({
  data: { getFollowings: { profiles = null } = {} } = {},
  loading,
  recommandUsersData: { recommandUsers: { users = null } = {} } = {},
  recommandUsersLoading,
  userName,
  onChange,
  search,
  usersList,
  onKeyDown,
  onClick,
  onBlur,
  activeId
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && profiles) {
    return (
      <>
        <SWrapper>
          <PHeader>
            <LocationAvatarContainer>
              <CAvatar size="lg" url={"http://localhost:8000/media/281.jpg"} />
              <InfoRow>
                <SText text={String("undefined")} />
                Count
              </InfoRow>
            </LocationAvatarContainer>
            <UserContainer>
              <UserNameRow>
                <Username>{userName} Followings</Username>
                <Input
                  placeholder="Search"
                  value={search}
                  onChange={onChange}
                  onKeyDown={onKeyDown}
                  onClick={onClick}
                  onBlur={onBlur}
                />
              </UserNameRow>
              {usersList.length !== 0 &&
                usersList.map((user, index) => {
                  let active;
                  if (index === activeId) {
                    active = "active";
                  }
                  return (
                    <UserRow key={user.index} active={active}>
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
                  );
                })}
              {usersList.length === 0 &&
                !search &&
                profiles &&
                profiles.map((profile, index) => {
                  let active;
                  if (index === activeId) {
                    active = "active";
                  }
                  return (
                    <UserRow key={profile.index} active={active}>
                      <Link to={`/${profile.username}`}>
                        <UserHeader
                          username={profile.username}
                          currentCity={profile.currentCity.cityName}
                          currentCountry={
                            profile.currentCity.country.countryName
                          }
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
                  );
                })}
            </UserContainer>
          </PHeader>
          <GreyLine />
          <Title>
            <SText text={"RECOMMAND USER"} />
            <Link to={`/people`}>
              <SeeAll>SEE ALL</SeeAll>
            </Link>
          </Title>
          <Container>
            <Box>
              {users &&
                users.map(user => {
                  return (
                    <UserRow key={user.id}>
                      <Link to={`/${user.username}`}>
                        <AvatarContainer>
                          <Avatar size={"sm"} url={user.profile.avatar} />
                          <HeaderColumn>
                            <CText text={user.username} />
                            <Explain>with same nationality</Explain>
                          </HeaderColumn>
                        </AvatarContainer>
                      </Link>
                      {!user.isSelf && (
                        <FollowBtn
                          isFollowing={user.profile.isFollowing}
                          userId={user.id}
                          username={user.username}
                        />
                      )}
                    </UserRow>
                  );
                })}
            </Box>
          </Container>
          {/* {coffees && coffees.length !== 0 ? (
            <>
              <SmallTitle>
                <SmallGreyLine />
                <SSText text={"COFFEES NOW"} />
              </SmallTitle>
              <AvatarGrid coffees={coffees} />
            </>
          ) : null} */}
          <GetCards location={"followings"} userName={userName} />
        </SWrapper>
      </>
    );
  }
  return null;
};

export default FollowingsPresenter;
