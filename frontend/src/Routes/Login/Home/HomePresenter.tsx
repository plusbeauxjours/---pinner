import React from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";

import { keyframes } from "styled-components";
import styled from "../../../Styles/typed-components";

import { Phone } from "../../../Icons";

import Wrapper from "../../../Components/Wrapper";
import LogIn from "../../../Components/LogIn";
import SignUp from "../../../Components/SignUp";
import SocialLogin from "../../../Components/SocialLogin";
import PhoneLogin from "../PhoneLogin";

const Container = styled(Wrapper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 125px;
  max-width: 745px;
`;

const Box = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(128, 128, 128, 0.5);
  border: ${props => props.theme.boxBorder};
  text-align: center;
`;

const Column = styled.div`
  width: 45%;
`;

const SwitchBox = styled(Box)`
  padding: 30px 0px;
  margin-top: 15px;
`;

const SwitchLink = styled.span`
  color: ${props => props.theme.blueColor};
  cursor: pointer;
`;

const FormBox = styled(Box)`
  padding: 40px;
`;

const ModalOverlay = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.85);
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
  background-color: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(128, 128, 128, 0.5);
  width: 30%;
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
    border-bottom: 1px solid rgba(128, 128, 128, 0.5);
  }
`;

const Icon = styled.span`
  margin-right: 10px;
`;

interface IProps {
  isLogIn: boolean;
  modalOpen: boolean;
  countryCode: string;
  countryPhone: string;
  verificationModalOpen: boolean;
  changeMode: () => void;
  toggleModal: () => void;
  toggleVerificationModal: () => void;
}

const HomePresenter: React.FunctionComponent<IProps> = ({
  isLogIn,
  modalOpen,
  countryCode,
  countryPhone,
  verificationModalOpen,
  toggleModal,
  toggleVerificationModal,
  changeMode
}) => {
  return (
    <>
      {verificationModalOpen && (
        <Route path="/phone-login" component={PhoneLogin} />
      )}
      {modalOpen && (
        <ModalContainer>
          <ModalOverlay onClick={toggleModal} />
          <Modal>
            <ModalLink>
              <SocialLogin />
            </ModalLink>
            <Link
              to={{
                pathname: `/phone-login`,
                state: { countryCode, countryPhone }
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
      <Container>
        <Column>
          <FormBox>{isLogIn ? <LogIn /> : <SignUp />}</FormBox>
          <SwitchBox>
            {isLogIn ? (
              <>
                Don't have an account?
                <SwitchLink onClick={changeMode}>Sign up</SwitchLink>
              </>
            ) : (
              <>
                Have an account?{" "}
                <SwitchLink onClick={changeMode}>Log in</SwitchLink>
              </>
            )}
          </SwitchBox>
          <SwitchBox>
            <SwitchLink onClick={toggleModal}>Modal</SwitchLink>
          </SwitchBox>
        </Column>
      </Container>
    </>
  );
  return null;
};

export default HomePresenter;
