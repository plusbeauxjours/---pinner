import React from "react";
import Helmet from "react-helmet";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { MutationFn } from "react-apollo";
import Form from "src/Components/Form";
import styled from "src/Styles/typed-components";
import { keyframes } from "styled-components";
import Loader from "src/Components/Loader";
import Wrapper from "../../Components/Wrapper";

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 20px;
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
  background-color: white;
  border-radius: 12px;
  width: 540px;
  height: 240px;
  z-index: 5;
  animation: ${ModalAnimation} 0.1s linear;
`;

interface IProps {
  verificationKey: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: MutationFn;
  loading: boolean;
  back: (event) => void;
}

const VerifyPhonePresenter: React.SFC<IProps> = ({
  verificationKey,
  onChange,
  onSubmit,
  loading,
  back
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading) {
    return (
      <ModalContainer>
        <ModalOverlay onClick={back} />
        <Modal>
          <Wrapper>
            <Container>
              <Helmet>
                <title>Verify Phone . Pinner</title>
              </Helmet>
              <ExtendedForm onSubmit={onSubmit}>
                <ExtendedInput
                  value={verificationKey}
                  placeholder={"Enter Verification Code"}
                  onChange={onChange}
                  name={"verificationKey"}
                />
                <Button text={"verify"} onClick={null} inverted={loading} />
              </ExtendedForm>
            </Container>
          </Wrapper>
        </Modal>
      </ModalContainer>
    );
  }
  return null;
};

export default VerifyPhonePresenter;
