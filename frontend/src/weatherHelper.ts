import axios from "axios";
import { AQICN_KEY, OPEN_WEATHER_MAP_KEY } from "./keys";
import { toast } from "react-toastify";

export const AQI = async (lat, lng) => {
  const URL = `https://api.waqi.info/feed/geo:${lat};${lng}/?token=${AQICN_KEY}`;
  const { data } = await axios(URL);

  if (data.status === "ok") {
    const {
      data: { aqi }
    } = data;
    console.log(aqi);
    return aqi;
  } else {
    toast.error(data.error);
    return null;
  }
};

export const Temp = async (lat, lng) => {
  const URL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${OPEN_WEATHER_MAP_KEY}`;
  const { data } = await axios(URL);
  console.log(data);
  if (data) {
    const { weather, wind, main } = data;
    const icon = weather[0].icon;
    const windDeg = wind.deg;
    const windSpeed = wind.speed;
    const humidity = main.humidity;
    const temp = main.temp - 273.15;
    return { icon, windDeg, windSpeed, humidity, temp };
  } else {
    toast.error(data.error);
    return null;
  }
};
