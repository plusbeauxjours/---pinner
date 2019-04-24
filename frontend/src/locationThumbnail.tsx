import axios from "axios";
import { UNSPLASH_ACCESS_KEY } from "./keys";
import { toast } from "react-toastify";

export const cityThumbnail = async cityName => {
  const URL = `https://api.unsplash.com/search/photos/?page=1&per_page=10&fit=crop&w=300&h=300&query=${cityName}&client_id=${UNSPLASH_ACCESS_KEY}`;
  const { data } = await axios(URL);
  if (!data.error_message) {
    const { results } = data;
    const cityPhotoURL = results[0].urls.regular;
    return cityPhotoURL;
  } else {
    toast.error(data.error_message);
    return null;
  }
};

export const countryThumbnail = async countryName => {
  const URL = `https://api.unsplash.com/search/photos/?page=1&per_page=10&fit=crop&w=300&h=300&query=${countryName}&client_id=${UNSPLASH_ACCESS_KEY}`;
  const { data } = await axios(URL);
  if (!data.error_message) {
    const { results } = data;
    const countryPhotoURL = results[0].urls.regular;
    return countryPhotoURL;
  } else {
    toast.error(data.error_message);
    return null;
  }
};

export const continentThumbnail = async continentName => {
  const URL = `https://api.unsplash.com/search/photos/?page=1&per_page=10&fit=crop&w=300&h=300&query=${continentName}&client_id=${UNSPLASH_ACCESS_KEY}`;
  const { data } = await axios(URL);
  if (!data.error_message) {
    const { results } = data;
    const continentPhotoURL = results[0].urls.regular;
    return continentPhotoURL;
  } else {
    toast.error(data.error_message);
    return null;
  }
};
