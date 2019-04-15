import React from "react";
import styled from "src/Styles/typed-components";

const WeatherImage = styled.img<IProps>`
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
  svg {
    fill: white;
  }
`;

const Icon = styled.div`
  path {
    fill: white;
  }
`;

interface IProps {
  icon?: string;
  size: string;
}

const Weather: React.SFC<IProps> = ({ icon, size }) => (
  <Icon>
    {console.log("icon:", icon)}
    <WeatherImage
      src={require(`../Images/weatherIcon/${icon}.svg`)}
      size={size}
    />
  </Icon>
);

export default Weather;
