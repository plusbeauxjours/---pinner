import React from "react";
import styled from "src/Styles/typed-components";
import Wrapper from "./Wrapper";

const Container = styled.footer`
  margin-top: 100px;
  margin-bottom: 50px;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
`;

const SWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`;

const Bold = styled.p`
  font-weight: 400;
  text-align: center;
  font-size: 40px;
  margin-bottom: 30px;
  color: grey;
`;

const GreyText = styled.p`
  font-weight: 100;
  text-align: center;
  font-size: 12px;
  color: grey;
  line-height: 14px;
`;

const Image = styled.img`
  display: flex;
  width: 450px;
  height: 450px;
  background-position: center center;
  object-fit: cover;
  margin-bottom: 30px;
`;

const NotFound: React.FunctionComponent<any> = () => (
  <Container>
    <SWrapper>
      <Image src={require(`../Images/notFound/Astronaut-big.png`)} />
      <Bold>This Page is Lost in Space </Bold>
      <GreyText>
        You thought this mission to the moon would be a quick six month thing.
        \n Your neighbor offered to look after your dog. Your high school math
        \n teacher was impressed. He once said you wouldn’t amount to
        anything.You \n sure showed him. But now here you are, fifty feet from
        your spaceship \n with no way to get back. Your dog will be so sad. Your
        math teacher will \n be so smug. Pretty devastating. 2019 Pinner.
      </GreyText>
    </SWrapper>
  </Container>
);

export default NotFound;
