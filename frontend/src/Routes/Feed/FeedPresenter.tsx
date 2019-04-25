import React from "react";
import { Link } from "react-router-dom";
import { keyframes } from "styled-components";

import { Upload } from "../../Icons";
import styled from "../../Styles/typed-components";

import Loader from "../../Components/Loader";
import Photo from "../../Components/Photo";
import Wrapper from "../../Components/Wrapper";
import Avatar from "../../Components/Avatar";
import Bold from "../../Components/Bold";
import UserRow from "../../Components/UserRow";
import UserGrid from "../../Components/UserGrid";
import CoffeeGrid from "../../Components/CoffeeGrid";
// import CoffeeRow from "../../Components/CoffeeRow";
import Weather from "src/Components/Weather";
import LoaderCoffee from "src/Components/LoaderCoffee";

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

const HeaderColumn = styled.div`
  margin-left: 15px;
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

const User = styled.div`
  display: flex;
  padding: 5px;
`;

const SBold = styled(Bold)`
  display: flex;
  align-self: flex-end;
`;

const UBold = styled(SBold)`
  font-weight: 100;
  font-size: 7px;
`;

const AvatarContainer = styled.div`
  display: flex;
`;

const SAvatar = styled(Avatar)`
  margin-right: -12px;
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

const Container = styled.div`
  border-bottom: 4px;
  display: flex;
  align-items: center;
  flex-direction: row;
  -webkit-box-flex: 0;
  flex: 0 0 auto;
  height: 280px;
  padding: 15px;
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

const Box = styled.div`
  width: 905px;
  display: flex;
  overflow-x: auto;
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

const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-items: center;
  margin: 0 60px 0 60px;
  &:last-child {
    margin-right: 0;
  }
  svg {
    fill: white;
    transition: fill 0.2s ease-in-out;
    &:hover {
      fill: grey;
    }
  }
`;

interface ITheme {
  size?: string;
}

interface IProps {
  feedData?: any;
  feedLoading: boolean;
  coffeeData: any;
  coffeeLoading: boolean;

  currentCity: string;
  nowModalOpen: boolean;
  beforeModalOpen: boolean;
  toggleNowModal: () => void;
  toggleBeforeModal: () => void;
  recommandUsersData: any;
  recommandUsersLoading: boolean;
  recommandUserList: any;
  recommandUserModalOpen: boolean;
  toggleRecommandUserSeeAll: () => void;
  toggleRecommandUserModal: () => void;
  requestModalOpen: boolean;
  coffeeModalOpen: boolean;
  coffeeReportModalOpen: boolean;
  toggleRequestModal: () => void;
  toggleCoffeeModal: () => void;
  toggleCoffeeReportModal: () => void;
  submitCoffee: any;
  currentLat: number;
  currentLng: number;
  page: number;
}

const FeedPresenter: React.SFC<IProps> = ({
  feedData: {
    feed: {
      cards = null,
      usersNow = null,
      usersBefore = null,
      city = null
    } = {}
  } = {},
  feedLoading,
  coffeeData: { getCoffees: { coffees = null } = {} } = {},
  coffeeLoading,
  recommandUsersData: { recommandUsers: { users = null } = {} } = {},
  recommandUsersLoading,
  nowModalOpen,
  beforeModalOpen,
  toggleNowModal,
  toggleBeforeModal,
  toggleRecommandUserSeeAll,
  recommandUserList,
  toggleRecommandUserModal,
  recommandUserModalOpen,
  requestModalOpen,
  coffeeModalOpen,
  coffeeReportModalOpen,
  toggleRequestModal,
  toggleCoffeeModal,
  toggleCoffeeReportModal,
  submitCoffee,
  currentLat,
  currentLng,
  currentCity,
  page
}) => {
  if (feedLoading) {
    return <Loader />;
  } else if (!feedLoading && usersNow && usersBefore && city) {
    return (
      <>
        {coffeeModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleCoffeeModal} />
            <Modal>
              <ModalLink onClick={() => submitCoffee("everyone")}>
                COFFEE DETAIL
              </ModalLink>
              <ModalLink onClick={() => submitCoffee("nationality")}>
                EDIT COFFEE
              </ModalLink>
              <ModalLink onClick={() => submitCoffee("gender")}>
                DELETE COFFEE
              </ModalLink>
              <ModalLink onClick={toggleCoffeeModal}>Cancel</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        {coffeeReportModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleCoffeeReportModal} />
            <Modal>
              <ModalLink onClick={() => submitCoffee("everyone")}>
                REPORT COFFEE
              </ModalLink>
              <ModalLink onClick={toggleCoffeeReportModal}>Cancel</ModalLink>
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
              <ModalLink onClick={toggleRequestModal}>Cancel</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        {recommandUserModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleRecommandUserModal} />
            <Modal>
              <Wrapper>
                {recommandUserList.map(user => (
                  <UserRow
                    key={user.id}
                    id={user.id}
                    username={user.username}
                    avatar={user.profile.avatar}
                    currentCity={user.profile.currentCity.cityName}
                    currentCountry={
                      user.profile.currentCity.country.countryName
                    }
                    isFollowing={user.profile.isFollowing}
                    size={"sm"}
                  />
                ))}
              </Wrapper>
            </Modal>
          </ModalContainer>
        )}
        {nowModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleNowModal} />
            <Modal>
              <Wrapper>
                {usersNow.map(user => (
                  <UserRow
                    key={user.id}
                    id={user.id}
                    username={user.username}
                    avatar={user.profile.avatar}
                    currentCity={user.profile.currentCity.cityName}
                    currentCountry={
                      user.profile.currentCity.country.countryName
                    }
                    isFollowing={user.profile.isFollowing}
                    isSelf={user.profile.isSelf}
                    size={"sm"}
                  />
                ))}
              </Wrapper>
            </Modal>
          </ModalContainer>
        )}
        {beforeModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleBeforeModal} />
            <Modal>
              {usersBefore.map(user => (
                <UserRow
                  key={user.id}
                  id={user.id}
                  username={user.actor.username}
                  avatar={user.actor.profile.avatar}
                  currentCity={user.actor.profile.currentCity.cityName}
                  currentCountry={
                    user.actor.profile.currentCity.country.countryName
                  }
                  isFollowing={user.actor.profile.isFollowing}
                  isSelf={user.actor.profile.isSelf}
                  size={"sm"}
                />
              ))}
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
                    <SBold text={city.cityName} />
                    <Location>{city.country.countryName}</Location>
                  </HeaderColumn>
                </Header>
              </Link>
              <Weather lat={currentLat} lng={currentLng} />
            </UserContainer>
            <UserContainer>
              <User onClick={toggleNowModal}>
                {usersNow &&
                  usersNow.map(user => (
                    <AvatarContainer key={user.id}>
                      <SAvatar
                        size={"sm"}
                        key={user.id}
                        url={user.profile.avatar}
                      />
                    </AvatarContainer>
                  ))}
                <UBold text={String(city.userCount)} />
                <UBold text={"USERS IS HERE, NOW"} />
              </User>
              <User onClick={toggleBeforeModal}>
                {usersBefore &&
                  usersBefore.map(user => (
                    <AvatarContainer key={user.id}>
                      <SAvatar
                        size={"sm"}
                        key={user.id}
                        url={user.actor.profile.avatar}
                      />
                    </AvatarContainer>
                  ))}
                <UBold text={String(city.userLogCount)} />
                <UBold text={"USERS HAS BEEN HERE"} />
              </User>
            </UserContainer>
          </PHeader>
          <GreyLine />
          <Title>
            <SBold text={"RECOMMAND USER"} />
            <SeeAll onClick={toggleRecommandUserSeeAll}>SEE ALL</SeeAll>
          </Title>
          <Container>
            <Box>
              {!recommandUsersLoading && users ? (
                <UserGrid users={users} />
              ) : (
                <Loader />
              )}
            </Box>
          </Container>
          <GreyLine />
          <Title>
            <SBold text={"NEED SOME COFFEE"} />
          </Title>
          <Container>
            <Icon onClick={toggleRequestModal}>
              <Upload />
            </Icon>
            <Box>
              {!coffeeLoading && coffees ? (
                <CoffeeGrid
                  coffees={coffees}
                  toggleCoffeeModal={toggleCoffeeModal}
                  toggleCoffeeReportModal={toggleCoffeeReportModal}
                />
              ) : (
                <Loader />
              )}
            </Box>
          </Container>
          <LoaderCoffee />
          <GreyLine />
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
                country={card.country.countryName}
                city={card.city.cityName}
                photoUrl={card.file}
                likeCount={card.likeCount}
                commentCount={card.commentCount}
                caption={card.caption}
                naturalTime={card.naturalTime}
                isLiked={card.isLiked}
                currentCity={currentCity}
                page={page}
              />
            ))}
        </SWrapper>
      </>
    );
  }
  return null;
};

export default FeedPresenter;
