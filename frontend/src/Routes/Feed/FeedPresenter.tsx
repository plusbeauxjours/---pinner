import React from "react";
import { Link } from "react-router-dom";
import { keyframes } from "styled-components";

import styled from "../../Styles/typed-components";

import Loader from "../../Components/Loader";
import Photo from "../../Components/Photo";
import Wrapper from "../../Components/Wrapper";
import Bold from "../../Components/Bold";
import Weather from "src/Components/Weather";
import InfiniteScroll from "react-infinite-scroller";
// import CitySearch from "src/Components/CitySearch";
import FollowBtn from "src/Components/FollowBtn";
import { Upload } from "src/Icons";
import Avatar from "../../Components/Avatar";
import CoffeeBtn from "src/Components/CoffeeBtn";

const SWrapper = styled(Wrapper)`
  z-index: 1;
`;

const PHeader = styled.header`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  border: 1px;
  border-color: white;
  margin-top: 20px;
`;

const Header = styled.header`
  padding: 12px;
  margin: 0 15px 0 15px;
  display: flex;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
`;

const Location = styled.span`
  display: flex;
  margin-top: 5px;
  position: block;
  font-size: 12px;
  font-weight: 200;
`;

const UserContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-content: center;
`;

const CText = styled(Bold)`
  display: flex;
`;

const SText = styled(Bold)`
  font-size: 18px;
  font-weight: 100;
`;

const CityPhoto = styled.img<ITheme>`
  display: flex;
  width: ${props => {
    if (props.size === "md") {
      return "200px";
    } else if (props.size === "sm") {
      return "50px";
    } else {
      return "200px";
    }
  }};
  height: ${props => {
    if (props.size === "md") {
      return "200px";
    } else if (props.size === "sm") {
      return "50px";
    } else {
      return "200px";
    }
  }};
  background-size: cover;
  border-radius: 3px;
  z-index: 1;
  object-fit: cover;
`;

const ModalAnimation = keyframes`
	  from{
	    opacity:0;
	    transform:scale(1.1);
	  }
	  to{
	    opacity:1;
	    transform:none;
	  }
	`;

const ModalContainer = styled.div`
  z-index: 8;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
`;

const ModalOverlay = styled.div`
  z-index: 5;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Modal = styled.div`
  background-color: #2d3a41;
  width: 30%;
  border-radius: 12px;
  z-index: 10;
  animation: ${ModalAnimation} 0.1s linear;
`;

const ModalLink = styled.div`
  text-align: center;
  min-height: 50px;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  :not(:last-child) {
    border-bottom: 1px solid #efefef;
  }
`;

const GreyLine = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid grey;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const UserRow = styled.div`
  display: grid;
  height: 50px;
  width: 400px;
  grid-template-columns: 4fr 1fr;
  padding: 0 5px 0 5px;
  grid-gap: 15px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: grey;
  }
  border-bottom: 1px solid grey;
  &:last-child {
    margin-bottom: 15px;
  }
`;

const Container = styled.div`
  -webkit-box-flex: 0;
  padding: 15px;
`;

const Box = styled.div`
  max-width: 905px;
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(3, 50px);
  grid-auto-columns: 400px;
  column-gap: 10px;
  overflow-x: auto;
  padding-bottom: 15px;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  ::-webkit-scrollbar {
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: ${props => props.theme.bgColor};
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    background-color: ${props => props.theme.greyColor};
  }
`;

const SeeAll = styled.p`
  font-size: 12px;
  font-weight: 100;
  cursor: pointer;
`;

const IconRow = styled.div`
  height: 50px;
  width: 400px;
  padding: 0 5px 0 5px;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid grey;
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    fill: white;
    transition: fill 0.2s ease-in-out;
    &:hover {
      fill: grey;
    }
  }
`;

const SAvatar = styled(Avatar)``;

const Target = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  font-size: 20px;
  font-weight: 200;
`;

const AvatarContainer = styled.div`
  display: flex;
  position: relative;
`;

const HeaderColumn = styled.div`
  margin-left: 15px;
`;

const Explain = styled(Location)`
  color: grey;
`;

interface ITheme {
  size?: string;
}

interface IProps {
  feedData?: any;
  feedLoading: boolean;
  coffeeData: any;
  coffeeLoading: boolean;
  cardsData: any;
  cardsLoading: boolean;
  currentCity: string;
  recommandUsersData: any;
  recommandUsersLoading: boolean;
  requestModalOpen: boolean;
  requestingCoffeeModalOpen: boolean;
  coffeeReportModalOpen: boolean;
  toggleRequestModal: () => void;
  toggleRequestingCoffeeModal: () => void;
  toggleCoffeeReportModal: () => void;
  submitCoffee: any;
  currentLat: number;
  currentLng: number;
  deleteCoffee: () => void;
  loadMore: any;
}

const FeedPresenter: React.SFC<IProps> = ({
  feedData: { feed: { city = null } = {} } = {},
  feedLoading,
  cardsData: { getFeedCards: { cards = null, hasNextPage = true } = {} } = {},
  cardsLoading,
  coffeeData: { getCoffees: { coffees = null } = {} } = {},
  coffeeLoading,
  recommandUsersData: { recommandUsers: { users = null } = {} } = {},
  recommandUsersLoading,
  requestModalOpen,
  requestingCoffeeModalOpen,
  coffeeReportModalOpen,
  toggleRequestModal,
  toggleRequestingCoffeeModal,
  toggleCoffeeReportModal,
  submitCoffee,
  currentLat,
  currentLng,
  currentCity,
  deleteCoffee,
  loadMore
}) => {
  if (feedLoading) {
    return <Loader />;
  } else if (!feedLoading && city) {
    return (
      <>
        {requestingCoffeeModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleRequestingCoffeeModal} />
            <Modal>
              <ModalLink onClick={() => console.log("COFFEE DETAIL")}>
                COFFEE DETAIL
              </ModalLink>
              <ModalLink onClick={() => console.log("EDIT COFFEE")}>
                EDIT COFFEE
              </ModalLink>
              <ModalLink onClick={() => deleteCoffee()}>
                CANCEL COFFEE
              </ModalLink>
              <ModalLink onClick={toggleRequestingCoffeeModal}>
                CANCEL
              </ModalLink>
            </Modal>
          </ModalContainer>
        )}
        {coffeeReportModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleCoffeeReportModal} />
            <Modal>
              <ModalLink onClick={() => console.log("REPORT COFFEE")}>
                REPORT COFFEE
              </ModalLink>
              <ModalLink onClick={toggleCoffeeReportModal}>CANCEL</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        {requestModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleRequestModal} />
            <Modal>
              <ModalLink onClick={() => submitCoffee("everyone")}>
                EVERYONE
              </ModalLink>
              <ModalLink onClick={() => submitCoffee("nationality")}>
                NATIONALITY
              </ModalLink>
              <ModalLink onClick={() => submitCoffee("gender")}>
                GENDER
              </ModalLink>
              <ModalLink onClick={() => submitCoffee("followers")}>
                FOLLOWERS
              </ModalLink>
              <ModalLink onClick={toggleRequestModal}>CANCEL</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        <SWrapper>
          <PHeader>
            <UserContainer>
              <Link to={`/city/${city.cityName}`}>
                <Header>
                  <CityPhoto src={city.cityPhoto} size={"sm"} />
                  <HeaderColumn>
                    <SText text={city.cityName} />
                    <Location>{city.country.countryName}</Location>
                  </HeaderColumn>
                </Header>
              </Link>
              <Weather latitude={currentLat} longitude={currentLng} />
            </UserContainer>
          </PHeader>
          <GreyLine />
          {/* <CitySearch /> */}
          <Title>
            <SText text={"RECOMMAND USER"} />
            <Link to={`/people`}>
              <SeeAll>SEE ALL</SeeAll>
            </Link>
          </Title>
          <Container>
            <Box>
              {users &&
                users.map(user => {
                  return (
                    <UserRow key={user.id}>
                      <Link to={`/${user.username}`}>
                        <AvatarContainer>
                          <Avatar size={"sm"} url={user.profile.avatar} />
                          <HeaderColumn>
                            <CText text={user.username} />
                            <Explain>with same nationality</Explain>
                          </HeaderColumn>
                        </AvatarContainer>
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
            </Box>
          </Container>
          <GreyLine />
          <Title>
            <SText text={"NEED SOME COFFEE NOW"} />
            <Link to={{ pathname: `/coffees`, state: { currentCity } }}>
              <SeeAll>SEE ALL</SeeAll>
            </Link>
          </Title>
          <Container>
            <Box>
              <IconRow>
                <Icon onClick={toggleRequestModal}>
                  <Upload />
                </Icon>
              </IconRow>
              {!coffeeLoading &&
                coffees &&
                coffees.map(coffee => {
                  return (
                    <UserRow key={coffee.id}>
                      <Link to={`/c/${coffee.id}`}>
                        <AvatarContainer>
                          {(() => {
                            switch (coffee.target) {
                              case "EVERYONE":
                                return (
                                  <>
                                    <Target>E</Target>
                                    <SAvatar
                                      size={"sm"}
                                      url={coffee.host.profile.avatar}
                                    />
                                  </>
                                );
                              case "GENDER":
                                return (
                                  <>
                                    <Target>G</Target>
                                    <SAvatar
                                      size={"sm"}
                                      url={coffee.host.profile.avatar}
                                    />
                                  </>
                                );
                              case "NATIONALITY":
                                return (
                                  <>
                                    <Target>N</Target>
                                    <SAvatar
                                      size={"sm"}
                                      url={coffee.host.profile.avatar}
                                    />
                                  </>
                                );
                              case "FOLLOWERS":
                                return (
                                  <>
                                    <Target>F</Target>
                                    <SAvatar
                                      size={"sm"}
                                      url={coffee.host.profile.avatar}
                                    />
                                  </>
                                );
                              default:
                                return null;
                            }
                          })()}
                          <HeaderColumn>
                            <CText text={coffee.host.username} />
                            {(() => {
                              switch (coffee.target) {
                                case "EVERYONE":
                                  return <Explain>with Someone</Explain>;
                                case "GENDER":
                                  return <Explain>with same gender</Explain>;
                                case "NATIONALITY":
                                  return (
                                    <Explain>with same nationality</Explain>
                                  );
                                case "FOLLOWERS":
                                  return <Explain>with followers</Explain>;
                                default:
                                  return null;
                              }
                            })()}
                          </HeaderColumn>
                        </AvatarContainer>
                      </Link>
                      <CoffeeBtn
                        coffeeId={coffee.id}
                        isMatching={coffee.isMatching}
                        isSelf={coffee.host.profile.isSelf}
                      />
                    </UserRow>
                  );
                })}
            </Box>
          </Container>
          <GreyLine />
          {!cardsLoading && cards && cards.length !== 0 ? (
            <InfiniteScroll
              pageStart={0}
              hasMore={hasNextPage}
              loadMore={loadMore}
              initialLoad={false}
            >
              {cards &&
                cards.map(card => (
                  <Photo
                    key={card.id}
                    cardId={card.id}
                    inline={true}
                    creatorId={card.creator.id}
                    creatorAvatar={card.creator.profile.avatar}
                    creatorUsername={card.creator.username}
                    isFollowing={card.creator.profile.isFollowing}
                    isSelf={card.creator.profile.isSelf}
                    country={card.city.country.countryName}
                    city={card.city.cityName}
                    photoUrl={card.file}
                    likeCount={card.likeCount}
                    commentCount={card.commentCount}
                    caption={card.caption}
                    naturalTime={card.naturalTime}
                    isLiked={card.isLiked}
                    currentCity={currentCity}
                  />
                ))}
            </InfiniteScroll>
          ) : null}
        </SWrapper>
      </>
    );
  }
  return null;
};

export default FeedPresenter;
