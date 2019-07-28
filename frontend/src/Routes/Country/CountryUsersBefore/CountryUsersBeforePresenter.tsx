import React from "react";
import styled from "src/Styles/typed-components";
import Wrapper from "src/Components/Wrapper";
import Loader from "src/Components/Loader";

import InfiniteScroll from "react-infinite-scroller";
import { Link } from "react-router-dom";
import Avatar from "../../../Components/Avatar";
import Bold from "../../../Components/Bold";

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
  &:not(:last-child) {
    border-bottom: 1px solid rgba(128, 128, 128, 0.5);
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
  border-bottom: 1px solid rgba(128, 128, 128, 0.5);
  background-color: ${props => props.theme.darkModeBgColor};
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

const AvatarContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
`;

const HeaderColumn = styled.div`
  margin-left: 15px;
`;

const CText = styled(Bold)`
  display: flex;
`;

const Explain = styled(Location)`
  color: grey;
`;

interface IProps {
  data: any;
  loading: boolean;
  modalOpen: boolean;
  toggleModal: () => void;
  search: string;
  usersBeforeList: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loadMore: any;
}

const CountryUsersBeforePresenter: React.FunctionComponent<IProps> = ({
  data: {
    countryUsersBefore: { usersBefore = null, hasNextPage = null } = {}
  } = {},
  loading,
  modalOpen,
  toggleModal,
  search,
  usersBeforeList,
  onChange,
  loadMore
}) => {
  return (
    <>
      <SWrapper>
        <UserContainer>
          <UserNameRow>
            <Username>USERS BEFORE</Username>
            <Input
              placeholder="Search users who has been this country"
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
                      <AvatarContainer>
                        <Avatar
                          size={"sm"}
                          url={user.actor.profile.avatarUrl}
                        />
                        <HeaderColumn>
                          <CText text={user.actor.profile.username} />
                          <Explain>with same nationality</Explain>
                        </HeaderColumn>
                      </AvatarContainer>
                    </Link>
                  </UserRow>
                ))}
              {usersBeforeList.length === 0 &&
                !search &&
                usersBefore &&
                usersBefore.map(user => (
                  <UserRow key={user.actor.profile.id}>
                    <Link to={`/${user.actor.profile.username}`}>
                      <AvatarContainer>
                        <Avatar
                          size={"sm"}
                          url={user.actor.profile.avatarUrl}
                        />
                        <HeaderColumn>
                          <CText text={user.actor.profile.username} />
                          <Explain>with same nationality</Explain>
                        </HeaderColumn>
                      </AvatarContainer>
                    </Link>
                  </UserRow>
                ))}
            </InfiniteScroll>
          )}
        </UserContainer>
      </SWrapper>
    </>
  );
};

export default CountryUsersBeforePresenter;
