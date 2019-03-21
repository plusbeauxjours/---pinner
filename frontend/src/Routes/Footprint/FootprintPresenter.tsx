import React from "react";
import Footprint from "../Footprint";
import FootprintRow from "../../Components/FootprintRow";
import styled from "src/Styles/typed-components";
import Wrapper from "src/Components/Wrapper";
import { GetFootprints } from "../../types/api";
import Loader from "src/Components/Loader";
import { Route } from "react-router";
import { keyframes } from "styled-components";

const SWrapper = styled(Wrapper)`
  max-width: 650px;
`;

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
  background-color: #2d3a41;
  width: 100;
  max-width: 935px;
  z-index: 5;
  animation: ${ModalAnimation} 0.1s linear;
`;

interface IProps {
  data?: GetFootprints;
  loading: boolean;
  className?: string;
  modalOpen: boolean;
  toggleModal: () => void;
  back: (event) => void;
}

const FootprintPresenter: React.SFC<IProps> = ({
  data: { getFootprints: { footprints = null } = {} } = {},
  loading,
  className,
  modalOpen,
  toggleModal,
  back
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && footprints) {
    console.log(footprints);
    return (
      <>
        {modalOpen && (
          <Route path="/:username/footprint" component={Footprint} />
        )}
        <ModalContainer>
          <ModalOverlay onClick={back} />
          <Modal>
            <SWrapper>
              {footprints &&
                footprints.map(footprint => {
                  return (
                    <FootprintRow
                      className={className}
                      id={footprint.id}
                      key={footprint.id}
                      footprint={footprint}
                      toggleModal={toggleModal}
                    />
                  );
                })}
            </SWrapper>
          </Modal>
        </ModalContainer>
      </>
    );
  } else {
    return null;
  }
};

export default FootprintPresenter;
