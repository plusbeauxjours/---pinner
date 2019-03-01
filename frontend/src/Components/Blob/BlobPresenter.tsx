import React from "react";
import styled from "styled-components";

const BlobWrapper = styled.div`
  max-width: 400px;
  height: 400px;
  margin: 0 auto;
`;

const Blob = styled.div<IProps>`
  width: 100%;
  height: 100%;
  margin-top: 20px;
  background: black;
  background-size: cover;
  border-radius: ${props => props.borderRadius};
`;

interface IProps {
  borderRadius: string;
}

const BlobPresenter: React.SFC<IProps> = ({ borderRadius }) => (
  <BlobWrapper>
    <Blob borderRadius={borderRadius}>"hihi"</Blob>
  </BlobWrapper>
);

export default BlobPresenter;
