import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";

import Loader from "../../../Components/Loader";
import Wrapper from "../../../Components/Wrapper";
import Avatar from "../../../Components/Avatar";
import Bold from "../../../Components/Bold";
import CoffeeBtn from "src/Components/CoffeeBtn";
import { List } from "../../../Icons";

const SWrapper = styled(Wrapper)`
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 280px;
`;

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
`;

const ModalOverlay = styled.div`
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
  z-index: 4;
  animation: ${ModalAnimation} 0.1s linear;
`;

const MenuModalLink = styled.div`
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

const MenuModalContainer = styled(ModalContainer)`
  z-index: 5;
`;
const MenuModalOverlay = styled(ModalOverlay)`
  z-index: 5;
`;
const MenuModal = styled(Modal)`
  z-index: 5;
`;

const FormModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 30%;
`;

const SAvatar = styled(Avatar)`
  margin-bottom: 15px;
`;

const SText = styled(Bold)`
  font-size: 22px;
  margin-bottom: 3px;
  display: block;
`;

const Location = styled.span`
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  font-size: 12px;
  font-weight: 200;
`;

const Text = styled.p`
  margin-bottom: 10px;
  display: flex;
  font-size: 12px;
  font-weight: 100;
`;

const Icon = styled.span`
  margin-right: 15px;
  cursor: pointer;
`;

interface IProps {
  data: any;
  loading: boolean;
  modalOpen: boolean;
  back: any;
  toggleModal: () => void;
  followUser: (userId: string) => void;
  isFollowing: boolean;
}

const CoffeeDetailPresenter: React.SFC<IProps> = ({
  data: { coffeeDetail: { coffee = null } = {} } = {},
  loading,
  modalOpen,
  toggleModal,
  followUser,
  isFollowing,
  back
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && coffee) {
    return (
      <>
        {modalOpen && (
          <MenuModalContainer>
            {console.log("fuck")}
            {console.log(coffee.host.profile.isSelf)}
            <MenuModalOverlay onClick={toggleModal} />
            <MenuModal>
              {coffee.host.profile.isSelf ? (
                <>
                  {/* <ModalLink onClick={() => editCoffeeFn()}>
                    EDIT COFFEE
                  </ModalLink>
                  <ModalLink onClick={() => deleteCoffeeFn()}>
                    DELETE COFFEE
                  </ModalLink> */}
                  <MenuModalLink>EDIT COFFEE</MenuModalLink>
                  <MenuModalLink>DELETE COFFEE</MenuModalLink>
                </>
              ) : (
                <>
                  <MenuModalLink onClick={() => console.log("REPORT CARD")}>
                    REPORT CARD
                  </MenuModalLink>
                  <MenuModalLink onClick={() => followUser(coffee.host.id)}>
                    {isFollowing ? "UNFOLLOW" : "FOLLOW"}
                  </MenuModalLink>
                </>
              )}

              <MenuModalLink onClick={toggleModal}>CANCEL</MenuModalLink>
            </MenuModal>
          </MenuModalContainer>
        )}
        <ModalContainer>
          <ModalOverlay onClick={back} />
          <FormModal>
            <SWrapper>
              <SAvatar url={coffee.host.profile.avatar} size="lg" />
              <SText text={coffee.host.username} />
              <Location>
                {coffee.host.profile.currentCity.cityName},
                {coffee.host.profile.currentCity.country.countryName}
              </Location>
              <Icon onClick={toggleModal}>
                <List />
              </Icon>
              <Text>{coffee.target}</Text>
              <Text>
                FOLLOWERS
                {coffee.host.profile.followersCount}
              </Text>
              <Text>
                FOLLOWINGS
                {coffee.host.profile.followingCount}
              </Text>
              <Text>
                TRIPS
                {coffee.host.profile.tripCount}
              </Text>
              <Text>
                NATIONALITY
                {coffee.host.profile.nationality.countryName}
                {coffee.host.profile.nationality.countryEmoji}
              </Text>
              <Text>
                RESIDENCE
                {coffee.host.profile.residence.countryName}
                {coffee.host.profile.residence.countryEmoji}
              </Text>
              <Text>
                GENDER
                {coffee.host.profile.gender}
              </Text>
              <Text>{coffee.naturalTime}</Text>

              {coffee.status !== "expired" && (
                <CoffeeBtn
                  coffeeId={coffee.id}
                  isMatching={coffee.isMatching}
                  isSelf={coffee.host.profile.isSelf}
                />
              )}

              {/* {coffee.host.profile.nationality.countryName} */}
            </SWrapper>
          </FormModal>
        </ModalContainer>
      </>
    );
  }
  return null;
};

export default CoffeeDetailPresenter;
