import axios from "axios";
import { throttleAdapterEnhancer } from "axios-extensions";

const instance = axios.create({
  baseUR: "/",
  Accept: "application/json",
  headers: { "Cache-Control": "no-cache" },
  adapter: throttleAdapterEnhancer(axios.defaults.adapter, 1000 * 60 * 10),
});

export const getSerachData = async (query, page = 1, forceUpdate = false) => {
  const response = await instance.get(`https://api.unsplash.com/search/photos`, {
    forceUpdate,
    cache: true,
    headers : {
        Authorization : 'Client-ID ' + process.env.REACT_APP_ACCESS_KEY
    },
    params : {
        query,
        page
    }
  });

  return response.data;
};
