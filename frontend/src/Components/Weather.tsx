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
  lat: number;
  lng: number;
}

interface IState {
  lat: number;
  lng: number;
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
      lat: props.lat,
      lng: props.lng,
      aqi: 0,
      icon: null,
      humidity: 0,
      temp: 0,
      chill: 0
    };
  }
  public componentDidMount() {
    const { lat, lng } = this.state;
    this.getWeather(lat, lng);
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
  public getWeather = async (lat: number, lng: number) => {
    const aqi = await getAqi(lat, lng);
    const { icon, humidity, temp, chill } = await getWeather(lat, lng);
    this.setState({ aqi, icon, humidity, temp, chill });
  };
}

export default Weather;
