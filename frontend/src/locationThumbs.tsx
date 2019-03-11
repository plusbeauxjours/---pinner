import axios from "axios";
import { UNSPLASH_ACCESS_KEY } from "./keys";
import { toast } from "react-toastify";

export const locationThumbs = async cityName => {
  const URL = `https://api.unsplash.com/search/photos/?page=1&per_page=10&query=${cityName}&client_id=${UNSPLASH_ACCESS_KEY}`;
  const { data } = await axios(URL);
  if (!data.error_message) {
    const { results } = data;
    const cityPhotoURL = results[0].urls.small;
    console.log(cityPhotoURL);
    return cityPhotoURL;
  } else {
    toast.error(data.error_message);
    return null;
  }
};
