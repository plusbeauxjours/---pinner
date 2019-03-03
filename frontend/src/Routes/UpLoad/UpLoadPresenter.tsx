import React from "react";
import Wrapper from "src/Components/Wrapper";
import styled from "styled-components";
import { keyframes } from "styled-components";
import Textarea from "react-expanding-textarea";

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
  border-radius: 50%;
  width: 100;
  max-width: 935px;
  z-index: 5;
  animation: ${ModalAnimation} 0.1s linear;
`;

const STextArea = styled(Textarea)`
  width: 100%;
  border: 0;
  resize: none;
  font-size: 14px;
  padding: 15px 0px;
`;

interface IProps {
  back: any;
  borderRadius: string;
  caption: string;
  uploadNewCard: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  modalOpen: boolean;
}

const UpLoadPresenter: React.SFC<IProps> = ({
  back,
  borderRadius,
  caption,
  uploadNewCard,
  onKeyUp,
  modalOpen
}) => {
  return (
    <>
      {modalOpen && (
        <ModalContainer>
          <ModalOverlay onClick={back} />
          <Modal>
            <Wrapper>
              <STextArea
                placeholder="Add a comment..."
                onChange={uploadNewCard}
                value={caption}
                onKeyUp={onKeyUp}
              />
            </Wrapper>
          </Modal>
        </ModalContainer>
      )}
    </>
  );
};

export default UpLoadPresenter;
