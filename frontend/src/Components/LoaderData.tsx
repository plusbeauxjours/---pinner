import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 15px }
  100% { margin-bottom: 0 }
`;

const DotWrapper = styled.div<ITheme>`
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
`;

const Dot = styled.div<ITheme>`
  background-color: white;
  border-radius: 50%;
  width: ${props => {
    if (props.type === "feed") {
      return "2px";
    } else {
      return "6px";
    }
  }};
  height: ${props => {
    if (props.type === "feed") {
      return "2px";
    } else {
      return "6px";
    }
  }};
  margin: 0 5px;
  /* Animation */
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${props => props.delay};
`;

interface ITheme {
  delay?: string;
  type?: string;
}

interface IProps {
  type?: string;
}

class LoaderData extends Component<IProps> {
  public render() {
    const { type } = this.props;
    return (
      <DotWrapper type={type}>
        <Dot delay="0s" type={type} />
        <Dot delay=".1s" type={type} />
        <Dot delay=".2s" type={type} />
      </DotWrapper>
    );
  }
}
export default LoaderData;
