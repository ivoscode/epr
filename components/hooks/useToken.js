import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    // let userToken;
    // if (typeof window !== "undefined") {
    //   console.log("trying to get token");
    //   const tokenString = sessionStorage.getItem("token");
    //   userToken = JSON.parse(tokenString);
    //   console.log(`user token from hook ${userToken}`);
    // }
    // return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    sessionStorage.setItem("EprToken", JSON.stringify(userToken));
    //console.log(userToken.Token);
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
}
