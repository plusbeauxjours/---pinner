import React from "react";
import styled from "src/Styles/typed-components";

const Flag = styled.img<IProps>`
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
  color: white;
  z-index: 1;
  background: rgba(0, 0.1, 0, 0.2);
  background-position: center center;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
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
  margin-bottom: 15px;
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

const Avatar: React.SFC<IProps> = ({ className, countrycode, size }) => (
  <Overlay size={size}>
    <Flag className={className} src={countrycode} size={size} />
  </Overlay>
);

export default Avatar;
