import axios from "axios";
import { MAPS_KEY } from "./keys";
import { toast } from "react-toastify";

export const reverseGeoCode = async (lat: number, lng: number) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAPS_KEY}`;
  const { data } = await axios(URL);
  if (!data.error_message) {
    const { results } = data;
    const firstPlace = results.reverse()[1];
    if (!firstPlace.address_components) {
      return false;
    }
    const city = firstPlace.address_components[0].long_name;
    const country = firstPlace.address_components[1].long_name;
    return { city, country };
  } else {
    toast.error(data.error_message);
    return false;
  }
};
