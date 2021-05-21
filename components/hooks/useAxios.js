import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useAxios = (url) => {
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const router = useRouter();
  const route = router.asPath;

  // const cacheableApis = [
  //     { `/api/whatever/`, 3600 },
  //     { `/api/another/api/`, 1000 }
  // ];

  useEffect(() => {
    const user = localStorage.getItem("EprUser");
    const userToken = JSON.parse(user);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://web2.ajbsoftware.co.uk:5000${url}`,
          {
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

  return { response, route, error };
};
export default useAxios;
