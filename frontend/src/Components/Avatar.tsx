import React from "react";
import ProgressiveImage from "react-progressive-image";
import styled from "styled-components";

const Container = styled.img<ITheme>`
  height: ${props => {
    if (props.size === "md") {
      return "50px";
    } else if (props.size === "sm") {
      return "30px";
    } else if (props.size === "lg") {
      return "200px";
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
      return "200px";
    } else {
      return "30px";
    }
  }};
  background-position: center center;
  border-radius: 50%;
  background-size: cover;
  object-fit: cover;
`;

const Placeholder = styled.div<ITheme>`
  background-color: ${props => props.color};
  height: ${props => {
    if (props.size === "md") {
      return "50px";
    } else if (props.size === "sm") {
      return "30px";
    } else if (props.size === "lg") {
      return "200px";
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
      return "200px";
    } else {
      return "30px";
    }
  }};
  border-radius: 50%;
`;

const AvatarContainer = styled.div<ITheme>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${props => {
    if (props.size === "sm") {
      return "45px";
    } else {
      return null;
    }
  }};
  width: ${props => {
    if (props.size === "sm") {
      return "45px";
    } else {
      return null;
    }
  }};
`;

interface ITheme {
  size: string;
}

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
            <AvatarContainer size={size}>
              <Placeholder
                className={className}
                color={"#141313"}
                size={size}
              />
            </AvatarContainer>
          ) : (
            <AvatarContainer size={size}>
              <Container className={className} src={src} size={size} />
            </AvatarContainer>
          );
        }}
      </ProgressiveImage>
    </>
  );
};

export default Avatar;
