import LoadingOverlay from "react-loading-overlay";
import React from "react";
import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";

const StyledLoadingOverlay = styled(LoadingOverlay)`
  color: ${props => props.theme.color};
`;
const StyledLoader = styled(ClipLoader)`
  color: ${props => props.theme.color};
`;

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

const Loader: React.FunctionComponent<IProps> = () => (
  <Container>
    <StyledLoadingOverlay
      active={true}
      spinner={<StyledLoader />}
      fadeSpeed={500}
    />
  </Container>
);

export default Loader;
