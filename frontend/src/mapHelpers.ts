import axios from "axios";
import { GOOGLE_MAPS_KEY } from "./keys";

import { toast } from "react-toastify";

export const reverseGeoCode = async (latitude: number, longitude: number) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?&language=en&latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_KEY}`;
  const { data } = await axios(URL);
  if (!data.error_message) {
    const { results } = data;

    let storableLocation = {
      city: "",
      cityId: "",
      countryCode: ""
    };
    console.log("MAPHELPER IS WORKING");
    console.log(results);
    for (const components of results) {
      for (const component of components.address_components) {
        if (
          component.types[0] === "locality" ||
          component.types[0] === "sublocality" ||
          component.types[0] === "colloquial_area"
        ) {
          storableLocation.city = component.long_name;
          storableLocation.cityId = components.place_id;
        } else if (
          !storableLocation.city &&
          component.types[0] === "administrative_area_level_1"
        ) {
          storableLocation.city = component.long_name;
        } else if (component.types.includes("country")) {
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
