import axios from "axios";
import { useState } from "react";

export const useAxiosPost = (url, data) => {
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
      console.log("Axios post running");
      const response = await axios.post(
        `https://web2.ajbsoftware.co.uk:5000${url}`,
        data,
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
