import axios from "axios";
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from "axios-extensions";

const instance = axios.create({
  baseURL: "/",
  Accept: "application/json",
  headers: { "Cache-Control": "no-cache" },
  adapter: throttleAdapterEnhancer(axios.defaults.adapter, {
    threshold: 1000 * 60 * 10,
  }),
});

const force = axios.create({
    baseURL: '/',
    Accept: 'application/json',
    headers: { 'Cache-Control': 'no-cache' },
    adapter: cacheAdapterEnhancer(
        axios.defaults.adapter,
      { enabledByDefault: false }
    ),
    });

export const getSerachData = async (query, page = 1, forceUpdate = false) => {
  const localToken = localStorage.getItem("userAccessToken") || false;
    const response = await instance.get(
      `https://api.unsplash.com/search/photos`,
      {
        forceUpdate,
        cache: true,
        headers: {
            Authorization: localToken
              ? "Bearer " + localToken
              : "Client-ID " + process.env.REACT_APP_ACCESS_KEY,
          },
        params: {
          query,
          page,
        },
      }
    );
    return response.data;
};

export const getSerachDataForce = async (query, page = 1) => {
    const localToken = localStorage.getItem("userAccessToken") || false;
      const response = await force.get(
        `https://api.unsplash.com/search/photos`,
        {
          forceUpdate : true,
          cache: true,
          headers: {
              Authorization: "Bearer " + localToken
            },
          params: {
            query,
            page,
          },
        }
      );
      return response.data;
  };
