import axios from "axios";
import { useEffect, useState } from "react";
import useAxiosCache from "../../hooks/useAxiosCache";

//once called executes automatically and on url change unless params are included.
//To call with params import fetchData and execute on click
const useAxios = (url, params) => {
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const { getCache, putCache } = useAxiosCache();

  useEffect(() => {
    if (!url || params) {
      return;
    }
    const cachedData = getCache(url);

    if (cachedData) {
      console.log(
        `%c fetching cached data for ${url} `,
        "background: #2ce28a; color: #f0ffff"
      );

      setResponse(cachedData.data);
      return;
    }
    fetchData();
  }, [url]);

  const fetchData = async () => {
    if (params) {
      console.log(
        "%c params axios post",
        "background: #8a2be2; color: #f0ffff",
        params
      );
    }

    const user = localStorage.getItem("EprUser");
    const userToken = JSON.parse(user);
    try {
      console.log(
        `%c fetching data for ${url} `,
        "background: #0000ff; color: #f0ffff"
      );
      const response = await axios.get(
        `https://web2.ajbsoftware.co.uk:5000${url}`,
        {
          params: {
            ...params,
          },

          headers: {
            "Content-Type": "application/json",
            Authorization: userToken.token,
          },
        }
      );
      setResponse(response);
      putCache(response, url);
    } catch (e) {
      console.log(`useAxios error ${url}`, e);
      setError(e.message);
    }
  };

  return { response, error, fetchData };
};
export default useAxios;
