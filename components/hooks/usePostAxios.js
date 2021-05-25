import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useAxios = (url) => {
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [postData, setPostData] = useState();
  const router = useRouter();
  // const route = router.asPath;

  useEffect(() => {
    if (!url) {
      return;
    }
    const user = localStorage.getItem("EprUser");
    const userToken = JSON.parse(user);
    const fetchData = async () => {
      console.log(userToken);
      try {
        const response = await axios.post(
          `https://web2.ajbsoftware.co.uk:5000${url}`,
          { ...postData },
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
  }, [postData]);

  return [{ response, error }, setPostData];
};
export default useAxios;
