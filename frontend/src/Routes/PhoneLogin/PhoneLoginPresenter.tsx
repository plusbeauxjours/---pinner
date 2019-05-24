import React from "react";
import Helmet from "react-helmet";
import styled from "src/Styles/typed-components";
import { keyframes } from "styled-components";
import Loader from "src/Components/Loader";
import Button from "../../Components/Button";

const Container = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-rows: 2, 50px;
  justify-items: center;
  align-items: center;
  padding: 20px;
  height: 100%;
`;

const Form = styled.form`
  margin-left: 5px;
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

const PhoneNumberContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
`;

const Text = styled.p``;

const TextContainter = styled.div`
  margin: 0 10px 0 10px;
`;

const CountryCode = styled.div`
  font-size: 20px;
  margin-right: 12px;
  cursor: pointer;
`;

const CountryPhone = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  border-bottom: 1px solid ${props => props.theme.greyColor};
  font-size: 20px;
`;

const Input = styled.input`
  border: 0;
  display: flex;
  color: white;
  background-color: transparent;
  font-size: 20px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${props => props.theme.greyColor};
  }
`;

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
          <Helmet>
            <title>Phone Login . Pinner </title>
          </Helmet>
          <Container>
            <PhoneNumberContainer>
              {console.log(countryCode, countryPhone)}
              <CountryCode>{countryCode}</CountryCode>
              <CountryPhone>
                {countryPhone}
                <Form onSubmit={onSubmit}>
                  <Input
                    type={"number"}
                    autoFocus={true}
                    value={phoneNumber}
                    name={"phoneNumber"}
                    onChange={onInputChange}
                    autoComplete={"off"}
                  />
                </Form>
              </CountryPhone>
            </PhoneNumberContainer>
            <TextContainter>
              <Text>
                <p>Changed your phone number?Login With Email.</p>
                <p>
                  When you tap "Continue", Tinder will send a text with
                  verification code. Message and data rates may apply. The
                  verified phone number can be used to login. Learn what happens
                  when your number changes.
                </p>
              </Text>
              <ExtendedForm onSubmit={onSubmit}>
                <SButton text={"CONTINUE"} onClick={null} inverted={loading} />
              </ExtendedForm>
            </TextContainter>
          </Container>
        </Modal>
      </ModalContainer>
    );
  }
  return null;
};

export default PhoneLoginPresenter;
