import { setup } from "axios-cache-adapter";

const localToken = localStorage.getItem("userAccessToken") || false;

const api = setup({
  baseURL: "https://api.unsplash.com",
  Accept: "application/json",
  headers: {
    "Cache-Control": "no-cache",
    Authorization: localToken
      ? "Bearer " + localToken
      : "Client-ID " + process.env.REACT_APP_ACCESS_KEY,
  },
  cache: {
    maxAge: 10 * 60 * 1000,
    invalidate: async (config, request) => {
      if (request.clearCacheEntry) {
        await config.store.removeItem(config.uuid);
      }
    },
    exclude: { query: false },
  },
});

const getSerachData = async (query, page = 1, forceUpdate = false) => {


  if (forceUpdate) {
    const response = await api.get(
      `/search/photos?query=${query}&page=${page}`,
      { clearCacheEntry: true }
    );
    return response.data;
  } else {
    const response = await api.get(
      `/search/photos?query=${query}&page=${page}`
    );
    return response.data;
  }
};

export default getSerachData