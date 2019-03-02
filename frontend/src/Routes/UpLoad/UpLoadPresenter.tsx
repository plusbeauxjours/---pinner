import React from "react";
import Wrapper from "src/Components/Wrapper";
import styled from "styled-components";
import { keyframes } from "styled-components";

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 110%;
  width: 100%;
  top: 0;
`;

const ModalOverlay = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.6);
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
  background-color: white;
  width: 100;
  max-width: 935px;
  z-index: 5;
  animation: ${ModalAnimation} 0.1s linear;
`;

interface IProps {
  back: any;
}

const UpLoadPresenter: React.SFC<IProps> = ({ back }) => {
  return (
    <ModalContainer>
      <ModalOverlay onClick={back} />
      <Modal>
        <Wrapper />
      </Modal>
    </ModalContainer>
  );
};

export default UpLoadPresenter;
