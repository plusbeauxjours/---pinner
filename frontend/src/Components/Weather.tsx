import React from "react";
import styled from "src/Styles/typed-components";
import { getAqi, getWeather } from "../weatherHelper";
import LoaderData from "./LoaderData";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const WeatherInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const WeatherImage = styled.img`
  height: 60px;
  width: 60px;
  background-position: center center;
  background-size: 100%;
`;

interface IProps {
  latitude: number;
  longitude: number;
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
  public componentDidUpdate(oldProps) {
    const newProps = this.props;
    if (oldProps !== newProps) {
      this.getWeather(newProps.latitude, newProps.longitude);
    }
  }
  public render() {
    const { aqi, icon, humidity, temp, chill } = this.state;
    return (
      <Container>
        {icon ? (
          <WeatherImage src={require(`../Images/weatherIcon/${icon}.svg`)} />
        ) : (
          <LoaderData />
        )}
        <WeatherInfo>
          <p>AQI {aqi}</p>
          <p>Humidity {humidity}</p>
          <p>Temp {temp.toFixed(1)} °C</p>
          <p>Feels {chill.toFixed(1)} °C</p>
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
