import axios from "axios";
import { AQICN_KEY, OPEN_WEATHER_MAP_KEY } from "./keys";
import { toast } from "react-toastify";

export const getAqi = async (lat, lng) => {
  const URL = `https://api.waqi.info/feed/geo:${lat};${lng}/?token=${AQICN_KEY}`;
  const { data } = await axios(URL);
  if (data.status === "ok") {
    const {
      data: { aqi }
    } = data;
    return aqi;
  } else {
    toast.error(data.error);
    return null;
  }
};

export const getWeather = async (lat, lng) => {
  const URL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${OPEN_WEATHER_MAP_KEY}`;
  const { data } = await axios(URL);
  if (data) {
    const {
      weather,
      wind: { speed: wind },
      main
    } = data;
    const icon = weather[0].icon;
    const humidity = main.humidity;
    const temp = main.temp - 273.15;
    const chill =
      (await 13.12) +
      0.6215 * temp -
      11.37 * wind ** 0.16 +
      0.3965 * temp * wind ** 0.16;
    return { icon, humidity, temp, chill };
  } else {
    toast.error(data.error);
    return null;
  }
};
