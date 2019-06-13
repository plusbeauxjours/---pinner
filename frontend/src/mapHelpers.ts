import axios from "axios";
import { GOOGLE_MAPS_KEY } from "./keys";

import { toast } from "react-toastify";

export const reverseGeoCode = async (latitude: number, longitude: number) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?&language=en&latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_KEY}`;
  const { data } = await axios(URL);
  if (!data.error_message) {
    const { results } = data;

    let storableLocation = {
      cityName: "",
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
          storableLocation.cityName = component.long_name;
          storableLocation.cityId = components.place_id;
        } else if (
          !storableLocation.cityName &&
          component.types[0] === "administrative_area_level_1"
        ) {
          storableLocation.cityName = component.long_name;
        } else if (component.types.includes("country")) {
          storableLocation.countryCode = component.short_name;
        }
      }
    }
    console.log(storableLocation);
    return { storableLocation };
  } else {
    toast.error(data.error_message);
    return null;
  }
};

export const reversePlaceId = async (placeId: string) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?&language=en&place_id=${placeId}&key=${GOOGLE_MAPS_KEY}`;
  const { data } = await axios(URL);
  if (!data.error_message) {
    const { results } = data;

    let storableLocation = {
      latitude: 0,
      longitude: 0,
      countryCode: ""
    };
    console.log(results);
    for (const component of results[0].address_components) {
      if (component.types[0] === "country") {
        storableLocation.countryCode = component.short_name;
      }
    }
    storableLocation.latitude = results[0].geometry.location.lat;
    storableLocation.longitude = results[0].geometry.location.lng;
    console.log(storableLocation);
    return { storableLocation };
  } else {
    toast.error(data.error_message);
    return null;
  }
};
