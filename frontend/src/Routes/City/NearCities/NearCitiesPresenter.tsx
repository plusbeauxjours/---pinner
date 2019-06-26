import React from "react";
import styled from "src/Styles/typed-components";
import Wrapper from "src/Components/Wrapper";
import Loader from "src/Components/Loader";

import InfiniteScroll from "react-infinite-scroller";
import { Link } from "react-router-dom";
import Avatar from "../../../Components/Avatar";
import CityLikeBtn from "../../../Components/CityLikeBtn";
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
  grid-template-columns: 4fr 1fr 1fr;
  padding: 0 5px 0 5px;
  grid-gap: 15px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  background-color: ${props => (props.active ? "grey" : null)};
  &:hover {
    background-color: grey;
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

const Header = styled.header`
  display: flex;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
`;

const HeaderText = styled(Bold)`
  display: flex;
`;

const SAvatar = styled(Avatar)`
  border-radius: 3px;
  height: 45px;
  width: 45px;
`;

const Text = styled.p`
  font-weight: 300;
  display: flex;
  align-items: center;
`;

const HeaderColumn = styled.div`
  margin-left: 15px;
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
  nearCitiesList: any;
  nearCitiesActiveId: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loadMore: any;
  cityId: string;
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onClick: any;
  onBlur: any;
}

const NearCitiesPresenter: React.FunctionComponent<IProps> = ({
  data: { nearCities: { cities = null, hasNextPage = null } = {} } = {},
  loading,
  modalOpen,
  toggleModal,
  search,
  nearCitiesList,
  nearCitiesActiveId,
  onChange,
  loadMore,
  cityId,
  onKeyDown,
  onClick,
  onBlur
}) => {
  return (
    <>
      <SWrapper>
        <UserContainer>
          <UserNameRow>
            <Username>NEAR CITIES</Username>
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
              {nearCitiesList.length !== 0 &&
                nearCitiesList.map((nearCity, index) => {
                  let active;
                  if (index === nearCitiesActiveId) {
                    active = "active";
                  }
                  return (
                    <UserRow key={nearCity.id} active={active}>
                      <Link to={`/city/${nearCity.cityId}`}>
                        <Header>
                          <SAvatar size={"sm"} url={nearCity.cityPhoto} />
                          <HeaderColumn>
                            <HeaderText text={nearCity.cityName} />
                            <Location>{nearCity.country.countryName}</Location>
                          </HeaderColumn>
                        </Header>
                      </Link>
                      <CityLikeBtn
                        isLiked={nearCity.isLiked}
                        cityId={nearCity.id}
                        likeCount={nearCity.likeCount}
                        type={"row"}
                      />
                      <Text>{nearCity.distance}km</Text>
                    </UserRow>
                  );
                })}
              {nearCitiesList.length === 0 &&
                !search &&
                cities &&
                cities.map((nearCity, index) => {
                  let active;
                  if (index === nearCitiesActiveId) {
                    active = "active";
                  }
                  return (
                    <UserRow key={nearCity.id} active={active}>
                      <Link to={`/city/${nearCity.cityId}`}>
                        <Header>
                          <SAvatar size={"sm"} url={nearCity.cityPhoto} />
                          <HeaderColumn>
                            <HeaderText text={nearCity.cityName} />
                            <Location>{nearCity.country.countryName}</Location>
                          </HeaderColumn>
                        </Header>
                      </Link>
                      <CityLikeBtn
                        isLiked={nearCity.isLiked}
                        cityId={nearCity.id}
                        likeCount={nearCity.likeCount}
                        type={"row"}
                      />
                      <Text>{nearCity.distance}km</Text>
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

export default NearCitiesPresenter;
