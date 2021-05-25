import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useAxios = (url, params) => {
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const router = useRouter();
  const route = router.asPath;

  useEffect(() => {
    const user = localStorage.getItem("EprUser");
    const userToken = JSON.parse(user);
    const fetchData = async () => {
      try {
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
        // console.log(`useAxios response for ${route}`, response);
      } catch (e) {
        console.log(`useAxios error ${url}`, e);
        setError(e.message);
      }
    };

    fetchData();
  }, []);

  return { response, error };
};
export default useAxios;
