import React from "react";
import styled from "../../Styles/typed-components";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader";
import UserHeader from "../../Components/UserHeader";
import FollowBtn from "../../Components/FollowBtn";
import CoffeeBtn from "src/Components/CoffeeBtn";
import Wrapper from "src/Components/Wrapper";

const SWrapper = styled(Wrapper)`
  max-width: 650px;
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
  grid-template-columns: 4fr 0.5fr 0.5fr;
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

const Username = styled.span`
  text-align: center;
  font-size: 22px;
  font-weight: 100;
`;

const UserNameRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
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
  data: any;
  loading: boolean;
  search: string;
  matchList: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MatchPresenter: React.SFC<IProps> = ({
  data: { getMatches: { matches = null } = {} } = {},
  loading,
  search,
  matchList,
  onChange
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && matches) {
    return (
      <SWrapper>
        <UserContainer>
          <UserNameRow>
            <Username>Matches</Username>
            <Input placeholder="Search" value={search} onChange={onChange} />
          </UserNameRow>
          {matchList.length !== 0 &&
            matchList.map(user => (
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
          {matchList.length === 0 &&
            !search &&
            matches &&
            matches.map(match => (
              <>
                {match.isGuest ? (
                  <UserRow key={match.id}>
                    <Link to={`/${match.host.profile.username}`}>
                      <UserHeader
                        username={match.host.profile.username}
                        currentCity={match.host.profile.currentCity.cityName}
                        currentCountry={
                          match.host.profile.currentCity.country.countryName
                        }
                        avatar={match.host.profile.avatar}
                        size={"sm"}
                      />
                    </Link>
                    {status}
                    <FollowBtn
                      isFollowing={match.host.profile.isFollowing}
                      userId={match.host.profile.id}
                      username={match.host.profile.username}
                    />
                    {match.isMatching ? (
                      <CoffeeBtn
                        isMatching={match.isMatching}
                        matchId={match.id}
                      />
                    ) : null}
                  </UserRow>
                ) : (
                  <UserRow key={match.id}>
                    <Link to={`/${match.guest.profile.username}`}>
                      <UserHeader
                        username={match.guest.profile.username}
                        currentCity={match.guest.profile.currentCity.cityName}
                        currentCountry={
                          match.guest.profile.currentCity.country.countryName
                        }
                        avatar={match.guest.profile.avatar}
                        size={"sm"}
                      />
                    </Link>
                    {status}
                    <FollowBtn
                      isFollowing={match.guest.profile.isFollowing}
                      userId={match.guest.profile.id}
                      username={match.guest.profile.username}
                    />
                    {match.isMatching ? (
                      <CoffeeBtn
                        isMatching={match.isMatching}
                        matchId={match.id}
                      />
                    ) : null}
                  </UserRow>
                )}
              </>
            ))}
        </UserContainer>
      </SWrapper>
    );
  } else {
    return null;
  }
};

export default MatchPresenter;
