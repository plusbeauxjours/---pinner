import React from "react";
import styled from "src/Styles/typed-components";

const Container = styled.div``;

const SFlag = styled.img<IProps>`
  height: ${props => {
    if (props.size === "md") {
      return "50px";
    } else if (props.size === "sm") {
      return "30px";
    } else if (props.size === "lg") {
      return "150px";
    } else {
      return "30px";
    }
  }};
  width: ${props => {
    if (props.size === "md") {
      return "50px";
    } else if (props.size === "sm") {
      return "30px";
    } else if (props.size === "lg") {
      return "150px";
    } else {
      return "30px";
    }
  }};
  display: flex;
  background-position: center center;
  background-size: 100%;
  border-radius: 50%;
  opacity: 0.8;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.11);
`;

const Overlay = styled.div<IProps>`
  height: ${props => {
    if (props.size === "md") {
      return "50px";
    } else if (props.size === "sm") {
      return "30px";
    } else if (props.size === "lg") {
      return "150px";
    } else {
      return "30px";
    }
  }};
  width: ${props => {
    if (props.size === "md") {
      return "25px";
    } else if (props.size === "sm") {
      return "15px";
    } else if (props.size === "lg") {
      return "75px";
    } else {
      return "15px";
    }
  }};
  border-bottom-left-radius: ${props => {
    if (props.size === "md") {
      return "100px";
    } else if (props.size === "sm") {
      return "60px";
    } else if (props.size === "lg") {
      return "300px";
    } else {
      return "60px";
    }
  }};
  border-top-left-radius: ${props => {
    if (props.size === "md") {
      return "100px";
    } else if (props.size === "sm") {
      return "60px";
    } else if (props.size === "lg") {
      return "300px";
    } else {
      return "60px";
    }
  }};
  z-index: 1;
  background: rgba(0, 0, 0, 0.2);
  background-position: center center;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 0.5;
  }
`;

interface IProps {
  countrycode?: string;
  size: string;
  bg?: string;
  className?: string;
}

const Flag: React.SFC<IProps> = ({ className, countrycode, size }) => (
  <Container>
    <Overlay size={size}>
      <SFlag className={className} src={countrycode} size={size} />
    </Overlay>
  </Container>
);

export default Flag;
