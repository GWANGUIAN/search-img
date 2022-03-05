import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

export const getSerachData = (query, page = 1, forceUpdate = false) => {
  const localToken = localStorage.getItem("userAccessToken") || false;
  if (forceUpdate) {
    const queryClient = useQueryClient();
    queryClient.invalidateQueries([query, page, localToken]);
  }
  const { data } = useQuery(
    [query, page, localToken],
    () =>
      axios.get(`https://api.unsplash.com/search/photos`, {
        headers: {
          Authorization: localToken
            ? "Bearer " + localToken
            : "Client-ID " + process.env.REACT_APP_ACCESS_KEY,
        },
        params: {
          query,
          page,
        },
      }),
    {
      initialData: { results: [] },
      staleTime: 1000 * 60 * 10,
      cacheTime: Infinity,
    }
  );

  return data.data;
};
