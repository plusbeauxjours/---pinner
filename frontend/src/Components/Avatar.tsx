import React from "react";
import styled from "src/Styles/typed-components";

const Container = styled.img<IProps>`
  height: ${props => {
    if (props.size === "md") {
      return "60px";
    } else if (props.size === "sm") {
      return "30px";
    } else if (props.size === "lg") {
      return "170px";
    } else {
      return "30px";
    }
  }};
  width: ${props => {
    if (props.size === "md") {
      return "60px";
    } else if (props.size === "sm") {
      return "30px";
    } else if (props.size === "lg") {
      return "170px";
    } else {
      return "30px";
    }
  }};
  background-position: center center;
  border-radius: 50%;
  background-size: cover;
  object-fit: cover;
`;

interface IProps {
  url?: string;
  size: string;
  bg?: string;
  className?: string;
}

const Avatar: React.SFC<IProps> = ({ className, url, size }) => {
  return <Container className={className} src={url} size={size} />;
};

export default Avatar;
