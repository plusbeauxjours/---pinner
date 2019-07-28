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
  border-bottom: 1px solid rgba(128, 128, 128, 0.5);
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
  border-bottom: 1px solid rgba(128, 128, 128, 0.5);
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
}

const CityUsersBeforePresenter: React.FunctionComponent<IProps> = ({
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
  cityId
}) => {
  return (
    <>
      <SWrapper>
        <UserContainer>
          <UserNameRow>
            <Username>USERS BEFORE</Username>
            <Input
              placeholder="Search users who has been this city"
              value={search}
              onChange={onChange}
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
                usersBeforeList.map(user => (
                  <UserRow key={user.actor.profile.id}>
                    <Link to={`/${user.actor.profile.username}`}>
                      <UserHeader
                        username={user.actor.profile.username}
                        currentCity={user.actor.profile.currentCity.cityName}
                        currentCountry={
                          user.actor.profile.currentCity.country.countryName
                        }
                        avatar={user.actor.profile.avatarUrl}
                        size={"sm"}
                      />
                      <Explain>{user.naturalTime}</Explain>
                    </Link>
                  </UserRow>
                ))}
              {usersBeforeList.length === 0 &&
                !search &&
                usersBefore &&
                usersBefore.map(user => (
                  <Container key={user.actor.profile.id}>
                    <Link to={`/${user.actor.profile.username}`}>
                      <UserRow>
                        <UserHeader
                          username={user.actor.profile.username}
                          currentCity={user.actor.profile.currentCity.cityName}
                          currentCountry={
                            user.actor.profile.currentCity.country.countryName
                          }
                          avatar={user.actor.profile.avatarUrl}
                          size={"sm"}
                        />
                        <Explain>{user.naturalTime}</Explain>
                      </UserRow>
                    </Link>
                  </Container>
                ))}
            </InfiniteScroll>
          )}
        </UserContainer>
      </SWrapper>
    </>
  );
};

export default CityUsersBeforePresenter;
