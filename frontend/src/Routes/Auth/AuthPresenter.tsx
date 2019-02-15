import React from "react";
import styled from "../../Styles/typed-components";
import Wrapper from "../../Components/Wrapper";
import LogIn from "../../Components/LogIn";
import SignUp from "../../Components/SignUp";
import PhoneImage from "../../Images/phone.png";
import { Link } from "react-router-dom";

const Container = styled(Wrapper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 125px;
  max-width: 745px;
`;

const Phone = styled.img`
  max-width: 360px;
`;

const Box = styled.div`
  background-color: white;
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

interface IProps {
  logIn: boolean;
  changeMode: any;
}

const SocialLogin = styled.div`
  border-top: 1px solid ${props => props.theme.greyColor};
  padding: 30px 20px;
`;

const SocialLink = styled.span`
  color: ${props => props.theme.blueColor};
  font-size: 20px;
  cursor: pointer;
`;

const AuthPresenter: React.SFC<IProps> = ({ logIn, changeMode }) => (
  <Container>
    <Phone src={PhoneImage} />
    <Column>
      <FormBox>{logIn ? <LogIn /> : <SignUp />}</FormBox>
      <SwitchBox>
        {logIn ? (
          <>Don't have an account? </>
        ) : (
          <>
            Have an account?{" "}
            <SwitchLink onClick={changeMode}>Log in</SwitchLink>
          </>
        )}
      </SwitchBox>
      <Link to={"/social-login"}>
        <SocialLogin>
          <SocialLink>Or connect with social</SocialLink>
        </SocialLogin>
      </Link>
    </Column>
  </Container>
);

export default AuthPresenter;
