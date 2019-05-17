import React from "react";
import styled from "src/Styles/typed-components";
import ProgressiveImage from "react-progressive-image";

const Container = styled.img<IProps>`
  height: ${props => {
    if (props.size === "md") {
      return "50px";
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
      return "50px";
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

const Placeholder = styled.div`
  background-color: ${props => props.color};
  height: 100;
  width: 100;
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
      <ProgressiveImage delay={1000} src={url} placeholder="">
        {(src, loading) => {
          return loading ? (
            <Placeholder className={className} color={"#141313"} />
          ) : (
            <Container className={className} src={src} size={size} />
          );
        }}
      </ProgressiveImage>
    </>
  );
};

export default Avatar;
