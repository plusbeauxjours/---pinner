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

const AvatarContainer = styled.div`
  display: flex;
  position: relative;
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

interface ITheme {
  active?: string;
}

interface IProps {
  data: any;
  loading: boolean;
  modalOpen: boolean;
  toggleModal: () => void;
  search: string;
  usersNowList: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loadMore: any;
  usersNowActiveId: number;
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onClick: any;
  onBlur: any;
}

const CountryUsersNowPresenter: React.SFC<IProps> = ({
  data: { countryUsersNow: { usersNow = null, hasNextPage = null } = {} } = {},
  loading,
  modalOpen,
  toggleModal,
  search,
  usersNowList,
  onChange,
  loadMore,
  usersNowActiveId,
  onKeyDown,
  onClick,
  onBlur
}) => {
  return (
    <>
      <SWrapper>
        <UserContainer>
          <UserNameRow>
            <Username>USERS NOW</Username>
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
              {usersNowList.length !== 0 &&
                usersNowList.map((user, index) => {
                  let active;
                  if (index === usersNowActiveId) {
                    active = "active";
                  }
                  return (
                    <UserRow key={user.id} active={active}>
                      <Link to={`/${user.profile.username}`}>
                        <AvatarContainer>
                          <Avatar size={"sm"} url={user.profile.avatar} />
                          <HeaderColumn>
                            <CText text={user.profile.username} />
                            <Explain>with same nationality</Explain>
                          </HeaderColumn>
                        </AvatarContainer>
                      </Link>
                    </UserRow>
                  );
                })}
              {console.log("hasNextPage:  ", hasNextPage)}
              {usersNowList.length === 0 &&
                !search &&
                usersNow &&
                usersNow.map((user, index) => {
                  let active;
                  if (index === usersNowActiveId) {
                    active = "active";
                  }
                  return (
                    <UserRow key={user.id} active={active}>
                      <Link to={`/${user.profile.username}`}>
                        <AvatarContainer>
                          <Avatar size={"sm"} url={user.profile.avatar} />
                          <HeaderColumn>
                            <CText text={user.profile.username} />
                            <Explain>with same nationality</Explain>
                          </HeaderColumn>
                        </AvatarContainer>
                      </Link>
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

export default CountryUsersNowPresenter;
