import React from "react";
// import Loader from "src/Components/Loader";
import styled from "src/Styles/typed-components";
import Wrapper from "src/Components/Wrapper";

const SWrapper = styled(Wrapper)`
  max-width: 650px;
`;

const Container = styled.div``;

interface IProps {
  className?: string;
}

const NotificationPresenter: React.SFC<IProps> = ({ className }) => {
  // if (loading) {
  //   return <Loader />;
  // } else  {
  //   console.log(data);
  return (
    <SWrapper>
      <Container className={className}>
        <p>NotificationPresenter</p>
      </Container>
      <Container className={className}>
        <p>NotificationPresenter</p>
      </Container>
      <Container className={className}>
        <p>NotificationPresenter</p>
      </Container>
      <Container className={className}>
        <p>NotificationPresenter</p>
      </Container>
    </SWrapper>
  );
  // } else {
  //   return null;
  // }
};

export default NotificationPresenter;
