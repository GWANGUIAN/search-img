import axios from "axios";

const getDataList = async () => {
  const localToken = localStorage.getItem("userAccessToken") || false;
  const response = await axios.get(`https://api.unsplash.com//photos`, {
    headers: {
      Authorization: localToken
        ? "Bearer " + localToken
        : "Client-ID " + process.env.REACT_APP_ACCESS_KEY,
    },
  });
  return response.data;
};

export default getDataList