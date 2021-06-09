import axios from "axios";
import { useState } from "react";

const useAxiosPost = (url, data) => {
  const [response, setResponse] = useState();
  const [error, setError] = useState();

  const postData = async () => {
    const user = localStorage.getItem("EprUser");
    const { token } = JSON.parse(user);

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    try {
      console.log(
        `%c axios saving data ${url}`,
        "background: #8a2be2; color: #f0ffff"
      );

      const response = await axios.post(
        `https://web2.ajbsoftware.co.uk:5000${url}`,
        { ...data },
        { headers }
      );

      setResponse(response);
    } catch (e) {
      console.log(`useAxiosPost error`, e);
      setError(e.message);
    }
  };
  return { response, error, postData };
};
export default useAxiosPost;
