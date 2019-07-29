import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";

import Loader from "../../../Components/Loader";
import Wrapper from "../../../Components/Wrapper";
import Avatar from "../../../Components/Avatar";
import Bold from "../../../Components/Bold";
import CoffeeBtn from "src/Components/CoffeeBtn";
import { List } from "../../../Icons";
import { Link } from "react-router-dom";

const SWrapper = styled(Wrapper)`
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 150px;
`;

const ModalContainer = styled.div`
  z-index: 101;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
`;

const ModalOverlay = styled.div`
  z-index: 100;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: ${props => props.theme.modalOverlayColor};
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
  background-color: ${props => props.theme.modalBgColor}
  border: 1px solid ${props => props.theme.borderColor};
  width: 30%;
  border-radius: 12px;
  z-index: 101;
  animation: ${ModalAnimation} 0.1s linear;
`;

const MenuModalLink = styled.div`
  z-index: 101;
  text-align: center;
  min-height: 50px;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  :not(:last-child) {
    border-bottom:  1px solid ${props => props.theme.borderColor};
  }
`;

const MenuModalContainer = styled(ModalContainer)`
  z-index: 105;
`;
const MenuModalOverlay = styled(ModalOverlay)`
  z-index: 105;
`;
const MenuModal = styled(Modal)`
  z-index: 105;
`;

const FormModal = styled(Modal)`
  z-index: 101;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 400px;
  margin-top: 45px;
  @media screen and (max-width: 630px) {
    width: 100%;
    margin-right: 15px;
    margin-left: 15px;
  }
  @media screen and (max-height: 400px) {
    height: 100%;
  }
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
  font-weight: 200;
`;

const NText = styled.p`
  margin-bottom: 10px;
  display: flex;
  font-size: 30px;
  font-weight: 400;
`;

const CText = styled.p`
  text-align: center;
  margin-bottom: 10px;
  display: flex;
  font-size: 18px;
  font-weight: 400;
`;

const GreyText = styled.p`
  color: ${props => props.theme.greyColor};;
  font-weight: 100;
  font-size: 12px;
  margin-bottom: 20px;
`;

const NumberContainer = styled.div`
  width: 250px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 2fr 1fr;
  grid-gap: 5px;
  justify-items: center;
  align-items: flex-end;
  margin: 10px 0 10px 0;
`;

const InfoContainer = styled.div`
  width: 250px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 0.5fr;
  grid-auto-flow: column;
  grid-gap: 5px;
  justify-items: center;
  align-items: flex-end;
  margin: 5px 0 5px 0;
`;

const Icon = styled.span`
  display: flex;
  align-self: flex-end;
  position: absolute;
  justify-items: center;
  padding-right: 18px;
  cursor: pointer;
  top: 20px;
  svg {
    fill: ${props => props.theme.color};
    transition: fill 0.2s ease-in-out;
    &:hover {
      /* fill: grey; */
    }
  }
`;

interface IProps {
  data: any;
  loading: boolean;
  modalOpen: boolean;
  back: any;
  toggleModal: () => void;
  deleteCoffee: () => void;
}

const CoffeeDetailPresenter: React.FunctionComponent<IProps> = ({
  data: { coffeeDetail: { coffee = null } = {} } = {},
  loading,
  modalOpen,
  toggleModal,
  back,
  deleteCoffee
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && coffee) {
    return (
      <>
        {modalOpen && (
          <MenuModalContainer>
            <MenuModalOverlay onClick={toggleModal} />
            <MenuModal>
              {coffee.host.profile.isSelf ? (
                <>
                  <MenuModalLink onClick={() => console.log("Edit Coffee")}>
                    EDIT COFFEE
                  </MenuModalLink>
                  <MenuModalLink onClick={() => deleteCoffee()}>
                    DELETE COFFEE
                  </MenuModalLink>
                </>
              ) : (
                <>
                  <MenuModalLink onClick={() => console.log("REPORT COFFEE")}>
                    REPORT COFFEE
                  </MenuModalLink>
                </>
              )}
              <MenuModalLink onClick={toggleModal}>Cancel</MenuModalLink>
            </MenuModal>
          </MenuModalContainer>
        )}
        <ModalContainer>
          {console.log(coffee)}
          <ModalOverlay onClick={back} />
          <FormModal>
            <SWrapper>
              <Icon onClick={toggleModal}>
                <List />
              </Icon>
              <Link to={`/${coffee.host.profile.username}`}>
                <SAvatar url={coffee.host.profile.avatarUrl} size="lg" />
              </Link>

              <SText text={coffee.host.username} />
              <Location>
                {coffee.host.profile.currentCity.cityName},
                {coffee.host.profile.currentCity.country.countryName}
              </Location>
              {coffee.target === "GENDER" ? (
                <Text>{coffee.host.profile.gender}</Text>
              ) : (
                <Text>{coffee.target}</Text>
              )}
              <NumberContainer>
                <NText> {coffee.host.profile.tripCount} </NText>
                <Text>TRIPS</Text>
              </NumberContainer>
              <InfoContainer>
                {coffee.host.profile.nationality ? (
                  <>
                    <CText>
                      {coffee.host.profile.nationality.countryName}
                      {coffee.host.profile.nationality.countryEmoji}
                    </CText>
                    <Text>NATIONALITY</Text>
                  </>
                ) : null}
                {coffee.host.profile.residence ? (
                  <>
                    <CText>
                      {coffee.host.profile.residence.countryName}
                      {coffee.host.profile.residence.countryEmoji}
                    </CText>
                    <Text>RESIDENCE</Text>
                  </>
                ) : null}
              </InfoContainer>
              <GreyText>until {coffee.naturalTime}</GreyText>
              {coffee.status !== "expired" && (
                <CoffeeBtn
                  cityId={coffee.city.cityId}
                  coffeeId={coffee.uuid}
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
