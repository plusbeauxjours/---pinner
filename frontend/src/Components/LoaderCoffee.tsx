import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

const Bounce = keyframes`
  0% {
    top: 0;
  }
  80% {
    height: 2em;
    width: 2em;
  }
  100% {
    top: 2.8em;
    height: 1.5em;
    width: 2.5em;
  }
`;

const Shadow = keyframes`  
  0% {
    width: 1em;
    height: 1em;
    filter(blur(0.2em));
  }
  90% {
    width: 2em;
    height: 2em;
    filter(blur(0));
  }
  100% {
    background: rgba(#000, 0.7);
  }
`;

const Loader = styled.div`
  width: 2em;
  height: 2em;
  background-color: transparent;
  transform: (translate(0, -50%));

  &::before,
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    display: block;
    height: 2em;
    width: 2em;
    border-radius: (3em);
  }

  &::before {
    z-index: 1;
    top: 2em;
    background: rgba(#000, 0.3);
    transform: (translate(-50%, -50%) rotateX(60deg));
    animation: ${Shadow} 0.75s infinite;
    animation-direction: alternate;
    animation-timing-function: cubic-bezier(0.5, 0.05, 1, 0.5);
  }

  &::after {
    z-index: 2;
    content: "\25CF";
    color: #fff;
    text-shadow: (0 0 0.3em #fff);
    transform: (translateX(-50%) translateY(-2em));
    animation: ${Bounce} 0.75s infinite;
    animation-direction: alternate;
    animation-timing-function: cubic-bezier(0.5, 0.05, 1, 0.5);
  }
`;

const LoaderCoffee: React.SFC = () => (
  <Container>
    <Loader />
  </Container>
);

export default LoaderCoffee;
