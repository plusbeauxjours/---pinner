import React from "react";
import ProgressiveImage from "react-progressive-image";
import styled from "styled-components";

const Container = styled.img<IProps>`
  height: ${props => {
    if (props.size === "md") {
      return "50px";
    } else if (props.size === "sm") {
      return "45px";
    } else if (props.size === "lg") {
      return "200px";
    } else {
      return "45px";
    }
  }};
  width: ${props => {
    if (props.size === "md") {
      return "50px";
    } else if (props.size === "sm") {
      return "45px";
    } else if (props.size === "lg") {
      return "200px";
    } else {
      return "45px";
    }
  }};
  background-position: center center;
  border-radius: 50%;
  background-size: cover;
  object-fit: cover;
`;

const Placeholder = styled.div<IProps>`
  background-color: ${props => props.color};
  height: ${props => {
    if (props.size === "md") {
      return "50px";
    } else if (props.size === "sm") {
      return "45px";
    } else if (props.size === "lg") {
      return "200px";
    } else {
      return "45px";
    }
  }};
  width: ${props => {
    if (props.size === "md") {
      return "50px";
    } else if (props.size === "sm") {
      return "45px";
    } else if (props.size === "lg") {
      return "200px";
    } else {
      return "45px";
    }
  }};
  border-radius: 50%;
`;

interface IProps {
  url?: string;
  size: string;
  bg?: string;
  className?: string;
}

const Avatar: React.SFC<IProps> = ({ className, url, size }) => {
  return (
    <>
      <ProgressiveImage delay={0} src={url} placeholder="">
        {(src, loading) => {
          return loading ? (
            <Placeholder className={className} color={"#141313"} size={size} />
          ) : (
            <Container className={className} src={src} size={size} />
          );
        }}
      </ProgressiveImage>
    </>
  );
};

export default Avatar;
