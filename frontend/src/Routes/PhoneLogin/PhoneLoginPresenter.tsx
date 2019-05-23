import React from "react";
import Helmet from "react-helmet";
import Input from "../../Components/Input";
import styled from "src/Styles/typed-components";
import { keyframes } from "styled-components";
import Wrapper from "src/Components/Wrapper";
import Loader from "src/Components/Loader";
import Button from "../../Components/Button";

const Container = styled.div`
  margin-top: 10px;
  padding: 20px 10px;
`;

const Form = styled.form``;

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
  border-radius: 12px;
  width: 540px;
  height: 240px;
  z-index: 5;
  animation: ${ModalAnimation} 0.1s linear;
`;

const SButton = styled(Button)`
  width: 50px;
  margin-top: 20px;
`;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
`;

const PhoneNumberContainer = styled.span``;

interface IProps {
  countryCode: string;
  phoneNumber: string;
  countryPhone: string;
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  back: (event) => void;
}

const PhoneLoginPresenter: React.SFC<IProps> = ({
  countryCode,
  phoneNumber,
  countryPhone,
  onInputChange,
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
                <title>Phone Login . Pinner </title>
              </Helmet>
              <PhoneNumberContainer>
                {console.log(countryCode, countryPhone)}
                {countryCode}
                {countryPhone}
                <Form onSubmit={onSubmit}>
                  <Input
                    placeholder={"010 8520 1031"}
                    value={phoneNumber}
                    name={"phoneNumber"}
                    onChange={onInputChange}
                  />
                </Form>
              </PhoneNumberContainer>
              <ExtendedForm onSubmit={onSubmit}>
                <SButton text={"CONTINUE"} onClick={null} inverted={loading} />
              </ExtendedForm>
            </Container>
          </Wrapper>
        </Modal>
      </ModalContainer>
    );
  }
  return null;
};

export default PhoneLoginPresenter;
