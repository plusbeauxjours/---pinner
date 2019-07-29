import LoadingOverlay from "react-loading-overlay";
import React from "react";
import styled from "styled-components";
import BeatLoader from "react-spinners/BeatLoader";

const StyledLoadingOverlay = styled(LoadingOverlay)`
  color: ${props => props.theme.color};
`;

const StyledLoader = styled(BeatLoader)<ITheme>`
  width: ${props => {
    if (props.type === "feed") {
      return "22px";
    } else {
      return "60px";
    }
  }};
  height: ${props => {
    if (props.type === "feed") {
      return "22px";
    } else {
      return "60px";
    }
  }};
  color: ${props => props.theme.color};
`;

const Container = styled.div<ITheme>`
  width: ${props => {
    if (props.type === "feed") {
      return "22px";
    } else {
      return "60px";
    }
  }};
  height: ${props => {
    if (props.type === "feed") {
      return "22px";
    } else {
      return "60px";
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(90deg);
`;

interface ITheme {
  type?: string;
}

interface IProps {
  type?: string;
  text?: string;
}

const Loader: React.FunctionComponent<IProps> = ({ type }) => (
  <Container type={type}>
    <StyledLoadingOverlay
      active={true}
      spinner={<StyledLoader type={type} />}
      fadeSpeed={500}
    />
  </Container>
);

export default Loader;
