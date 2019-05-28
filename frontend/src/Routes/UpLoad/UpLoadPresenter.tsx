import React from "react";
import Wrapper from "src/Components/Wrapper";
import styled from "styled-components";
import { keyframes } from "styled-components";
import Textarea from "react-expanding-textarea";
import { Upload } from "../../Icons";

const ModalContainer = styled.div`
  z-index: 10;
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
  background-color: rgba(0, 0, 0, 0.8);
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
  width: 100%;
  height: 50%;
  max-width: 935px;
  z-index: 5;
  animation: ${ModalAnimation} 0.1s linear;
`;

const STextArea = styled(Textarea)`
  width: 100%;
  border: 0;
  resize: none;
  font-size: 12px;
  padding: 15px 0px;
`;

const UploadIcon = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 15px 15px 0;
  svg {
    fill: white;
    transition: fill 0.2s ease-in-out;
    &:hover {
      fill: grey;
    }
  }
`;

interface IProps {
  back: any;
  caption: string;
  uploadNewCard: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  modalOpen: boolean;
  upload: boolean;
  toggleUploadModal: () => void;
}

const UpLoadPresenter: React.SFC<IProps> = ({
  back,
  caption,
  uploadNewCard,
  onKeyDown,
  modalOpen,
  upload,
  toggleUploadModal
}) => {
  return (
    <>
      {modalOpen && (
        <ModalContainer>
          <ModalOverlay onClick={toggleUploadModal} />
          <Modal>
            <Wrapper>
              <STextArea
                placeholder="Add a caption..."
                onChange={uploadNewCard}
                value={caption}
                onKeyDown={onKeyDown}
              />
            </Wrapper>
          </Modal>
        </ModalContainer>
      )}
      {upload && (
        <UploadIcon onClick={toggleUploadModal}>
          <Upload />
        </UploadIcon>
      )}
    </>
  );
};

export default UpLoadPresenter;
