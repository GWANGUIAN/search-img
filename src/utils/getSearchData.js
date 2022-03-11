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

  // TODO: try catch 처리 필요, if / else 를 사용하지 않고 'clearCacheEntry: forceUpdate' 형태로 변경
  if (forceUpdate) {
    const response = await api.get(
      `/search/photos?query=${query}&page=${page}`,
      {
        clearCacheEntry: true,
        headers: {
          Authorization: localToken
            ? "Bearer " + localToken
            : "Client-ID " + process.env.REACT_APP_ACCESS_KEY,
        },
      }
    );
    return response.data;
  } else {
    const response = await api.get(
      `/search/photos?query=${query}&page=${page}`,
      {
        headers: {
          Authorization: localToken
            ? "Bearer " + localToken
            : "Client-ID " + process.env.REACT_APP_ACCESS_KEY,
        },
      }
    );
    return response.data;
  }
};

export default getSerachData;
