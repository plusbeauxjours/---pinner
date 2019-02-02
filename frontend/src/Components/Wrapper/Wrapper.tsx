import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100;
  margin: 0 auto;
  max-width: 935px;
`;

interface IProps {
  children: string;
}

const Wrapper: React.SFC<IProps> = ({ children }) => (
  <Container>{children}</Container>
);

export default Wrapper;
