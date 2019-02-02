import React, { ReactNode } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100;
  margin: 0 auto;
  max-width: 935px;
`;

interface IProps {
  children?: ReactNode;
  className?: string;
}

const Wrapper: React.SFC<IProps> = ({ children, className }) => (
  <Container className={className}>{children}</Container>
);

export default Wrapper;
