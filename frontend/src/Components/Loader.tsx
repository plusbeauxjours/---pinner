import React from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
`

const loaderAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  
  25% {
    transform: rotate(180deg);
  }
  
  50% {
    transform: rotate(180deg);
  }
  
  75% {
    transform: rotate(360deg);
  }
  
  100% {
    transform: rotate(360deg);
  }
`

const loaderInnerAnimation = keyframes`
  0% {
    height: 0%;
  }
  25% {
    height: 0%;
  }
  
  50% {
    height: 100%;
  }
  
  75% {
    height: 100%;
  }
  
  100% {
    height: 0%;
  }
`


const Loader = styled.div`
  display: inline-block;
  width: 30px;
  height: 30px;
  position: relative;
  border: 4px solid #262f3e;
  top: 50%;
  animation: ${loaderAnimation} 2s linear;
`

const LoaderInner = styled.div`
  vertical-align: top;
  display: inline-block;
  width: 100%;
  background-color: #262f3e;
  animation: ${loaderInnerAnimation} 2s linear;
`

export default () => (
  <Container>
    <Loader><LoaderInner/></Loader>
  </Container>)