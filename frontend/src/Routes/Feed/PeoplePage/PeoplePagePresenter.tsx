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
  margin: 0 15px 0 15px;
  grid-gap: 15px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${props => props.theme.hoverColor};
  }
  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.borderColor};
  }
`;

const Input = styled.input`
  width: 215px;
  border: 0;
  border-bottom: 1px solid ${props => props.theme.borderColor};
  padding: 5px;
  color: ${props => props.theme.color};
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

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 935px) {
    margin: 10px 15px 10px 15px;
  }
`;

const SText = styled(Bold)`
  font-size: 18px;
  font-weight: 100;
  text-transform: uppercase;
`;

interface IProps {
  recommandUsersData: any;
  recommandUsersLoading: boolean;
  search: string;
  recommandUserList: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loadMore: any;
}

const PeoplePagePresenter: React.FunctionComponent<IProps> = ({
  recommandUsersData: {
    recommandUsers: { users = null, hasNextPage = null } = {}
  } = {},
  recommandUsersLoading,
  search,
  recommandUserList,
  onChange,
  loadMore
}) => {
  return (
    <>
      <SWrapper>
        {console.log}
        <UserContainer>
          <Title>
            <SText text={"RECOMMAND USERS"} />
            <Input
              placeholder="Search users who is recommanded"
              value={search}
              onChange={onChange}
            />
          </Title>
          {recommandUsersLoading && <Loader />}
          {!recommandUsersLoading && (
            <InfiniteScroll
              hasMore={hasNextPage}
              loadMore={loadMore}
              pageStart={0}
            >
              {recommandUserList.length !== 0 &&
                recommandUserList.map(user => {
                  return (
                    <UserRow key={user.profile.id}>
                      <Link to={`/${user.profile.username}`}>
                        <AvatarContainer>
                          <Avatar size={"sm"} url={user.profile.avatarUrl} />
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
              {recommandUserList.length === 0 &&
                !search &&
                users &&
                users.map(user => {
                  return (
                    <UserRow key={user.profile.id}>
                      <Link to={`/${user.profile.username}`}>
                        <AvatarContainer>
                          <Avatar size={"sm"} url={user.profile.avatarUrl} />
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

export default PeoplePagePresenter;
