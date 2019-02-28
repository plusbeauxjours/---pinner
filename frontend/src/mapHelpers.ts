import axios from "axios";
import { MAPS_KEY } from "./keys";
import { toast } from "react-toastify";

export const reverseGeoCode = async (lat: number, lng: number) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?&language=en&latlng=${lat},${lng}&key=${MAPS_KEY}`;
  const { data } = await axios(URL);
  if (!data.error_message) {
    const { results } = data;
    const firstPlace = results.reverse()[1];
    if (!firstPlace.address_components) {
      return false;
    }

    let storableLocation = {
      city: "",
      country: "",
      countryCode: ""
    };
    console.log(results);
    for (const components of results) {
      for (const component of components.address_components) {
        if (
          component.types[0] === "locality" ||
          component.types[0] === "sublocality"
        ) {
          storableLocation.city = component.long_name;
        } else if (component.types.includes("country")) {
          storableLocation.country = component.long_name;
          storableLocation.countryCode = component.short_name;
        }
      }
    }
    console.log(storableLocation);
    return { storableLocation };
  } else {
    toast.error(data.error_message);
    return false;
  }
};
