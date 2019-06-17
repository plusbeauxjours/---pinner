import React from "react";
import styled from "src/Styles/typed-components";
import Wrapper from "src/Components/Wrapper";
import Loader from "src/Components/Loader";

import InfiniteScroll from "react-infinite-scroller";
import { Link } from "react-router-dom";
import UserHeader from "../../../Components/UserHeader";

const SWrapper = styled(Wrapper)`
  max-width: 650px;
`;

const UserContainer = styled.div`
  margin-top: 30px;
  display: flex;
  width: 100%;
  flex-direction: column;
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
  border-bottom: 1px solid grey;
`;

const UserNameRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Username = styled.span`
  text-align: center;
  font-size: 22px;
  font-weight: 100;
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

const Container = styled.div``;

interface ITheme {
  active?: string;
}

interface IProps {
  data: any;
  loading: boolean;
  modalOpen: boolean;
  toggleModal: () => void;
  search: string;
  usersBeforeList: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loadMore: any;
  cityId: string;
  usersBeforeActiveId: number;
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onClick: any;
  onBlur: any;
}

const CityUsersBeforePresenter: React.SFC<IProps> = ({
  data: {
    cityUsersBefore: { usersBefore = null, hasNextPage = null } = {}
  } = {},
  loading,
  modalOpen,
  toggleModal,
  search,
  usersBeforeList,
  onChange,
  loadMore,
  cityId,
  usersBeforeActiveId,
  onKeyDown,
  onClick,
  onBlur
}) => {
  return (
    <>
      <SWrapper>
        <UserContainer>
          <UserNameRow>
            <Username>USERS BEFORE</Username>
            <Input
              placeholder="Search"
              value={search}
              onChange={onChange}
              onKeyDown={onKeyDown}
              onClick={onClick}
              onBlur={onBlur}
            />
          </UserNameRow>
          {loading && <Loader />}
          {!loading && (
            <InfiniteScroll
              hasMore={hasNextPage}
              loadMore={loadMore}
              pageStart={0}
              initialLoad={false}
            >
              {usersBeforeList.length !== 0 &&
                usersBeforeList.map((user, index) => {
                  let active;
                  if (index === usersBeforeActiveId) {
                    active = "active";
                  }
                  return (
                    <UserRow active={active} key={index}>
                      <Link to={`/${user.actor.profile.username}`}>
                        <UserHeader
                          username={user.actor.profile.username}
                          currentCity={user.actor.profile.currentCity.cityName}
                          currentCountry={
                            user.actor.profile.currentCity.country.countryName
                          }
                          avatar={user.actor.profile.avatar}
                          size={"sm"}
                        />
                        <Explain>{user.naturalTime}</Explain>
                      </Link>
                    </UserRow>
                  );
                })}
              {usersBeforeList.length === 0 &&
                !search &&
                usersBefore &&
                usersBefore.map((user, index) => {
                  let active;
                  if (index === usersBeforeActiveId) {
                    active = "active";
                  }
                  return (
                    <Container key={index}>
                      <Link to={`/${user.actor.profile.username}`}>
                        <UserRow active={active}>
                          <UserHeader
                            username={user.actor.profile.username}
                            currentCity={
                              user.actor.profile.currentCity.cityName
                            }
                            currentCountry={
                              user.actor.profile.currentCity.country.countryName
                            }
                            avatar={user.actor.profile.avatar}
                            size={"sm"}
                          />
                          <Explain>{user.naturalTime}</Explain>
                        </UserRow>
                      </Link>
                    </Container>
                  );
                })}
            </InfiniteScroll>
          )}
        </UserContainer>
      </SWrapper>
    </>
  );
};

export default CityUsersBeforePresenter;
