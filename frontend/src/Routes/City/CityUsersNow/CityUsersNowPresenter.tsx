import React from "react";
import styled from "src/Styles/typed-components";
import Wrapper from "src/Components/Wrapper";
import Loader from "src/Components/Loader";

import InfiniteScroll from "react-infinite-scroller";
import { Link } from "react-router-dom";
import Avatar from "../../../Components/Avatar";
import Bold from "../../../Components/Bold";
import { BACKEND_URL } from "src/constants";

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
  background-color: ${props => props.theme.bgColor};
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
  usersNowList: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loadMore: any;
  cityId: string;
}

const CityUsersNowPresenter: React.FunctionComponent<IProps> = ({
  data: { cityUsersNow: { usersNow = null, hasNextPage = null } = {} } = {},
  loading,
  modalOpen,
  toggleModal,
  search,
  usersNowList,
  onChange,
  loadMore,
  cityId
}) => {
  return (
    <>
      <SWrapper>
        <UserContainer>
          <UserNameRow>
            <Username>USERS NOW</Username>
            <Input
              placeholder="Search users who is in this city"
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
              {usersNowList.length !== 0 &&
                usersNowList.map((user, index) => (
                  <UserRow key={user.id}>
                    <Link to={`/${user.profile.username}`}>
                      <AvatarContainer>
                        <Avatar
                          size={"sm"}
                          url={
                            user.profile.avatarUrl
                              ? `${BACKEND_URL}/media/${user.profile.avatarUrl}`
                              : "https://banner2.kisspng.com/20180613/vtt/kisspng-computer-icons-avatar-user-profile-icon-design-cli-5b2114b0368752.5561258815288946402234.jpg"
                          }
                        />
                        <HeaderColumn>
                          <CText text={user.profile.username} />
                          <Explain>with same nationality</Explain>
                        </HeaderColumn>
                      </AvatarContainer>
                    </Link>
                  </UserRow>
                ))}
              {console.log("hasNextPage:  ", hasNextPage)}
              {usersNowList.length === 0 &&
                !search &&
                usersNow &&
                usersNow.map((user, index) => (
                  <UserRow key={user.id}>
                    <Link to={`/${user.profile.username}`}>
                      <AvatarContainer>
                        <Avatar
                          size={"sm"}
                          url={
                            user.profile.avatarUrl
                              ? `${BACKEND_URL}/media/${user.profile.avatarUrl}`
                              : "https://banner2.kisspng.com/20180613/vtt/kisspng-computer-icons-avatar-user-profile-icon-design-cli-5b2114b0368752.5561258815288946402234.jpg"
                          }
                        />
                        <HeaderColumn>
                          <CText text={user.profile.username} />
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

export default CityUsersNowPresenter;
