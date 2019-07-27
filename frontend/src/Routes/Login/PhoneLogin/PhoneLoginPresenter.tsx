import React from "react";
import Helmet from "react-helmet";
import styled from "src/Styles/typed-components";
import { keyframes } from "styled-components";
import Loader from "src/Components/Loader";
import Button from "../../../Components/Button";
import { countries } from "../../../countryData";

const Container = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-rows: 2 40px;
  justify-items: center;
  align-items: center;
  padding: 20px;
  height: 100%;
`;

const Form = styled.form``;

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100%;
  width: 100%;
`;

const ModalOverlay = styled.div`
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
  background-color: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(128, 128, 128, 0.5);
  border-radius: 12px;
  width: 540px;
  height: 240px;
  z-index: 5;
  animation: ${ModalAnimation} 0.1s linear;
`;

const SearchModal = styled(Modal)`
  padding: 30px;
  height: 700px;
  z-index: 10;
`;

const SButton = styled(Button)`
  width: 80px;
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

const Text = styled.div`
  text-align: inline;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const TextContainter = styled.div`
  margin: 0 10px 0 10px;
  line-height: 13px;
`;

const CountryCode = styled.div`
  font-size: 18px;
  margin-right: 12px;
  cursor: pointer;
`;

const CountryPhone = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  border-bottom: 1px solid ${props => props.theme.greyColor};
  font-size: 18px;
`;

const Input = styled.input`
  border: 0;
  display: flex;
  color: white;
  background-color: transparent;
  font-size: 18px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${props => props.theme.greyColor};
  }
`;

const SearchModalContainer = styled(ModalContainer)`
  z-index: 10;
`;
const SearchModalOverlay = styled(ModalOverlay)`
  z-index: 10;
`;

const CountryRow = styled.div`
  z-index: 10;
  height: 40px;
  width: 480px;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 10px;
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 1px solid rgba(128, 128, 128, 0.5);
  }
  &:hover {
    background-color: rgba(128, 128, 128, 0.5);
  }
`;

const CountryContainer = styled.div`
  z-index: 10;
  display: flex;
  align-content: center;
  width: 480px;
  height: 640px;
  flex-direction: column;
  overflow-y: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  ::-webkit-scrollbar {
    display: none !important;
    width: 3px;
    background: none;
  }
  &::-webkit-scrollbar-track {
    background: none;
  }
`;

const Underline = styled.p`
  text-decoration: underline;
  cursor: pointer;
`;

const CountryText = styled.div`
  display: flex;
  flex-direction: row;
`;

const CountryPhoneNumber = styled.div`
  cursor: pointer;
  font-size: 18px;
`;

interface IProps {
  countryCode: string;
  countryPhoneNumber: string;
  phoneNumber: string;
  modalOpen: boolean;
  loading: boolean;
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  back: (event) => void;
  toggleModal: () => void;
  onSelectCountry: (
    countryPhoneCode: string,
    countryPhoneNumber: string
  ) => void;
}

const PhoneLoginPresenter: React.FunctionComponent<IProps> = ({
  countryCode,
  phoneNumber,
  countryPhoneNumber,
  onInputChange,
  onSubmit,
  loading,
  back,
  modalOpen,
  toggleModal,
  onSelectCountry
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading) {
    return (
      <>
        {modalOpen && (
          <SearchModalContainer>
            <SearchModalOverlay onClick={toggleModal} />
            <SearchModal>
              <CountryContainer>
                {countries.map((country, index) => (
                  <CountryRow
                    key={index}
                    onClick={() => onSelectCountry(country.code, country.phone)}
                  >
                    <CountryText>
                      <p>&nbsp;{country.name}</p>
                      <p>&nbsp;{country.emoji}</p>
                    </CountryText>
                    <CountryText> {country.phone}</CountryText>
                  </CountryRow>
                ))}
              </CountryContainer>
            </SearchModal>
          </SearchModalContainer>
        )}
        <ModalContainer>
          <ModalOverlay onClick={back} />
          <Modal>
            <Helmet>
              <title>Phone Login . Pinner </title>
            </Helmet>
            <Container>
              <PhoneNumberContainer>
                <CountryCode onClick={toggleModal}>{countryCode}</CountryCode>
                <CountryPhone>
                  <CountryPhoneNumber onClick={toggleModal}>
                    &nbsp;{countryPhoneNumber}&nbsp;
                  </CountryPhoneNumber>
                  <Form onSubmit={onSubmit}>
                    <Input
                      type={"text"}
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
                  <p>Changed your phone number?</p>
                  <Underline>&nbsp;Login With Email.</Underline>
                </Text>
                <p>
                  When you tap "Continue", Pinnder will send a text with
                  verification code. Message and data rates may apply. The
                  verified phone number can be used to login.
                </p>
                <ExtendedForm onSubmit={onSubmit}>
                  <SButton
                    text={"CONTINUE"}
                    onClick={null}
                    inverted={loading}
                  />
                </ExtendedForm>
              </TextContainter>
            </Container>
          </Modal>
        </ModalContainer>
      </>
    );
  }
  return null;
};

export default PhoneLoginPresenter;
