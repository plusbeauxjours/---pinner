import React from "react";
import styled from "../../Styles/typed-components";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader";
import UserHeader from "../../Components/UserHeader";
import CoffeeBtn from "src/Components/CoffeeBtn";
import Wrapper from "src/Components/Wrapper";
import Bold from "../../Components/Bold";
import { keyframes } from "styled-components";
import Avatar from "../../Components/Avatar";
import CoffeeBox from "src/Components/CoffeeBox";
import { BACKEND_URL } from "src/constants";

const SWrapper = styled(Wrapper)``;

const UserContainer = styled.div`
  margin-top: 30px;
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const GreyText = styled(Bold)`
  color: #999;
  font-weight: 100;
  margin-top: 5px;
`;

const MatchUserRow = styled.div`
  display: grid;
  flex-direction: row;
  height: 50px;
  grid-template-columns: 2fr 1fr 0.5fr;
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

const Username = styled.span`
  text-align: center;
  font-size: 22px;
  font-weight: 100;
`;

const UserNameRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 215px;
  border: 0;
  border-bottom: 1px solid grey;
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

const Column = styled.div`
  display: flex;
  flex-direction: column;
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
  background-color: rgba(0, 0, 0, 0.85);
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
    border-bottom: 1px solid grey;
  }
`;

const CText = styled(Bold)`
  display: flex;
`;

const GreyLine = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid grey;
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

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
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

const Explain = styled(Location)`
  color: grey;
`;

interface IProps {
  matchData: any;
  matchLoading: boolean;
  recommandUsersData: any;
  recommandUsersLoading: boolean;
  coffeeData: any;
  coffeeLoading: boolean;
  search: string;
  matchList: any;
  currentLat: number;
  currentLng: number;
  currentCityId: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  requestModalOpen: boolean;
  coffeeReportModalOpen: boolean;
  toggleCoffeeReportModal: () => void;
  toggleRequestModal: () => void;
  submitCoffee: any;
  isStaying: boolean;
}

const MatchPresenter: React.FunctionComponent<IProps> = ({
  matchData: { getMatches: { matches = null } = {} } = {},
  matchLoading,
  recommandUsersData: { recommandUsers: { users = null } = {} } = {},
  recommandUsersLoading,
  coffeeData: { getCoffees: { coffees = null } = {} } = {},
  coffeeLoading,
  search,
  matchList,
  currentLat,
  currentLng,
  currentCityId,
  onChange,
  requestModalOpen,
  coffeeReportModalOpen,
  toggleCoffeeReportModal,
  toggleRequestModal,
  submitCoffee,
  isStaying
}) => {
  if (matchLoading || recommandUsersLoading) {
    return <Loader />;
  } else if (!matchLoading && !recommandUsersLoading && matches) {
    return (
      <>
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
              <ModalLink onClick={() => submitCoffee("Everyone")}>
                EVERYONE
              </ModalLink>
              <ModalLink onClick={() => submitCoffee("nationality")}>
                NATIONALITY
              </ModalLink>
              <ModalLink onClick={() => submitCoffee("gender")}>
                GENDER
              </ModalLink>
              <ModalLink onClick={toggleRequestModal}>CANCEL</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        <SWrapper>
          <UserContainer>
            <UserNameRow>
              <Username>RECOMMAND USER</Username>
              <Link to={`/people`}>
                <SeeAll>SEE ALL</SeeAll>
              </Link>
            </UserNameRow>
            <Container>
              <Box>
                {users &&
                  users.length !== 0 &&
                  users.map(user => (
                    <UserRow key={user.profile.id}>
                      <Link to={`/${user.profile.username}`}>
                        <AvatarContainer>
                          <Avatar
                            size={"sm"}
                            url={`${BACKEND_URL}/media/${
                              user.profile.avatar.thumbnail
                            }`}
                          />
                          <HeaderColumn>
                            <CText text={user.profile.username} />
                            <Explain>with same nationality</Explain>
                          </HeaderColumn>
                        </AvatarContainer>
                      </Link>
                    </UserRow>
                  ))}
              </Box>
            </Container>
          </UserContainer>
          <CoffeeBox
            coffeeLoading={coffeeLoading}
            currentCityId={currentCityId}
            toggleCoffeeRequestModal={toggleRequestModal}
            coffees={coffees}
            isStaying={isStaying}
          />
          <GreyLine />
          <UserContainer>
            <UserNameRow>
              <Username>MATCHES</Username>
              {console.log(matches)}
              <Input
                placeholder="Search matched users"
                value={search}
                onChange={onChange}
              />
            </UserNameRow>
            {matchList.length !== 0 &&
              matchList.map(match => (
                <React.Fragment key={match.id}>
                  {match.isGuest ? (
                    <MatchUserRow>
                      <Link to={`/${match.host.profile.username}`}>
                        <UserHeader
                          username={match.host.profile.username}
                          currentCity={match.host.profile.currentCity.cityName}
                          currentCountry={
                            match.host.profile.currentCity.country.countryName
                          }
                          avatar={`${BACKEND_URL}/media/${
                            match.host.profile.avatar.thumbnail
                          }`}
                          size={"sm"}
                        />
                      </Link>
                      <Column>
                        <GreyText text={match.coffee.target} />
                        <GreyText text={match.naturalTime} />
                      </Column>
                      {match.isMatching ? (
                        <CoffeeBtn
                          isMatching={match.isMatching}
                          matchId={match.id}
                        />
                      ) : null}
                    </MatchUserRow>
                  ) : (
                    <MatchUserRow>
                      <Link to={`/${match.guest.profile.username}`}>
                        <UserHeader
                          username={match.guest.profile.username}
                          currentCity={match.guest.profile.currentCity.cityName}
                          currentCountry={
                            match.guest.profile.currentCity.country.countryName
                          }
                          avatar={`${BACKEND_URL}/media/${
                            match.guest.profile.avatar.thumbnail
                          }`}
                          size={"sm"}
                        />
                      </Link>
                      <Column>
                        <GreyText text={match.coffee.target} />
                        <GreyText text={match.naturalTime} />
                      </Column>
                      {match.isMatching ? (
                        <CoffeeBtn
                          isMatching={match.isMatching}
                          matchId={match.id}
                        />
                      ) : null}
                    </MatchUserRow>
                  )}
                </React.Fragment>
              ))}
            {matchList.length === 0 &&
              !search &&
              matches &&
              matches.map(match => (
                <React.Fragment key={match.id}>
                  {match.isGuest ? (
                    <MatchUserRow>
                      <Link to={`/${match.host.profile.username}`}>
                        <UserHeader
                          username={match.host.profile.username}
                          currentCity={match.host.profile.currentCity.cityName}
                          currentCountry={
                            match.host.profile.currentCity.country.countryName
                          }
                          avatar={`${BACKEND_URL}/media/${
                            match.host.profile.avatar.thumbnail
                          }`}
                          size={"sm"}
                        />
                      </Link>
                      <Column>
                        <GreyText text={match.coffee.target} />
                        <GreyText text={match.naturalTime} />
                      </Column>
                      {match.isMatching ? (
                        <CoffeeBtn
                          cityId={currentCityId}
                          isMatching={match.isMatching}
                          matchId={match.id}
                        />
                      ) : null}
                    </MatchUserRow>
                  ) : (
                    <MatchUserRow>
                      <Link to={`/${match.guest.profile.username}`}>
                        <UserHeader
                          username={match.guest.profile.username}
                          currentCity={match.guest.profile.currentCity.cityName}
                          currentCountry={
                            match.guest.profile.currentCity.country.countryName
                          }
                          avatar={`${BACKEND_URL}/media/${
                            match.guest.profile.avatar.thumbnail
                          }`}
                          size={"sm"}
                        />
                      </Link>
                      <Column>
                        <GreyText text={match.coffee.target} />
                        <GreyText text={match.naturalTime} />
                      </Column>
                      {match.isMatching ? (
                        <CoffeeBtn
                          cityId={currentCityId}
                          isMatching={match.isMatching}
                          matchId={match.id}
                        />
                      ) : null}
                    </MatchUserRow>
                  )}
                </React.Fragment>
              ))}
          </UserContainer>
        </SWrapper>
      </>
    );
  } else {
    return null;
  }
};

export default MatchPresenter;
