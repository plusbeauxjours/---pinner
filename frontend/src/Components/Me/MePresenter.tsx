import React from "react";
import { me } from "../../types/api";
import styled from "styled-components";

const Container = styled.div``;

interface IProps {
  data?: me;
  loading: boolean;
}

const MePresenter: React.SFC<IProps> = ({ loading, data, children }) => (
  <Container>
    {!loading && data && <React.Fragment>{children}</React.Fragment>}}
  </Container>
);

export default MePresenter;
