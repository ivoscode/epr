import axios from "axios";
//import { useContext } from "react";
//import { Context } from "../../context/index";
import useAxiosCache from "./useAxiosCache";

const getApiData = (method, url, params) => {
  const { getCache, putCache } = useAxiosCache();
  //const { state, dispatch } = useContext(Context);
  if (params) {
    console.log(
      "%c params getApiData POST",
      "background: #8a2be2; color: #f0ffff",
      params
    );
  }
  //---------Logic for caching data------------
  const cachedData = getCache(url);
  if (cachedData) {
    console.log(
      `%c fetching cached data for ${url} `,
      "background: #2ce28a; color: #f0ffff"
    );

    return {
      then: (func) => {
        console.log(cachedData);
        func(cachedData.data);
      },
    };
  }

  const user = localStorage.getItem("EprUser");
  const userToken = JSON.parse(user);

  const headers = {
    "Content-Type": "application/json",
    Authorization: userToken.token,
  };
  //----------------GET-------------------
  if (method === `GET`) {
    console.log(
      `%c fetching data for ${url} `,
      "background: #0000ff; color: #f0ffff"
    );
    let promise = axios
      .get(`https://web2.ajbsoftware.co.uk:5000${url}`, {
        params: params,
        headers: headers,
      })
      .catch((e) => {
        console.log("useCheckAccess error", e.response);
        // if (e.response.status === 401) {
        //   dispatch({ type: "LOGOUT" });
        // }
      });

    promise.then((x) => putCache(x, url));

    return promise;
  }
  //----------------POST------------------------
  let promise = axios
    .post(
      `https://web2.ajbsoftware.co.uk:5000${url}`,
      { ...params },
      { headers }
    )
    .catch((e) => {
      console.log(e);
    });
  promise.then((x) => putCache(x, url));
  return promise;
};
export default getApiData;
