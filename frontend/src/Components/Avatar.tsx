import React from "react";
import styled from "src/Styles/typed-components";

const Container = styled.img<IProps>`
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
  background-position: center center;
  background-size: 100%;
  border-radius: 50%;
`;

interface IProps {
  url?: string;
  size: string;
  bg?: string;
  className?: string;
}

const Avatar: React.SFC<IProps> = ({ className, url, size }) => {
  console.log(size);
  return <Container className={className} src={url} size={size} />;
};

export default Avatar;
