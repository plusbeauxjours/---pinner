import React from "react";
import { Link } from "react-router-dom";

import { keyframes } from "styled-components";
import styled from "../../../Styles/typed-components";

import { Phone } from "../../../Icons";

import Wrapper from "../../../Components/Wrapper";
import SocialLogin from "../../../Components/SocialLogin";

import ProgressiveImage from "react-progressive-image";

const Animation = keyframes`
	  from{
	    opacity:0;
	  }
	  to{
	    opacity:1;
	  }
  `;

const Container = styled(Wrapper)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  max-width: 745px;
`;

const Box = styled.div`
  background-color: ${props => props.theme.modalBgColor};
  border: 1px solid ${props => props.theme.borderColor};
  border: ${props => props.theme.boxBorder};
  text-align: center;
`;

const SwitchBox = styled(Box)`
  width: 45%;
  padding: 30px 0px;
  cursor: pointer;
`;

const SwitchLink = styled.span`
  color: ${props => props.theme.color};
  cursor: pointer;
`;

const ModalOverlay = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: ${props => props.theme.modalOverlayColor};
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
  background-color: ${props => props.theme.modalBgColor};
  border: 1px solid ${props => props.theme.borderColor};
  margin: 0 15px 0 15px;
  width: 340px;
  border-radius: 12px;
  z-index: 5;
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
    border-bottom: 1px solid ${props => props.theme.borderColor};
  }
`;

const Icon = styled.span`
  margin-right: 10px;
`;

const Image = styled.img`
  z-index: -5;
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  background-position: center center;
  object-fit: cover;
  opacity: 0.6;
  animation: ${Animation} 0.2s linear;
`;

interface IProps {
  isLogIn: boolean;
  modalOpen: boolean;
  latitude: number;
  longitude: number;
  cityId: string;
  cityName: string;
  countryCode: string;
  countryPhone: string;
  changeMode: () => void;
  toggleModal: () => void;
}

const HomePresenter: React.FunctionComponent<IProps> = ({
  isLogIn,
  modalOpen,
  latitude,
  longitude,
  cityId,
  cityName,
  countryCode,
  countryPhone,
  toggleModal,
  changeMode
}) => {
  return (
    <>
      {modalOpen && (
        <ModalContainer>
          <ModalOverlay onClick={toggleModal} />
          <Modal>
            <ModalLink>
              <SocialLogin
                latitude={latitude}
                longitude={longitude}
                countryCode={countryCode}
                cityId={cityId}
                cityName={cityName}
              />
            </ModalLink>
            <Link
              to={{
                pathname: `/approach`,
                state: {
                  latitude,
                  longitude,
                  countryCode,
                  countryPhone,
                  cityId,
                  cityName
                }
              }}
            >
              <ModalLink>
                <Icon>
                  <Phone />
                </Icon>
                Phone
              </ModalLink>
            </Link>
          </Modal>
        </ModalContainer>
      )}
      <ProgressiveImage
        delay={0}
        src={require(`../../../Images/animations/homeA_loading.jpg`)}
        placeholder={require(`../../../Images/animations/homeA_loading.jpg`)}
      >
        {(src, loading) => {
          return loading ? (
            <Image
              src={require(`../../../Images/animations/homeA_loading.jpg`)}
            />
          ) : (
            <Image src={require(`../../../Images/animations/homeA.jpg`)} />
          );
        }}
      </ProgressiveImage>
      <Container>
        <SwitchBox onClick={toggleModal}>
          <SwitchLink>Modal</SwitchLink>
        </SwitchBox>
      </Container>
    </>
  );
  return null;
};

export default HomePresenter;
