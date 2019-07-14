import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";

import Loader from "../../../Components/Loader";
import { BACKEND_URL } from "src/constants";

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
  z-index: 101;
  animation: ${ModalAnimation} 0.1s linear;
`;

const SWrapper = styled.div`
  z-index: 101;
  display: flex;
  justify-content: center;
  align-items: center;
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
    border-bottom: 1px solid grey;
  }
`;

const MenuModalContainer = styled(ModalContainer)`
  z-index: 101;
`;
const MenuModalOverlay = styled(ModalOverlay)`
  z-index: 101;
`;
const MenuModal = styled(Modal)`
  z-index: 101;
`;

const Img = styled.img`
  height: 700px;
  width: 700px;
  @media screen and (max-width: 700px) {
    width: 100%;
    height: 100%;
  }
`;

interface IProps {
  data: any;
  loading: boolean;
  modalOpen: boolean;
  toggleModalOpen: () => void;
  back: (event) => void;
}

const UserAvatarDetailPresenter: React.FunctionComponent<IProps> = ({
  data: { getAvatarDetail: { avatar = null } = {} } = {},
  loading,
  modalOpen,
  toggleModalOpen,
  back
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && avatar) {
    return (
      <>
        {modalOpen && (
          <MenuModalContainer>
            <MenuModalOverlay onClick={toggleModalOpen} />
            <MenuModal>
              {avatar.creator.profile.isSelf ? (
                <>
                  <MenuModalLink onClick={() => console.log("DELETE AVATAR")}>
                    DELETE AVATAR
                  </MenuModalLink>
                </>
              ) : (
                <>
                  <MenuModalLink onClick={() => console.log("LIKE AVATAR")}>
                    LIKE AVATAR
                  </MenuModalLink>
                </>
              )}
              <MenuModalLink onClick={toggleModalOpen}>CANCEL</MenuModalLink>
            </MenuModal>
          </MenuModalContainer>
        )}
        <ModalContainer>
          <ModalOverlay onClick={back} />
          <SWrapper>
            <Img src={`${BACKEND_URL}/media/${avatar.image}`} />
          </SWrapper>
        </ModalContainer>
      </>
    );
  }
  return null;
};

export default UserAvatarDetailPresenter;
