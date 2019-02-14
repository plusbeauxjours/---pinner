import React from "react";
import styled from "src/Styles/typed-components";
import { location } from "../../types/api";

const Container = styled.div``;

interface IProps {
  data: location;
  loading: boolean;
}

const LocationPresenter: React.SFC<IProps> = ({ data, loading }) => (
  <Container>{data}</Container>
);

export default LocationPresenter;
