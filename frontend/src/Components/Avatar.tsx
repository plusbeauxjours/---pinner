import React from "react";
import ProgressiveImage from "react-progressive-image";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { GET_CITY_PHOTO, GET_COUNTRY_PHOTO } from "./Search/SearchQueries";

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
  cityId?: string;
  countryCode?: string;
}

const Avatar: React.SFC<IProps> = ({
  className,
  url,
  size,
  cityId,
  countryCode
}) => {
  const randomColor = require("randomcolor");
  const color = randomColor({
    luminosity: "dark",
    format: "rgba"
  });
  if (cityId) {
    console.log(cityId);
    const { data: cityPhotoData } = useQuery(GET_CITY_PHOTO, {
      variables: { cityId }
    });
    const { getCityPhoto: { photo = null } = {} } = cityPhotoData;
    console.log(photo);
    return (
      <ProgressiveImage delay={1000} src={photo} placeholder="">
        {(src, loading) => {
          return loading ? (
            <AvatarContainer size={size}>
              <Placeholder className={className} color={color} size={size} />
            </AvatarContainer>
          ) : (
            <AvatarContainer size={size}>
              <Container className={className} src={src} size={size} />
            </AvatarContainer>
          );
        }}
      </ProgressiveImage>
    );
  } else if (countryCode) {
    const { data: countryPhotoData } = useQuery(GET_COUNTRY_PHOTO, {
      variables: { countryCode }
    });
    const { getCountryPhoto: { photo = null } = {} } = countryPhotoData;

    return (
      <ProgressiveImage delay={1000} src={photo} placeholder="">
        {(src, loading) => {
          return loading ? (
            <AvatarContainer size={size}>
              <Placeholder className={className} color={color} size={size} />
            </AvatarContainer>
          ) : (
            <AvatarContainer size={size}>
              <Container className={className} src={src} size={size} />
            </AvatarContainer>
          );
        }}
      </ProgressiveImage>
    );
  } else {
    return (
      <ProgressiveImage delay={1000} src={url} placeholder="">
        {(src, loading) => {
          return loading ? (
            <AvatarContainer size={size}>
              <Placeholder className={className} color={color} size={size} />
            </AvatarContainer>
          ) : (
            <AvatarContainer size={size}>
              <Container className={className} src={src} size={size} />
            </AvatarContainer>
          );
        }}
      </ProgressiveImage>
    );
  }
};

export default Avatar;
