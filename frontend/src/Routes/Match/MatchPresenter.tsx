import React from "react";
import styled from "../../Styles/typed-components";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader";
import UserHeader from "../../Components/UserHeader";
import FollowBtn from "../../Components/FollowBtn";
import CoffeeBtn from "src/Components/CoffeeBtn";
import Wrapper from "src/Components/Wrapper";
import Bold from "../../Components/Bold";

const SWrapper = styled(Wrapper)`
  max-width: 650px;
`;

const UserContainer = styled.div`
  margin-top: 30px;
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const GreyText = styled(Bold)`
  color: #999;
  font-weight: 100;
  margin-top: 5px;
`;

const UserRow = styled.div`
  display: grid;
  flex-direction: row;
  height: 50px;
  grid-template-columns: 2fr 1fr 0.5fr 0.5fr;
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
  font-size: 12px;
  &::placeholder {
    color: ${props => props.theme.greyColor};
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
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
            <Username>MATCHES</Username>
            <Input placeholder="Search" value={search} onChange={onChange} />
          </UserNameRow>
          {matchList.length !== 0 &&
            matchList.map(match => (
              <React.Fragment key={match.id}>
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
                    <Column>
                    <GreyText text={match.coffee.target} />
                    <GreyText text={match.naturalTime} />
                    </Column>
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
                    <Column>
                    <GreyText text={match.coffee.target} />
                    <GreyText text={match.naturalTime} />
                    </Column>
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
              </React.Fragment>
            ))}
          {matchList.length === 0 &&
            !search &&
            matches &&
            matches.map(match => (
              <React.Fragment key={match.id}>
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
                    <Column>
                    <GreyText text={match.coffee.target} />
                    <GreyText text={match.naturalTime} />
                    </Column>
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
                    <Column>
                    <GreyText text={match.coffee.target} />
                    <GreyText text={match.naturalTime} />
                    </Column>
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
              </React.Fragment>
            ))}
        </UserContainer>
      </SWrapper>
    );
  } else {
    return null;
  }
};

export default MatchPresenter;
