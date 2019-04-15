import axios from "axios";
import { AQICN_KEY } from "./keys";
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
