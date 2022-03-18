import { setup } from "axios-cache-adapter";

const api = setup({
  baseURL: "https://api.unsplash.com",
  Accept: "application/json",
  headers: {
    "Cache-Control": "no-cache",
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
  const localToken = localStorage.getItem("userAccessToken") || false;
  try {
    const response = await api.get(
      `/search/photos?query=${query}&page=${page}`,
      {
        clearCacheEntry: forceUpdate,
        headers: {
          Authorization: localToken
            ? "Bearer " + localToken
            : "Client-ID " + process.env.REACT_APP_ACCESS_KEY,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export default getSerachData;
