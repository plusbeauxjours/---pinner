import React from "react";
import { Link } from "react-router-dom";

import Loader from "../../Components/Loader";
import Photo from "../../Components/Photo";
import Wrapper from "../../Components/Wrapper";
import styled from "../../Styles/typed-components";
import Avatar from "../../Components/Avatar";
import Bold from "../../Components/Bold";
import Flag from "../../Components/Flag";
import UserRow from "../../Components/UserRow";
import { keyframes } from "styled-components";
import UserGrid from "src/Components/UserGrid";
import { Upload } from "../../Icons";

const SWrapper = styled(Wrapper)`
  z-index: 1;
`;

const PHeader = styled.header`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 55px;

  border: 1px;
  border-color: white;
  margin-top: 20px;
`;

const LocationContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
`;

const LocationHeader = styled.header`
  padding: 12px;
  margin: 0 15px 0 15px;
  display: flex;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
`;

const HeaderColumn = styled.div`
  margin-left: 30px;
`;

const Location = styled.span`
  margin-top: 5px;
  display: block;
  font-size: 12px;
  font-weight: 200;
`;

const PBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0 20px 0;
  justify-content: center;
  background: ${props => props.theme.bgColor};
`;

const UserContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${ModalAnimation} 0.1s linear;
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
  flex-wrap: nowrap;
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
  justify-items: center;
  margin-right: 30px;
  &:last-child {
    margin-right: 0;
  }
  svg {
    fill: white;
  }
`;

interface IProps {
  data?: any;
  loading: boolean;
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
}

const FeedPresenter: React.SFC<IProps> = ({
  data: {
    feed: {
      cards = null,
      usersNow = null,
      usersBefore = null,
      city = null
    } = {}
  } = {},
  loading,
  recommandUsersData: { recommandUsers: { users = null } = {} } = {},
  recommandUsersLoading,
  nowModalOpen,
  beforeModalOpen,
  toggleNowModal,
  toggleBeforeModal,
  toggleRecommandUserSeeAll,
  recommandUserList,
  toggleRecommandUserModal,
  recommandUserModalOpen
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && usersNow && usersBefore && city) {
    return (
      <>
        {console.log(
          "cards:",
          cards,
          "usersNow:",
          usersNow,
          "usersBefore:",
          usersBefore,
          "city:",
          city,
          "users:",
          users
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
            <LocationContainer>
              <Link to={`/city/${city.cityName}`}>
                <LocationHeader>
                  <Flag countryCode={city.country.countryCode} size={"sm"} />
                  <HeaderColumn>
                    <SBold text={city.cityName} />
                    <Location>{city.country.countryName}</Location>
                  </HeaderColumn>
                </LocationHeader>
              </Link>
              <p>Temp</p>
              <p>AQI</p>
            </LocationContainer>
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
          <Container>
            <Icon>
              <Link to="/upload">
                <Upload />
              </Link>
            </Icon>
          </Container>
          <GreyLine />
          <PBody />
          {cards &&
            cards.map(card => (
              <Photo
                key={card.id}
                id={card.id}
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
                comments={card.comments}
                naturalTime={card.naturalTime}
                isLiked={card.isLiked}
              />
            ))}
        </SWrapper>
      </>
    );
  }
  return null;
};

export default FeedPresenter;
