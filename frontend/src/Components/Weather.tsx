import React from "react";
import styled from "src/Styles/typed-components";
import { getAqi, getWeather } from "../weatherHelper";
import LoaderData from "./LoaderData";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const WeatherInfo = styled.div<ITheme>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: ${props => {
    if (props.type === "feed") {
      return "25px";
    } else {
      return "100%";
    }
  }};
  flex-wrap: wrap;
`;

const WeatherImage = styled.img<ITheme>`
  height: ${props => {
    if (props.size === "md") {
      return "60px";
    } else if (props.size === "sm") {
      return "25px";
    } else {
      return "60px";
    }
  }};
  width: ${props => {
    if (props.size === "md") {
      return "60px";
    } else if (props.size === "sm") {
      return "25px";
    } else {
      return "60px";
    }
  }};
  margin-right: 2px;
`;

const WeatherNumber = styled.div<ITheme>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3px;
  margin-right: 5px;
  font-size: ${props => {
    if (props.size === "sm") {
      return "8px";
    } else {
      return "12px";
    }
  }};
`;

interface ITheme {
  size?: string;
  type?: string;
}

interface IProps {
  latitude: number;
  longitude: number;
  size?: string;
  type?: string;
}

interface IState {
  aqi: number;
  icon: string;
  humidity: number;
  temp: number;
  chill: number;
}

class Weather extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      aqi: 0,
      icon: null,
      humidity: 0,
      temp: 0,
      chill: 0
    };
  }
  public componentDidMount() {
    const { latitude, longitude } = this.props;
    this.getWeather(latitude, longitude);
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps !== newProps) {
      this.getWeather(newProps.latitude, newProps.longitude);
    }
  }
  public render() {
    const { size, type } = this.props;
    const { aqi, icon, humidity, temp, chill } = this.state;
    return (
      <Container>
        {icon ? (
          <WeatherImage
            src={require(`../Images/weatherIcon/${icon}.svg`)}
            size={size}
          />
        ) : (
          <LoaderData />
        )}
        <WeatherInfo type={type}>
          <WeatherNumber size={size}>
            <p>Temp</p>
            <p> {temp.toFixed(1)} °C</p>
          </WeatherNumber>
          <WeatherNumber size={size}>
            <p>Feels</p>
            <p> {chill.toFixed(1)} °C</p>
          </WeatherNumber>
          <WeatherNumber size={size}>
            <p>AQI</p>
            <p> {aqi}</p>
          </WeatherNumber>
          <WeatherNumber size={size}>
            <p>Humidity</p>
            <p> {humidity}</p>
          </WeatherNumber>
        </WeatherInfo>
      </Container>
    );
  }
  public getWeather = async (latitude: number, longitude: number) => {
    const aqi = await getAqi(latitude, longitude);
    const { icon, humidity, temp, chill } = await getWeather(
      latitude,
      longitude
    );
    this.setState({ aqi, icon, humidity, temp, chill });
  };
}

export default Weather;
