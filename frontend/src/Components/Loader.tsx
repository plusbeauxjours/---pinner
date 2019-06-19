import LoadingOverlay from "react-loading-overlay";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  justify-content: center;
  align-self: center;
  text-align: inline;
`;

interface IProps {
  text?: string;
}

const Loader: React.SFC<IProps> = () => (
  <Container>
    <LoadingOverlay
      active={true}
      spinner={true}
      fadeSpeed={500}
      text="Loading"
    />
  </Container>
);

export default Loader;
