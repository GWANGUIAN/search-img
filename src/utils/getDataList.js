import axios from "axios";

const getDataList = async () => {
  const localToken = localStorage.getItem("userAccessToken") || false;
  // TODO: try catch 처리 필요, api url 에 '/' 문자가 두개인 부분을 한개로 변경
  const response = await axios.get(`https://api.unsplash.com//photos`, {
    headers: {
      "Cache-Control": "no-cache",
      Authorization: localToken
        ? "Bearer " + localToken
        : "Client-ID " + process.env.REACT_APP_ACCESS_KEY,
    },
  });
  return response.data;
};

export default getDataList