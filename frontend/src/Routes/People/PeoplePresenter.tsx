import React from "react";
import CardDetail from "../../Routes/CardDetail";
import styled from "src/Styles/typed-components";
import Wrapper from "src/Components/Wrapper";
import Loader from "src/Components/Loader";
import { Route } from "react-router";

import InfiniteScroll from "react-infinite-scroller";
import UserHeader from "../../Components/UserHeader";
import { Link } from "react-router-dom";
import FollowBtn from "src/Components/FollowBtn";

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

interface IProps {
  recommandUsersData: any;
  recommandUsersLoading: boolean;
  modalOpen: boolean;
  toggleModal: () => void;
  search: string;
  recommandUserList: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loadMore: any;
}

const PeoplePresenter: React.SFC<IProps> = ({
  recommandUsersData: {
    recommandUsers: { users = null, hasNextPage = null } = {}
  } = {},
  recommandUsersLoading,
  modalOpen,
  search,
  recommandUserList,
  onChange,
  loadMore
}) => {
  return (
    <>
      {modalOpen && <Route path="/p/:id" component={CardDetail} />}
      <SWrapper>
        <UserContainer>
          <UserNameRow>
            <Username>RECOMMAND USERS</Username>
            <Input placeholder="Search" value={search} onChange={onChange} />
          </UserNameRow>
          {recommandUsersLoading && <Loader />}
          {!recommandUsersLoading && (
            <InfiniteScroll
              hasMore={hasNextPage}
              loadMore={loadMore}
              pageStart={0}
              initialLoad={false}
            >
              {recommandUserList.length !== 0 &&
                recommandUserList.map(user => {
                  return (
                    <UserRow key={user.id}>
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
              {console.log("hasNextPage:  ", hasNextPage)}
              {recommandUserList.length === 0 &&
                !search &&
                users &&
                users.map(user => {
                  return (
                    <UserRow key={user.id}>
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
            </InfiniteScroll>
          )}
        </UserContainer>
      </SWrapper>
    </>
  );
};

export default PeoplePresenter;
