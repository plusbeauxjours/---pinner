import React from "react";
import styled from "styled-components";

const Container = styled.div<IProps>`
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
  background-image: url(${props => props.bg});
  background-position: center center;
  background-size: 100%;
  border-radius: 50%;
`;

interface IProps {
  url: any;
  size: string;
  bg?: string;
}

const Avatar: React.SFC<IProps> = ({ url, size = "md" }) => (
  <Container url={url} size={size}>
    d
  </Container>
);

export default Avatar;
